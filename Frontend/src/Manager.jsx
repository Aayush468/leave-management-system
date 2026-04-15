import LeaveStatus from "./MainDashboard/LeaveStatus";
import EmployeePage from "./MangerDashboard/EmployeePage";
import LeaveRequests from "./MangerDashboard/LeaveRequests";
import ManagerPage from "./MangerDashboard/ManagerPage";
import ManagerLogin from "./MangerDashboard/ManagerLogin";
import { useState } from "react";

function Manager(){

    const [userRole, setUserRole] = useState(null);

    // ✅ FIXED logout
    const handleLogout = () => {
        setUserRole(null);
    };

    // 🔐 Login page
    if (!userRole) {
        return <ManagerLogin setUserRole={setUserRole} />;
    }

    return(
       
        <div className="manager"> 
            <div className="card"> 
                <EmployeePage handleLogout={handleLogout}/>
            </div>  
            
            <div className="card"> 
                <LeaveRequests/>
            </div> 

            <div className="card">
                <LeaveStatus/>
            </div>
            
            <div className="card"> 
                <ManagerPage/>
            </div> 
        </div>
    );
}

export default Manager;