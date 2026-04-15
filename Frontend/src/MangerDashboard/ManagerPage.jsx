import "./Manager.css";

function ManagerPage() {
  return (
    <div className="summary-container">
      <h2>Manager Dashboard</h2>

      <div className="summary-grid">

        <div className="summary-card">
          <h3>Total Employees</h3>
          <p>5</p>
        </div>

        <div className="summary-card approved">
          <h3>Approved Leaves</h3>
          <p>3</p>
        </div>

        <div className="summary-card pending">
          <h3>Pending Requests</h3>
          <p>2</p>
        </div>

      </div>
    </div>
  );
}

export default ManagerPage;