import "./Manager.css"

function EmployeePage({ handleLogout }) {
  const manager = {
    name: "Vansh Goyal",
    email: "vansh@gmail.com",
    department: "MCA",
  };

  return (
    <div className="manager-container">
      <h2>Manager Detail</h2>

      <div className="manager-card">
        <h3>Name: {manager.name}</h3>
        <h3>Email: {manager.email}</h3>
        <h3>Department: {manager.department}</h3>
        
      </div>

      <button className="btn btn-danger" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default EmployeePage;