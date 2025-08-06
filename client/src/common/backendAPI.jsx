// const backendDomain = "http://localhost:5000";
const backendDomain = "https://api.infantcarecompass.live";

const commonApiEndpoint = {
   register: {
    url: `${backendDomain}/api/signup`,
    method: 'post'
   },
   signin: {
    url: `${backendDomain}/api/signin`,
    method: 'post'
   },
   logout: {
    url: `${backendDomain}/api/logout`,
    method: 'post'
   },
   // Updated doctor endpoints
   doctorInfo: {
    url: `${backendDomain}/api/doctorinfo`,
    method: 'get'
   },
   doctorDetails: {
    url: `${backendDomain}/api/doctor`, // Will append /:id
    method: 'get'
   },
   searchDoctors: {
    url: `${backendDomain}/api/doctors/search`,
    method: 'post'
   },
   bookConsultation: {
    url: `${backendDomain}/api/consultation/book`,
    method: 'post'
   },
   newsletter: {
    url: `${backendDomain}/api/subscribe-newsletter`,
    method: 'post'
   },
}

export default commonApiEndpoint;

// Helper function to fetch doctor by ID
export const fetchDoctorById = async (doctorId) => {
  try {
    const response = await fetch(`${commonApiEndpoint.doctorDetails.url}/${doctorId}`, {
      method: commonApiEndpoint.doctorDetails.method,
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include' // If you need cookies for authentication
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching doctor details:', error);
    throw error;
  }
};

// Helper function to search doctors
export const searchDoctors = async (searchParams) => {
  try {
    const response = await fetch(commonApiEndpoint.searchDoctors.url, {
      method: commonApiEndpoint.searchDoctors.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(searchParams),
      credentials: 'include'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error searching doctors:', error);
    throw error;
  }
};