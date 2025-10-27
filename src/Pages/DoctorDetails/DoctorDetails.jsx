import React, { useEffect, useState } from "react"; // <-- added useState
import { useLoaderData, useParams, useNavigate } from "react-router"; // <-- added useNavigate
import "../../App.css";
import { PiTrademarkRegisteredThin } from "react-icons/pi";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { addBooking } from "../../Utils/utils";
import useDynamicTitle from "../../UI/DynamicTitle";
import BookingForm from "../BookingForm/BookingForm";

import noDoc from "../../assets/noDoc.jpg";

const DoctorDetails = () => {
  const doctorData = useLoaderData();
  const params = useParams();
  const navigate = useNavigate(); // <-- added for navigation after form submit

  const regNum = params.registrationNumber;
  const doctorInfo = doctorData.find(
    (doctor) => doctor.registrationNumber === regNum
  );

  useDynamicTitle(doctorInfo?.name);

  const [showBookingForm, setShowBookingForm] = useState(false); // <-- added state to show BookingForm

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const today = new Date();
  const dayName = days[today.getDay()];
  const doctorToday = doctorData.find(
    (doctor) => doctor.registrationNumber === regNum
  );

  const isAvailableToday =
    doctorToday?.availableDays.includes(dayName) || false;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!doctorInfo) {
    return (
      <div className="bg-gray-100 ">
        <div className="flex font-pj bg-gray-100 mb-10 p-5 justify-center items-center">
          <div className="flex justify-center items-center flex-col gap-10">
            <div className="w-3/4 rounded-2xl bg-gray-300 lg:p-10 md:p-8">
              <img className="rounded-2xl" src={noDoc} alt="" />
            </div>
            <h1 className=" max-sm:text-sm  max-sm:text-center font-semibold">
              No doctor found with this registration number.
            </h1>
          </div>
        </div>
      </div>
    );
  }

  const {
    name,
    education,
    speciality,
    registrationNumber,
    availableDays,
    image,
    fee,
    hospital,
    educationDetails,
  } = doctorInfo;

  // <-- updated handleBooking to show the booking form instead of navigating immediately
  const handleBooking = () => {
    setShowBookingForm(true);
  };

  return (
    <div className="font-pj">
      {/* Doctor Profile Header */}
      <div className="w-full rounded-2xl flex justify-center  bg-white lg:h-[256px]">
        <div className="p-5 gap-5 flex flex-col justify-center items-center">
          <h1 className="text-center font-extrabold lg:text-3xl md:text-2xl max-sm:text-xl">
            Doctor’s Profile Details
          </h1>
          <p className="text-gray-500 max-sm:text-sm md:text-sm lg:text-base text-center">
            Our doctors are experienced specialists with degrees from reputable
            institutions worldwide. They currently practice at leading hospitals
            in Bangladesh, offering expert care across various fields. Check
            their profiles for qualifications, consultation days, and fees to
            find the right care for you.
          </p>
        </div>
      </div>

      {/* Dynamic Doctor Infocard */}
      <div className="bg-white my-8 px-6 py-12 gap-5 rounded-2xl  flex max-sm:flex-col">
        <div className="w-1/4 max-sm:w-full">
          <img
            className=" rounded-2xl  w-full h-72 object-cover"
            src={image}
            alt=""
          />
        </div>

        <div className="w-3/4 space-y-4">
          <div>
            <h1 className="font-extrabold mb-2 max-sm:text-xl md:text-2xl">
              {name}
            </h1>

            <div className="text-gray-500 max-sm:space-y-1 text-sm">
              <p>{education}</p>
              <p>{speciality}</p>
              <p className="max-sm:text-xs max-sm:w-5/4">
                Qualifications : {educationDetails}
              </p>
            </div>
          </div>

          <div>
            <p className="text-gray-500 text-xs ">Working at</p>
            <p className="font-semibold">{hospital}</p>
          </div>

          <div>
            <hr className="border-dashed max-sm:w-5/4 text-[#00000013]" />
            <div className="flex m-1 gap-2 justify-start items-center">
              <PiTrademarkRegisteredThin />
              <p className="text-[12px]">Reg No: BD{registrationNumber}</p>
            </div>
            <hr className="border-dashed max-sm:w-5/4 text-[#00000013]" />
          </div>

          <div className="max-sm:flex max-sm:flex-col max-sm:items-start max-sm:gap-2 ">
            <span className="font-bold text-xs mr-3">Availability</span>
            {availableDays.map((days, index) => (
              <button
                className="text-xs rounded-xl text-[#FFA000] py-1 px-2 mr-2 border-1 border-[rgba(255,162,0,0.20)] bg-[rgba(255,162,0,0.10)] max-md:text-xs"
                key={index}
              >
                {days}
              </button>
            ))}
            <p className="mt-2">
              <span className="font-bold text-xs mr-3">Consultation Fee:</span>
              <br className="hidden max-sm:flex" />
              <span className="text-[#176AE5] font-bold lg:text-xs md:text-xs  mr-1">
                Taka: {fee} BDT
              </span>
              <br className="hidden max-sm:flex" />
              <span className="text-gray-500 text-xs">(incl. Vat)</span>
              <span className="ml-2 text-[#176AE5] text-xs">
                Per consultation
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Dynamic Appoinment Section */}
      <div className="bg-white mb-18 rounded-2xl w-full py-3 px-6">
        <div className="font-extrabold lg:text-xl md:text-lg max-sm:text-base mb-2 text-center">
          Book an Appointment
        </div>
        <div>
          <hr className="border-dashed max-sm:w-full text-[#00000013]" />
        </div>

        <div className="flex items-center justify-between py-2">
          <p className="font-bold text-sm">Availability</p>
          <button
            className={`px-3 py-1 font-semibold rounded-full border-1 text-xs shadow-lg
    ${
      isAvailableToday
        ? "text-[#09982F] border-[#09982f2a] bg-[rgba(9,152,47,0.20)]"
        : "text-red-700 border-[#e51732b6] bg-[rgba(229,23,23,0.24)]"
    }
  `}
          >
            {isAvailableToday ? "Available Today" : "Not Available Today"}
          </button>
        </div>
        <div>
          <hr className="border-dashed max-sm:w-full text-[#00000013]" />
        </div>

        <button className="mt-10 text-xs rounded-xl text-[#FFA000] py-1 px-2 mr-2 border-1 border-[rgba(255,162,0,0.20)] bg-[rgba(255,162,0,0.10)] max-md:text-xs">
          <div className="flex justify-center items-center gap-1">
            <IoIosInformationCircleOutline />
            Due to high patient volume, we are currently accepting appointments
            for today only. We appreciate your understanding and cooperation.
          </div>
        </button>

        {/* <-- Conditional rendering of BookingForm */}
        {/* Conditional rendering of BookingForm */}
{showBookingForm ? (
  <BookingForm
    onSubmit={(formData) => {
      console.log("Booking received:", formData); // optional debug
      addBooking(doctorInfo); // save booking
      navigate("/bookings");  // navigate after form submission
    }}
  />
) : (
  <button
    onClick={handleBooking} // <-- show the booking form
    disabled={!isAvailableToday}
    className={`my-10 w-full rounded-full outline-0 border-0 btn 
    ${
      isAvailableToday
        ? "btn-primary bg-[#176AE5] hover:bg-[#43597a]"
        : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }
  `}
  >
    Book Appointment Now
  </button>
)}

      </div>
    </div>
  );
};

export default DoctorDetails;
