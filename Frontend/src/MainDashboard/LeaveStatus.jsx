import { useEffect, useState } from "react";
import "./App.css";

function LeaveStatus() {

  const [leaves, setLeaves] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <p>Please login first</p>;
  }

  const fetchLeaves = () => {
    fetch(`http://127.0.0.1:5000/employee-leaves/${user.id}`)
      .then(res => res.json())
      .then(data => setLeaves(data))
      .catch(err => {
        console.error(err);
        alert("Error fetching leave data");
      });
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <div>
      <h2>Leave Status</h2>

      <button className="refresh-btn" onClick={fetchLeaves}>
        Refresh
      </button>

      {leaves.length === 0 ? (
        <p>No leave records found</p>
      ) : (
        leaves.map((leave) => (
          // ✅ USE leave-item instead of card
          <div key={leave.id} className="leave-item">

            <p><b>Reason:</b> {leave.reason}</p>
            <p><b>From:</b> {leave.from_date}</p>
            <p><b>To:</b> {leave.to_date}</p>

            <p>
              <b>Status:</b>{" "}
              <span className={`status ${leave.status.toLowerCase()}`}>
                {leave.status}
              </span>
            </p>

          </div>
        ))
      )}

    </div>
  );
}

export default LeaveStatus;