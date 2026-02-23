import { useEffect, useState } from "react";
import axios from "axios";

const Status = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchMyApps = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "https://scholarship-system-mw24.onrender.com/api/applications/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setApplications(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMyApps();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-2xl font-bold mb-6">My Scholarship Status</h2>

      {applications.length === 0 && (
        <p>No applications submitted yet.</p>
      )}

      {applications.map((app) => (
        <div
          key={app.id}
          className="bg-white p-6 rounded-xl shadow mb-4"
        >
          <p><strong>Name:</strong> {app.name}</p>
          <p><strong>CGPA:</strong> {app.cgpa}</p>

          <p className="mt-2">
            <strong>Status:</strong>{" "}
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                app.status === "approved"
                  ? "bg-green-100 text-green-700"
                  : app.status === "rejected"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {app.status}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default Status;