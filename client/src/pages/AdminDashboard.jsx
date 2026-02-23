import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "https://scholarship-system-mw24.onrender.com/api/applications",
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

  const updateStatus = async (id, status) => {
    const token = localStorage.getItem("token");

    await axios.put(
      `https://scholarship-system-mw24.onrender.com/api/applications/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchApplications();
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

      {applications.map((app) => (
        <div
          key={app.id}
          className="bg-white p-6 rounded-xl shadow mb-4"
        >
          <p><strong>Name:</strong> {app.name}</p>
          <p><strong>Email:</strong> {app.email}</p>
          <p><strong>CGPA:</strong> {app.cgpa}</p>
          <p><strong>Income:</strong> {app.income}</p>

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

          {app.status === "pending" && (
            <div className="mt-4">
              <button
                onClick={() => updateStatus(app.id, "approved")}
                className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600"
              >
                Approve
              </button>

              <button
                onClick={() => updateStatus(app.id, "rejected")}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;