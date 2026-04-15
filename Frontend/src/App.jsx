import { useState } from "react";
import ApplyLeave from "./MainDashboard/ApplyLeave";
import CancelLeave from "./MainDashboard/CancelLeave";
import Dashboard from "./MainDashboard/Dashboard";
import LeaveStatus from "./MainDashboard/LeaveStatus";
import Login from "./MainDashboard/Login";
import LeaveRequests from "./MangerDashboard/LeaveRequests";

function App() {

  const [isLogin, setIsLogin] = useState(!!localStorage.getItem("user"));

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLogin(false);
  };

  // 🔐 Login screen
  if (!user) {
    return <Login setIsLogin={setIsLogin} />;
  }

  // 🧑‍💼 MANAGER VIEW
  if (user?.role === "manager") {
    return (
      <div className="main">
        <div className="card">
          <h2>Manager Dashboard</h2>
          <p><b>Name:</b> {user?.name}</p>
          <p><b>Email:</b> {user?.email}</p>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div className="card">
          <LeaveRequests />
        </div>
      </div>
    );
  }

  // 👨‍💼 EMPLOYEE VIEW
  return (
    <div className="main">
      <div className="card">
        <Dashboard handleLogout={handleLogout} />
      </div>

      <div className="card">
        <ApplyLeave />
      </div>

      <div className="card">
        <LeaveStatus />
        <CancelLeave />
      </div>
    </div>
  );
}

export default App;