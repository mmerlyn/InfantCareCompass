import { createSlice } from "@reduxjs/toolkit";

export const doctorSlice = createSlice({
  name: 'doctor',
  initialState: {
    doctors: [],
    selectedDoctor: null,
    loading: false,
    error: null
  },
  reducers: {
    // Set all doctors data
    setDoctors: (state, action) => {
      state.doctors = action.payload;
      state.loading = false;
      state.error = null;
    },
    
    // Add single doctor info
    doctorInfo: (state, action) => {
      const doctorExists = state.doctors.find(doc => doc._id === action.payload._id);
      if (!doctorExists) {
        state.doctors.push(action.payload);
      }
    },
    
    // Set selected doctor for details view
    setSelectedDoctor: (state, action) => {
      state.selectedDoctor = action.payload;
    },
    
    // Set loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    
    // Set error state
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    
    // Update doctor online status
    updateDoctorStatus: (state, action) => {
      const { doctorId, isOnline } = action.payload;
      const doctor = state.doctors.find(doc => doc._id === doctorId);
      if (doctor) {
        doctor.isOnline = isOnline;
      }
    },
    
    // Clear all doctors
    clearDoctors: (state) => {
      state.doctors = [];
      state.selectedDoctor = null;
      state.error = null;
    }
  }
});

// Export actions
export const { 
  setDoctors,
  doctorInfo, 
  setSelectedDoctor, 
  setLoading, 
  setError, 
  updateDoctorStatus, 
  clearDoctors 
} = doctorSlice.actions;

// Selectors
export const selectAllDoctors = (state) => state.doctor.doctors;
export const selectSelectedDoctor = (state) => state.doctor.selectedDoctor;
export const selectDoctorsLoading = (state) => state.doctor.loading;
export const selectDoctorsError = (state) => state.doctor.error;

// Export the reducer as default
export default doctorSlice.reducer;