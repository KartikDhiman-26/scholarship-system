import { useState } from "react";
import axios from "axios";

const Apply = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cgpa: "",
    income: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/applications",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message);
      setFormData({
        name: "",
        email: "",
        cgpa: "",
        income: "",
      });
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Scholarship Application
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <input
            name="cgpa"
            placeholder="CGPA"
            value={formData.cgpa}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <input
            name="income"
            placeholder="Annual Income"
            value={formData.income}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition">
            Submit Application
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-blue-600">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Apply;