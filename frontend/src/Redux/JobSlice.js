import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;

// Define the async action creator
export const fetchJobDetails = createAsyncThunk(
  'jobDetails/fetchJobDetails',
  async (jobId, thunkAPI) => {
    try {
      const response = await axios.get(`${baseUrl}/jobs/job/${jobId}`);
      // Return the data fetched from the API
      return response.data;
    } catch (error) {
      // Handle error
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Define the initial state
const initialState = {
  jobDetails: null,
  loading: false,
  error: null,
};

// Define the slice
const jobDetailsSlice = createSlice({
  name: 'jobDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle pending state
    builder.addCase(fetchJobDetails.pending, (state) => {
      state.loading = true;
    });
    // Handle fulfilled state
    builder.addCase(fetchJobDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.jobDetails = action.payload;
    });
    // Handle rejected state
    builder.addCase(fetchJobDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

// Export the async action creator and the slice reducer
// export { fetchJobDetails };
export default jobDetailsSlice.reducer;
