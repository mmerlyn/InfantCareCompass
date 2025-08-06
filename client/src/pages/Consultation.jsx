import React, { useState, useEffect, useMemo } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import DoctorCard from "../components/DoctorCard.jsx";
import SkeletonLoader from "../components/SkeletonLoader.jsx";

// Updated mock pediatric doctor data with firstName and lastName
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
    availability: ["Monday", "Tuesday", "Wednesday", "Friday"]
  },
  {
    _id: "2", 
    firstName: "Michael",
    lastName: "Chen",
    specialization: "Pediatric Cardiology",
    experience: 12,
    rating: 4.9,
    location: "Boston, MA", 
    hospital: "Boston Children's Hospital",
    fees: 200,
    isOnline: true,
    avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face",
    about: "Pediatric cardiologist with expertise in congenital heart defects and infant cardiac care.",
    description: "Pediatric cardiologist with expertise in congenital heart defects and infant cardiac care.",
    languages: ["English", "Mandarin"],
    availability: ["Monday", "Thursday", "Friday"]
  },
  {
    _id: "3",
    firstName: "Emily",
    lastName: "Rodriguez", 
    specialization: "Neonatology",
    experience: 6,
    rating: 4.7,
    location: "Los Angeles, CA",
    hospital: "UCLA Mattel Children's Hospital",
    fees: 180,
    isOnline: false,
    avatar: "https://images.unsplash.com/photo-1594824388853-d5ffe1bfb5be?w=100&h=100&fit=crop&crop=face",
    about: "Neonatal intensive care specialist focusing on premature babies and high-risk newborns.",
    description: "Neonatal intensive care specialist focusing on premature babies and high-risk newborns.",
    languages: ["English", "Spanish"],
    availability: ["Tuesday", "Wednesday", "Saturday"]
  },
  {
    _id: "4",
    firstName: "David",
    lastName: "Kim",
    specialization: "Pediatric Neurology", 
    experience: 10,
    rating: 4.6,
    location: "Chicago, IL",
    hospital: "Ann & Robert H. Lurie Children's Hospital",
    fees: 220,
    isOnline: true,
    avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=100&fit=crop&crop=face",
    about: "Pediatric neurologist specializing in developmental disorders and infant neurological conditions.",
    description: "Pediatric neurologist specializing in developmental disorders and infant neurological conditions.",
    languages: ["English", "Korean"],
    availability: ["Monday", "Wednesday", "Friday"]
  },
  {
    _id: "5",
    firstName: "Lisa",
    lastName: "Thompson",
    specialization: "Pediatrics",
    experience: 15,
    rating: 4.9,
    location: "Seattle, WA",
    hospital: "Seattle Children's Hospital",
    fees: 160, 
    isOnline: true,
    avatar: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=100&h=100&fit=crop&crop=face",
    about: "General pediatrician with extensive experience in preventive care, vaccinations, and child wellness.",
    description: "General pediatrician with extensive experience in preventive care, vaccinations, and child wellness.",
    languages: ["English"],
    availability: ["Monday", "Tuesday", "Thursday", "Friday"]
  },
  {
    _id: "6",
    firstName: "Priya",
    lastName: "Sharma",
    specialization: "Pediatric Endocrinology",
    experience: 9,
    rating: 4.8,
    location: "Houston, TX",
    hospital: "Texas Children's Hospital",
    fees: 190,
    isOnline: true,
    avatar: "https://images.unsplash.com/photo-1594824388853-d5ffe1bfb5be?w=100&h=100&fit=crop&crop=face",
    about: "Specializes in hormonal disorders in children, growth problems, and pediatric diabetes management.",
    description: "Specializes in hormonal disorders in children, growth problems, and pediatric diabetes management.",
    languages: ["English", "Hindi", "Spanish"],
    availability: ["Tuesday", "Wednesday", "Thursday"]
  }
];

const ConsultationPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [doctorData, setDoctorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedSpecialty, setSelectedSpecialty] = useState(searchParams.get('specialty') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'name');
  const [onlineOnly, setOnlineOnly] = useState(searchParams.get('online') === 'true');

  // Load doctors (simulate API call)
  useEffect(() => {
    console.log("🔄 Loading doctors...");
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      setDoctorData(mockDoctors);
      setLoading(false);
      console.log("✅ Loaded", mockDoctors.length, "doctors");
    }, 1000);
  }, []);

  // Filter and sort doctors
  const filteredAndSortedDoctors = useMemo(() => {
    let filtered = doctorData.filter(doctor => {
      // Create full name for search
      const fullName = `${doctor.firstName} ${doctor.lastName}`.toLowerCase();
      
      // Search filter
      const matchesSearch = !searchTerm || 
        fullName.includes(searchTerm.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.hospital.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Specialty filter
      const matchesSpecialty = !selectedSpecialty || 
        doctor.specialization === selectedSpecialty;
      
      // Online filter
      const matchesOnline = !onlineOnly || doctor.isOnline;
      
      return matchesSearch && matchesSpecialty && matchesOnline;
    });

    // Sort doctors
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          const nameA = `${a.firstName} ${a.lastName}`;
          const nameB = `${b.firstName} ${b.lastName}`;
          return nameA.localeCompare(nameB);
        case 'experience':
          return b.experience - a.experience;
        case 'rating':
          return b.rating - a.rating;
        case 'fees':
          return a.fees - b.fees;
        case 'availability':
          if (a.isOnline !== b.isOnline) {
            return b.isOnline - a.isOnline;
          }
          const nameA2 = `${a.firstName} ${a.lastName}`;
          const nameB2 = `${b.firstName} ${b.lastName}`;
          return nameA2.localeCompare(nameB2);
        default:
          return 0;
      }
    });

    return filtered;
  }, [doctorData, searchTerm, selectedSpecialty, sortBy, onlineOnly]);

  // Get unique specialties
  const specialties = useMemo(() => {
    return [...new Set(doctorData.map(doc => doc.specialization))].sort();
  }, [doctorData]);

  // Update URL parameters
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (selectedSpecialty) params.set('specialty', selectedSpecialty);
    if (sortBy !== 'name') params.set('sort', sortBy);
    if (onlineOnly) params.set('online', 'true');
    
    setSearchParams(params, { replace: true });
  }, [searchTerm, selectedSpecialty, sortBy, onlineOnly, setSearchParams]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSpecialty('');
    setSortBy('name');
    setOnlineOnly(false);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-900 text-gray-300 font-sans">
      
      {/* Sidebar with Doctors */}
      <div className="w-full md:w-1/3 lg:w-1/4 bg-slate-950/50 p-6 border-r border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-6">
          Find Doctors 🩺
        </h2>

        {/* Search and Filters */}
        <div className="space-y-4 mb-6">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search doctors, hospitals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-400"
            />
            <span className="absolute right-3 top-3.5 text-slate-400">🔍</span>
          </div>

          {/* Specialty Filter */}
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
          >
            <option value="">All Specialties</option>
            {specialties.map(specialty => (
              <option key={specialty} value={specialty}>{specialty}</option>
            ))}
          </select>

          {/* Sort Options */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
          >
            <option value="name">Sort by Name</option>
            <option value="experience">Sort by Experience</option>
            <option value="rating">Sort by Rating</option>
            <option value="fees">Sort by Fees (Low to High)</option>
            <option value="availability">Sort by Availability</option>
          </select>

          {/* Online Only Checkbox */}
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={onlineOnly}
              onChange={(e) => setOnlineOnly(e.target.checked)}
              className="rounded border-slate-600 bg-slate-800 text-blue-500 focus:ring-blue-500"
            />
            <span>Available now</span>
            <span className="text-green-400">●</span>
          </label>

          {/* Clear Filters */}
          {(searchTerm || selectedSpecialty || sortBy !== 'name' || onlineOnly) && (
            <button
              onClick={clearFilters}
              className="w-full p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-sm"
            >
              Clear All Filters
            </button>
          )}
        </div>

        {/* Results Count */}
        {!loading && !error && (
          <div className="text-sm text-slate-400 mb-4">
            {filteredAndSortedDoctors.length} of {doctorData.length} doctors
          </div>
        )}

        {/* Doctor List */}
        <div className="max-h-[calc(100vh-24rem)] overflow-y-auto pr-2 custom-scrollbar">
          {loading && (
            <div className="space-y-4">
              <SkeletonLoader />
              <SkeletonLoader />
              <SkeletonLoader />
            </div>
          )}

          {!loading && !error && filteredAndSortedDoctors.length === 0 && (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">👨‍⚕️</div>
              <p className="text-gray-400 mb-2">
                {searchTerm || selectedSpecialty || onlineOnly
                  ? "No doctors match your criteria" 
                  : "No doctors available"
                }
              </p>
            </div>
          )}

          {!loading && !error && filteredAndSortedDoctors.length > 0 && (
            <div className="space-y-3">
              {filteredAndSortedDoctors.map((doctor) => (
                <DoctorCard key={doctor._id} doctor={doctor} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full md:w-2/3 lg:w-3/4 p-6 md:p-8 bg-slate-900">
        <div className="bg-slate-800/50 rounded-xl h-full p-8">
          {/* Welcome Area */}
          <div className="text-center py-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Pediatric Consultation 🏥
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Connect with experienced pediatric specialists from top children`s hospitals
            </p>
            
            {/* Services Info */}
            <div className="bg-blue-900/30 p-6 rounded-lg border border-blue-700/50 max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold text-blue-300 mb-4">
                🩺 Available Services
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-left text-gray-300 text-sm">
                <div>
                  <p>• Vaccination consultations</p>
                  <p>• Child development assessments</p>
                  <p>• Growth monitoring</p>
                  <p>• Preventive care guidance</p>
                </div>
                <div>
                  <p>• Pediatric cardiology</p>
                  <p>• Neonatal intensive care</p>
                  <p>• Neurological support</p>
                  <p>• Endocrine disorders</p>
                </div>
              </div>
            </div>

            {/* Featured Hospitals */}
            <div className="mt-8 bg-purple-900/20 p-4 rounded-lg border border-purple-700/30">
              <h4 className="text-purple-300 font-semibold mb-2">🏥 Partner Hospitals</h4>
              <div className="text-xs text-gray-400 flex flex-wrap justify-center gap-2">
                <span>Children`s Hospital of NYC</span>
                <span>•</span>
                <span>Boston Children`s Hospital</span>
                <span>•</span>
                <span>UCLA Mattel Children`s</span>
                <span>•</span>
                <span>Texas Children`s Hospital</span>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-4 max-w-md mx-auto text-center">
              <div>
                <div className="text-2xl font-bold text-blue-400">{doctorData.length}</div>
                <div className="text-xs text-gray-400">Doctors</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">
                  {doctorData.filter(d => d.isOnline).length}
                </div>
                <div className="text-xs text-gray-400">Online Now</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400">{specialties.length}</div>
                <div className="text-xs text-gray-400">Specialties</div>
              </div>
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ConsultationPage;