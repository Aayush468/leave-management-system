import { useState } from "react";
import "./App.css";

function ApplyLeave() {

  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || !type || !reason) {
      alert("Please fill all fields");
      return;
    }

    // get logged-in user
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      
      return <p>Please login first</p>;
    }

    try {
      const res = await fetch("http://127.0.0.1:5000/apply-leave", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          employee_id: user.id,
          reason: `${type} - ${reason}`,  // combine type + reason
          from_date: date,
          to_date: date
        })
      });

      const data = await res.json();

      alert(data.message || "Leave applied successfully");

      // reset form
      setDate("");
      setType("");
      setReason("");

    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div>
      <h2>Apply Leave</h2>

      <form onSubmit={handleSubmit}>

        {/* Date */}
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        {/* Category */}
        <label>Category</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Select Leave Type</option>
          <option value="Sick Leave">Sick Leave</option>
          <option value="Casual Leave">Casual Leave</option>
          <option value="Paid Leave">Paid Leave</option>
          <option value="Emergency Leave">Emergency Leave</option>
        </select>

        {/* Reason */}
        <label>Reason</label>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Enter reason..."
        />

        {/* Button */}
        <button className="btn" type="submit">
          Apply
        </button>

      </form>
    </div>
  );
}

export default ApplyLeave;