import { useEffect, useState } from "react";
import "./App.css";

function CancelLeave() {

  const [leaves, setLeaves] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <p>Please login first</p>;
  }

  // ✅ Fetch user leaves
  useEffect(() => {
    fetch(`http://127.0.0.1:5000/employee-leaves/${user.id}`)
      .then(res => res.json())
      .then(data => {
  // 🔥 filter only pending leaves
  const pendingLeaves = data.filter(
    leave => leave.status === "Pending"
  );
  setLeaves(pendingLeaves);
})
      .catch(err => console.error(err));
  }, []);

  // ✅ Delete function
  const deleteLeave = async (id) => {

    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://127.0.0.1:5000/delete-leave/${id}`, {
        method: "DELETE"
      });

      await res.json();

      // update UI
      setLeaves(prev => prev.filter(l => l.id !== id));

    } catch (error) {
      console.error(error);
      alert("Error deleting leave");
    }
  };

  return (
    <div>
      <h2>Cancel Leave</h2>

      {leaves.length === 0 ? (
        <p>No leaves found</p>
      ) : (
        leaves.map((leave) => (
          <div key={leave.id} className="leave-item">

            <p><b>Reason:</b> {leave.reason}</p>

            <p>
              <b>Status:</b>{" "}
              <span className={`status ${leave.status.toLowerCase()}`}>
                {leave.status}
              </span>
            </p>

            {/* 🔥 IMPORTANT FIX */}
            {leave.status === "Pending" ? (
              <button
                className="delete-btn"
                onClick={() => deleteLeave(leave.id)}
              >
                Delete
              </button>
            ) : (
              <p style={{ opacity: 0.7 }}>
                Cannot delete (already {leave.status})
              </p>
            )}

          </div>
        ))
      )}
    </div>
  );
}

export default CancelLeave;