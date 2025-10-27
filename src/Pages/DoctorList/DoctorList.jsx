import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  // Fetch all doctors
  const fetchDoctors = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/doctors");
      const data = await res.json();
      setDoctors(data);
    } catch (err) {
      console.error("Error fetching doctors:", err);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Delete doctor
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this doctor?")) return;

    try {
      await fetch(`http://localhost:5000/api/doctors/${id}`, {
        method: "DELETE",
      });
      alert("Doctor deleted successfully!");
      setDoctors(doctors.filter((doc) => doc._id !== id));
    } catch (err) {
      console.error("Error deleting doctor:", err);
    }
  };

  // Navigate to update form
  const handleUpdate = (id) => {
    navigate(`/update-doctor/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        🩺 Doctor List
      </h2>

      <div className="grid gap-6">
        {doctors.length === 0 ? (
          <p className="text-center text-gray-600">No doctors found.</p>
        ) : (
          doctors.map((doc) => (
            <div
              key={doc._id}
              className="flex bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              {/* Left side - Image */}
              <div className="w-1/4 flex items-center justify-center bg-gray-50">
                <img
                  src={`http://localhost:5000/uploads/${doc.image}`}
                  alt={doc.name}
                  className="h-32 w-32 object-cover rounded-full border-4 border-blue-500"
                />
              </div>

              {/* Right side - Info */}
              <div className="w-3/4 p-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  {doc.name}
                </h3>
                <p className="text-gray-600">{doc.speciality}</p>
                <p className="text-gray-600">🏥 {doc.hospital}</p>
                <p className="text-gray-600">🎓 {doc.education}</p>
                <p className="text-gray-600">💼 {doc.experience} yrs</p>
                <p className="text-gray-600">💰 Fee: {doc.fee} Tk</p>
                <p className="text-gray-600">📅 {doc.availability}</p>

                <div className="mt-4 flex gap-4">
                  <button
                    onClick={() => handleUpdate(doc._id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    ✏️ Update
                  </button>
                  <button
                    onClick={() => handleDelete(doc._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DoctorList;
