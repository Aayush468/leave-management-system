import { useEffect, useState } from "react";
import "./Manager.css";

function LeaveRequests() {

  const [leaves, setLeaves] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  // 🔹 Fetch all leave requests
  useEffect(() => {
    fetch("http://127.0.0.1:5000/all-leaves")
      .then(res => res.json())
      .then(data => setLeaves(data))
      .catch(err => {
        console.error(err);
        alert("Error fetching leave requests");
      });
  }, []);

  // 🔹 Update status (Approve / Reject)
  const updateStatus = async (id, status) => {

    const confirmAction = window.confirm(`Are you sure you want to ${status} this leave?`);
    if (!confirmAction) return;

    try {
      setLoadingId(id);

      const res = await fetch(`http://127.0.0.1:5000/update-status/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status })
      });

      if (!res.ok) {
        throw new Error("Failed to update status");
      }

      await res.json();

      // ✅ Update UI instantly
      setLeaves(prev =>
        prev.map(leave =>
          leave.id === id ? { ...leave, status } : leave
        )
      );

    } catch (error) {
      console.error(error);
      alert(error.message || "Error updating status");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div>
      <h2>Leave Requests</h2>

      {leaves.length === 0 ? (
        <p>No leave requests</p>
      ) : (
        leaves.map((leave) => (
          <div key={leave.id} className="card">

            <p><b>Employee:</b> {leave.name}</p>
            <p><b>Reason:</b> {leave.reason}</p>
            <p><b>From:</b> {leave.from_date}</p>
            <p><b>To:</b> {leave.to_date}</p>

            {/* ✅ Status with color */}
            <p>
              <b>Status:</b>{" "}
              <span
                style={{
                  color:
                    leave.status === "Approved"
                      ? "#22c55e"
                      : leave.status === "Rejected"
                      ? "#ef4444"
                      : "#facc15"
                }}
              >
                {leave.status}
              </span>
            </p>

            {/* ✅ Show buttons ONLY if Pending */}
            {leave.status === "Pending" ? (
              <div className="btn-group">

                <button
                  className="btn approve"
                  disabled={loadingId === leave.id}
                  onClick={() => updateStatus(leave.id, "Approved")}
                >
                  {loadingId === leave.id ? "Updating..." : "Approve"}
                </button>

                <button
                  className="btn reject"
                  disabled={loadingId === leave.id}
                  onClick={() => updateStatus(leave.id, "Rejected")}
                >
                  {loadingId === leave.id ? "Updating..." : "Reject"}
                </button>

              </div>
            ) : (
              <p style={{ marginTop: "10px", opacity: 0.7 }}>
                (No actions available)
              </p>
            )}

          </div>
        ))
      )}

    </div>
  );
}

export default LeaveRequests;