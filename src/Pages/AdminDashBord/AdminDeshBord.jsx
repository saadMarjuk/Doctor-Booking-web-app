import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDeshBord = () => {
  const navigate = useNavigate();

  const handleAction = (action) => {
    console.log("Clicked:", action);
    // You can navigate to specific pages or open forms here
    // Example: navigate("/add-doctor");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10" style={{ backgroundColor: "#F4F4F7" }}>
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Panel</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
        {/* Row 1 */}
       <button
        onClick={() => navigate("/AddDoctorForm")}
        className="text-white font-semibold py-3 px-6 rounded-xl shadow transition"
       style={{ backgroundColor: "#007AFF" }}
       >
       ➕ Add Doctor Info
       </button>

        <button
          onClick={() => navigate("/DoctorList")}
          className="text-white font-semibold py-3 px-6 rounded-xl shadow transition"
          style={{ backgroundColor: "#007AFF" }}
          >
         ✏️ Update Doctor Info
          </button>


        <button
          onClick={() => handleAction("Delete Doctor Info")}
          className="text-white font-semibold py-3 px-6 rounded-xl shadow transition"
          style={{ backgroundColor: "#007AFF" }}
        >
          ❌ Delete Doctor Info
        </button>

        {/* Row 2 */}
        <button
          onClick={() => handleAction("All Patient Booking Info")}
          className="text-white font-semibold py-3 px-6 rounded-xl shadow transition"
          style={{ backgroundColor: "#007AFF" }}
        >
          📋 All Patient Booking Info
        </button>

        <button
          onClick={() => handleAction("Delete Patient Info")}
          className="text-white font-semibold py-3 px-6 rounded-xl shadow transition"
          style={{ backgroundColor: "#007AFF" }}
        >
          ❌ Delete Patient Info
        </button>

        <button
          onClick={() => navigate("/")}
          className="text-white font-semibold py-3 px-6 rounded-xl shadow transition"
          style={{ backgroundColor: "#007AFF" }}
        >
          ⬅️ Back to Home
        </button>
      </div>
    </div>
  );
};

export default AdminDeshBord;
