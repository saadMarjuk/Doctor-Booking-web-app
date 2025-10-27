import { useState } from "react";

export default function BookingForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    mobile: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-md flex flex-col gap-4"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Book an Appointment
        </h2>

        <input
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="age"
          type="number"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <input
          name="email"
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="mobile"
          placeholder="Mobile Number (e.g. 017XXXXXXXX)"
          pattern="01[0-9]{9}"
          title="Must be a valid Bangladeshi mobile number (11 digits starting with 01)"
          value={formData.mobile}
          onChange={handleChange}
          required
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="bg-[#176AE5] text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
}
