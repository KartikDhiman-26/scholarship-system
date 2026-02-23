import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const token = localStorage.getItem("token");

        await axios.get("http://localhost:5000/api/applications", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setIsAdmin(true);
      } catch (error) {
        setIsAdmin(false);
      }
    };

    checkAdmin();
  }, []);

  if (isAdmin === null) return <p>Checking access...</p>;

  if (!isAdmin) return <Navigate to="/login" />;

  return children;
};

export default AdminRoute;