import { Link } from 'react-router-dom';

export const StarRating = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    const isFull = i <= rating;
    const isHalf = !isFull && i - 0.5 <= rating;

    if (isFull) {
      stars.push(
        <svg
          key={i}
          aria-hidden="true"
          className="w-5 h-5 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      );
    } else if (isHalf) {
      stars.push(
        <div key={i} className="relative w-5 h-5">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
          <div className="absolute top-0 left-0 h-full w-1/2 overflow-hidden">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
          </div>
        </div>
      );
    } else {
      stars.push(
        <svg
          key={i}
          aria-hidden="true"
          className="w-5 h-5 text-gray-600"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      );
    }
  }

  return (
    <div className="flex items-center">
      {stars}
      <span className="ml-2 text-sm text-gray-400">({rating})</span>
    </div>
  );
};

const DoctorCard = ({ doctor }) => {
  // Using firstName and lastName as requested
  const { 
    _id, 
    firstName, 
    lastName, 
    specialization, 
    about, 
    description, 
    experience, 
    rating = 0, 
    fees, 
    hospital, 
    location, 
    isOnline, 
    avatar,
    languages = [],
    availability = []
  } = doctor;

  const fullName = `Dr. ${firstName} ${lastName}`;
  const displayDescription = description || about || "General practice physician";

  return (
    <li className="mb-4">
      <Link
        to={`/consultation/doctordetail/${_id}`}
        className="block p-4 bg-slate-800 rounded-lg hover:bg-slate-700 hover:shadow-lg transition-all duration-200 border border-slate-700/50 hover:border-slate-600"
      >
        <div className="flex items-start space-x-4">
          {/* Doctor Avatar */}
          <div className="flex-shrink-0">
            <img
              src={avatar || `https://api.dicebear.com/8.x/initials/svg?seed=${firstName} ${lastName}`}
              alt={fullName}
              className="w-16 h-16 rounded-full bg-slate-600 object-cover border-2 border-slate-600"
              onError={(e) => {
                e.target.src = `https://api.dicebear.com/8.x/initials/svg?seed=${firstName} ${lastName}`;
              }}
            />
          </div>

          <div className="flex-1 min-w-0">
            {/* Header Section */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="font-bold text-lg text-white mb-1 truncate">
                  {fullName}
                </h3>
                <p className="text-sm text-blue-300 mb-1">{specialization}</p>
                {hospital && (
                  <p className="text-xs text-gray-400 mb-2 truncate">🏥 {hospital}</p>
                )}
              </div>
              
              {/* Online Status Indicator */}
              <div className="flex items-center ml-2 flex-shrink-0">
                {isOnline ? (
                  <span className="flex items-center text-xs text-green-400 bg-green-900/30 px-2 py-1 rounded-full">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
                    Online
                  </span>
                ) : (
                  <span className="text-xs text-gray-500 bg-slate-700 px-2 py-1 rounded-full">
                    Offline
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-400 mb-3 line-clamp-2 leading-relaxed">
              {displayDescription}
            </p>

            {/* Languages */}
            {languages && languages.length > 0 && (
              <div className="mb-3">
                <div className="flex flex-wrap gap-1">
                  {languages.slice(0, 3).map((lang, index) => (
                    <span key={index} className="text-xs bg-slate-700 text-gray-300 px-2 py-1 rounded">
                      {lang}
                    </span>
                  ))}
                  {languages.length > 3 && (
                    <span className="text-xs text-gray-500">+{languages.length - 3} more</span>
                  )}
                </div>
              </div>
            )}

            {/* Stats Section */}
            <div className="flex justify-between items-center text-sm">
              <div className="flex space-x-4">
                <div>
                  <p className="text-xs text-gray-500">Experience</p>
                  <p className="text-gray-300 font-semibold">{experience} years</p>
                </div>
                {fees && (
                  <div>
                    <p className="text-xs text-gray-500">Consultation</p>
                    <p className="text-gray-300 font-semibold">${fees}</p>
                  </div>
                )}
              </div>
              
              <div className="flex-shrink-0">
                <StarRating rating={rating} />
              </div>
            </div>
            
            {/* Location */}
            {location && (
              <div className="mt-2 text-xs text-gray-500 truncate">
                📍 {location}
              </div>
            )}

            {/* Availability indicator */}
            {availability && availability.length > 0 && (
              <div className="mt-2 text-xs text-gray-500">
                📅 Available: {availability.slice(0, 2).join(', ')}
                {availability.length > 2 && ` +${availability.length - 2} more`}
              </div>
            )}
          </div>
        </div>
      </Link>
    </li>
  );
};

export default DoctorCard;