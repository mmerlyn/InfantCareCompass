import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { StarRating } from '../components/DoctorCard';

// This should match the mockDoctors structure from Consultation.jsx
const mockDoctors = [
  {
    _id: "1",
    firstName: "Sarah",
    lastName: "Johnson",
    specialization: "Pediatrics",
    experience: 8,
    rating: 4.8,
    location: "New York, NY",
    hospital: "Children's Hospital of NYC",
    fees: 150,
    isOnline: true,
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
    about: "Specialized in infant care and child development. Expert in vaccination schedules and pediatric nutrition.",
    description: "Specialized in infant care and child development. Expert in vaccination schedules and pediatric nutrition.",
    languages: ["English", "Spanish"],
    availability: ["Monday", "Tuesday", "Wednesday", "Friday"],
    education: ["MD - Harvard Medical School", "Residency - Boston Children's Hospital"],
    certifications: ["Board Certified in Pediatrics", "PALS Certified"],
    consultationTypes: ["In-person", "Video call", "Phone consultation"]
  },
  // Add other doctors here following the same pattern...
];

const DoctorDetails = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

  useEffect(() => {
    // Simulate API call to fetch doctor details
    setTimeout(() => {
      const foundDoctor = mockDoctors.find(doc => doc._id === doctorId);
      setDoctor(foundDoctor);
      setLoading(false);
    }, 1000);
  }, [doctorId]);

  const handleBookConsultation = () => {
    if (selectedTimeSlot) {
      alert(`Consultation booked with Dr. ${doctor.firstName} ${doctor.lastName} for ${selectedTimeSlot}`);
    } else {
      alert('Please select a time slot');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading doctor details...</div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">👨‍⚕️</div>
          <h2 className="text-2xl text-white mb-4">Doctor not found</h2>
          <Link to="/consultation" className="text-blue-400 hover:text-blue-300">
            Back to consultation
          </Link>
        </div>
      </div>
    );
  }

  const fullName = `Dr. ${doctor.firstName} ${doctor.lastName}`;
  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-gray-300">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="container mx-auto px-6 py-4">
          <Link 
            to="/consultation" 
            className="text-blue-400 hover:text-blue-300 flex items-center"
          >
            ← Back to consultation
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Doctor Profile Card */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
              
              {/* Doctor Header */}
              <div className="flex items-start space-x-6 mb-8">
                <img
                  src={doctor.avatar || `https://api.dicebear.com/8.x/initials/svg?seed=${doctor.firstName} ${doctor.lastName}`}
                  alt={fullName}
                  className="w-32 h-32 rounded-full bg-slate-600 object-cover border-4 border-slate-600"
                />
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-white mb-2">
                        {fullName}
                      </h1>
                      <p className="text-xl text-blue-300 mb-2">{doctor.specialization}</p>
                      <p className="text-gray-400">🏥 {doctor.hospital}</p>
                    </div>
                    
                    {doctor.isOnline && (
                      <span className="flex items-center text-sm text-green-400 bg-green-900/30 px-3 py-1 rounded-full">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                        Available Now
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Experience</p>
                      <p className="text-lg font-semibold text-white">{doctor.experience} years</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Rating</p>
                      <StarRating rating={doctor.rating} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="text-white">📍 {doctor.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Consultation Fee</p>
                      <p className="text-lg font-semibold text-white">${doctor.fees}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* About Section */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">About</h3>
                <p className="text-gray-300 leading-relaxed">
                  {doctor.description || doctor.about}
                </p>
              </div>

              {/* Languages */}
              {doctor.languages && doctor.languages.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {doctor.languages.map((lang, index) => (
                      <span key={index} className="bg-slate-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Education & Certifications */}
              {(doctor.education || doctor.certifications) && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4">Qualifications</h3>
                  
                  {doctor.education && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-300 mb-2">Education</h4>
                      <ul className="space-y-1">
                        {doctor.education.map((edu, index) => (
                          <li key={index} className="text-gray-400">• {edu}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {doctor.certifications && (
                    <div>
                      <h4 className="font-semibold text-gray-300 mb-2">Certifications</h4>
                      <ul className="space-y-1">
                        {doctor.certifications.map((cert, index) => (
                          <li key={index} className="text-gray-400">• {cert}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Availability */}
              {doctor.availability && doctor.availability.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Weekly Availability</h3>
                  <div className="flex flex-wrap gap-2">
                    {doctor.availability.map((day, index) => (
                      <span key={index} className="bg-blue-900/30 text-blue-300 px-3 py-1 rounded-full text-sm border border-blue-700/50">
                        {day}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Booking Section */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 sticky top-6">
              <h3 className="text-xl font-semibold text-white mb-6">Book Consultation</h3>
              
              {/* Consultation Types */}
              {doctor.consultationTypes && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-300 mb-3">Consultation Type</h4>
                  <div className="space-y-2">
                    {doctor.consultationTypes.map((type, index) => (
                      <label key={index} className="flex items-center space-x-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="consultationType" 
                          className="text-blue-500 focus:ring-blue-500"
                          defaultChecked={index === 0}
                        />
                        <span className="text-gray-300">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Time Slots */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-300 mb-3">Available Time Slots</h4>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((slot, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`p-2 text-sm rounded-lg border transition-colors ${
                        selectedTimeSlot === slot
                          ? 'bg-blue-600 border-blue-500 text-white'
                          : 'bg-slate-700 border-slate-600 text-gray-300 hover:bg-slate-600'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Booking Summary */}
              <div className="bg-slate-900/50 p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Consultation Fee</span>
                  <span className="text-white font-semibold">${doctor.fees}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Platform Fee</span>
                  <span className="text-white">$5</span>
                </div>
                <hr className="border-slate-700 my-2" />
                <div className="flex justify-between items-center">
                  <span className="text-white font-semibold">Total</span>
                  <span className="text-white font-bold">${doctor.fees + 5}</span>
                </div>
              </div>

              {/* Book Button */}
              <button
                onClick={handleBookConsultation}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                Book Consultation
              </button>

              <p className="text-xs text-gray-500 mt-4 text-center">
                You can reschedule or cancel up to 2 hours before the appointment
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;