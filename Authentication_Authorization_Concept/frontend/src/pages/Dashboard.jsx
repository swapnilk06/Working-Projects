import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [roleMessage, setRoleMessage] = useState("");
  const token = localStorage.getItem("token");

  const getData = async (url) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}${url}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRoleMessage(res.data.message);
    } catch {
      setRoleMessage("Access denied or invalid token");
    }
  };

  return (
    <div className="space-y-4 text-center">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <div className="space-x-2">
        <button onClick={() => getData("/users/admin")} className="btn">Admin</button>
        <button onClick={() => getData("/users/manager")} className="btn">Manager</button>
        <button onClick={() => getData("/users/user")} className="btn">User</button>
      </div>
      <p className="text-lg mt-4">{roleMessage}</p>
    </div>
  );
};

export default Dashboard;
