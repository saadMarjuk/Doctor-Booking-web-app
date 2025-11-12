import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookingForm from "../BookingForm/BookingForm";

const DoctorProfile = () => {
  const { registerNumber } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Fetch doctor data
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/doctors/${registerNumber}`)
      .then((res) => {
        setDoctor(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching doctor:", err);
        setLoading(false);
      });
  }, [registerNumber]);

  // Handle booking form submission
  const handleBookingSubmit = async (patientData) => {
    try {
      const bookingData = {
        doctorName: doctor.name,
        doctorRegisterNumber: doctor.registerNumber,
        name: patientData.name,         // ✅ match backend
        age: patientData.age,
        gender: patientData.gender,
        mobile: patientData.mobile,
        email: patientData.email,       // ✅ include email
        address: patientData.address,
      };

      await axios.post("http://localhost:5000/api/bookings", bookingData);
      alert("✅ Appointment booked successfully!");
      setShowForm(false);
    } catch (err) {
      console.error("Error saving booking:", err);
      alert("❌ Failed to book appointment.");
    }
  };

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (!doctor) return <p className="text-center mt-20 text-red-600">Doctor not found.</p>;

  return (
    <div className="min-h-screen bg-[#f8fafc] py-10 px-4 md:px-20">
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 max-w-5xl mx-auto p-8 flex flex-col md:flex-row gap-8">
        {/* Doctor Image */}
        <div className="w-full md:w-1/3 flex justify-center">
          <img
            src={doctor.image ? `http://localhost:5000/uploads/${doctor.image}` : "https://via.placeholder.com/300x300?text=No+Image"}
            alt={doctor.name}
            className="rounded-2xl w-72 h-72 object-cover shadow-sm"
          />
        </div>

        {/* Doctor Info */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-2">Dr. {doctor.name}</h2>
          <p>{doctor.speciality}</p>
          <p className="mt-2"><strong>Hospital:</strong> {doctor.hospital}</p>
          <p><strong>Reg No:</strong> BDREG-{doctor.registerNumber}</p>
          <p className="mt-3"><strong>Fee:</strong> <span className="text-blue-600 font-semibold">৳{doctor.fee}</span></p>

          {/* Book Appointment Button */}
          <div className="mt-6">
            <button
              onClick={() => setShowForm(true)}
              className="bg-[#176AE5] hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition-all duration-300"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>

      {/* Booking Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-2xl shadow-lg p-6">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              
            </button>
            <BookingForm onSubmit={handleBookingSubmit} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorProfile;
