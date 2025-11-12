import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DoctorDetailsList = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/doctors")
      .then((res) => setDoctors(res.data))
      .catch((err) => console.error("Error fetching doctors:", err));
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] py-14 px-6">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
          Our Best Doctors
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
          Our platform connects you with verified, experienced doctors across
          various specialties — all at your convenience. Whether it’s a routine
          checkup or urgent consultation, book appointments in minutes and
          receive quality care you can trust.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-8">
        <button
        onClick={() => navigate("/chatbot")}
        className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition-all duration-300"
       >
         Talk to AI Doctor Bot
       </button>
        <button
        onClick={() => navigate("/location")}
        className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-green-600 transition-all duration-300"
        >
        See your Location to hospital 
       </button>
       </div>
      </div>

      {/* Doctor Cards Grid */}
      {doctors.length === 0 ? (
        <p className="text-center text-gray-600">No doctors found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <div className="w-full h-64 overflow-hidden rounded-t-2xl">
                <img
                  src={
                    doctor.image
                      ? `http://localhost:5000/uploads/${doctor.image}`
                      : "https://via.placeholder.com/300x200?text=No+Image"
                  }
                  alt={doctor.name}
                  className="w-full h-full object-top object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              <div className="p-6">
                {/* Availability & Experience Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                    Available
                  </span>
                  <span className="px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
                    {doctor.experience
                      ? `${doctor.experience}+ Years Experience`
                      : "Experience N/A"}
                  </span>
                </div>

                {/* Doctor Info */}
                <h2 className="text-lg font-bold text-gray-900">
                  Dr. {doctor.name}
                </h2>
                <p className="text-sm text-gray-700 mt-1">
                  {doctor.education} — {doctor.speciality}
                </p>

                <div className="border-t my-3 border-dashed"></div>

                <p className="text-xs text-gray-600 mb-1">
                  <strong>Reg No:</strong> BDREG-{doctor.registerNumber}
                </p>
                <p className="text-xs text-gray-600">
                  <strong>Hospital:</strong> {doctor.hospital}
                </p>

                {/* View Details Button */}
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() =>
                      navigate(`/doctor/${doctor.registerNumber}`)
                    }
                    className="text-sm text-[#176AE5] border border-[#176AE5] px-4 py-1 rounded-full hover:bg-[#176AE5] hover:text-white transition-all duration-300"
                  >
                    View Detail
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorDetailsList;
