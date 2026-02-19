import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {
  const { docId } = useParams(); 
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);

  const dayOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  /* ---------------- Fetch Doctor Info ---------------- */
  useEffect(() => {
    if (doctors?.length) {
      const info = doctors.find(doc => doc._id === docId);
      setDocInfo(info);
    }
  }, [doctors, docId]);



  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Please login to book appointment");
      navigate('/login');
      return;
    }

    if (!slotTime) {
      toast.error("Please select a time slot");
      return;
    }

    try {
      const date = docSlots[slotIndex][0].datetime;
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      const slotDate = `${day}_${month}_${year}`;

      const { data } = await axios.post(
        backendUrl + '/api/user/book-appointment',
        { docId, slotDate, slotTime },
        {
          headers: {
            token: token,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        // Refresh doctors data to update booked slots
        await getDoctorsData();
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };



  /* ---------------- Generate Slots ---------------- */
  useEffect(() => {
    if (!docInfo) return;

    let slots = [];
    let today = new Date();
    const slotsBooked = docInfo.slots_booked || {};

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0); // 9 PM

      if (i === 0) {
        if (today.getHours() < 10) {
          currentDate.setHours(10, 0);
        } else {
          currentDate.setHours(today.getHours() + 1);
          currentDate.setMinutes(today.getMinutes() > 30 ? 30 : 0);
        }
      } else {
        currentDate.setHours(10, 0);
      }

      let timeSlots = [];
      const slotDate = `${currentDate.getDate()}_${currentDate.getMonth() + 1}_${currentDate.getFullYear()}`;
      const bookedSlotsForDate = slotsBooked[slotDate] || [];

      while (currentDate < endTime) {
        // Use consistent 12-hour format with AM/PM
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        const timeString = `${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
        
        // Also check for 24-hour format (backwards compatibility)
        const timeString24 = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        const isBooked = bookedSlotsForDate.includes(timeString) || bookedSlotsForDate.includes(timeString24);

        timeSlots.push({
          datetime: new Date(currentDate),
          time: timeString,
          isBooked: isBooked,
        });
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      slots.push(timeSlots);
    }

    setDocSlots(slots);
  }, [docInfo]);

  /* ---------------- UI ---------------- */
  return (
    docInfo && (
      <div className="max-w-5xl mx-auto px-4">

        {/* Doctor Info */}
        <div className="flex flex-col sm:flex-row gap-6">
          <img
            src={docInfo.image}
            alt=""
            className="w-full sm:w-64 rounded-lg bg-primary"
          />

          <div className="flex-1 border rounded-lg p-6 bg-white">
            <p className="flex items-center gap-2 text-2xl font-semibold">
              {docInfo.name}
              <img src={assets.verified_icon} className="w-5" alt="" />
            </p>

            <p className="text-gray-600 mt-1">
              {docInfo.degree} – {docInfo.speciality}
              <span className="ml-2 px-2 py-0.5 border rounded-full text-xs">
                {docInfo.experience}
              </span>
            </p>

            <div className="mt-4">
              <p className="flex items-center gap-1 font-medium">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {docInfo.about}
              </p>
            </div>

            <p className="mt-4 text-gray-600">
              Appointment fee:
              <span className="font-medium text-gray-800 ml-1">
                {currencySymbol}{docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* Booking Slots */}
        <div className="sm:ml-72 sm:pl-4 mt-6 font-medium text-gray-700">
          <p>Booking slots</p>

          {/* Dates */}
          <div className="flex gap-3 w-full overflow-x-scroll mt-4">
            {docSlots.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  setSlotIndex(index);
                  setSlotTime('');
                }}
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                  slotIndex === index
                    ? 'bg-primary text-white'
                    : 'border text-gray-500'
                }`}
              >
                <p>{item[0] && dayOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))}
          </div>

          {/* Time Slots */}
          <div className="flex gap-3 w-full overflow-x-scroll mt-4">
            {docSlots[slotIndex]?.map((item, index) => (
              <p
                key={index}
                onClick={() => !item.isBooked && setSlotTime(item.time)}
                className={`text-sm px-5 py-2 rounded-full flex-shrink-0 ${
                  item.isBooked
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed line-through'
                    : item.time === slotTime
                    ? 'bg-primary text-white cursor-pointer'
                    : 'border text-gray-400 hover:bg-gray-100 cursor-pointer'
                }`}
                title={item.isBooked ? 'This slot is already booked' : ''}
              >
                {item.time.toLowerCase()}
              </p>
            ))}
          </div>
          <button onClick={bookAppointment} className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book an appointment</button>
        </div>

        {/*---- Listing Related Doctors ---- */}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;
