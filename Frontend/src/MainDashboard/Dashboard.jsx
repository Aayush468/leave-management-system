import "./App.css";

function Dashboard({ handleLogout }) {

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <h2>Employee Dashboard</h2>

      <h3>
        Employee  Name: {user ? user.name : "Guest"}
      </h3>

      <button className="btn btn-danger" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;