import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;
const newUrl = process.env.REACT_APP_BACKEND_BASE_URL_WITHOUT_API;
// Define the async action creator
export const fetchUserData = createAsyncThunk(
  'userDetails/fetchUserData',
  async (email, thunkAPI) => {
    try {
      const response = await axios.get(`${baseUrl}/user?email=${email}`);
      // Return the data fetched from the API
      return response.data;
    } catch (error) {
      // Handle error
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to check authentication status
export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {
  const response = await axios.get(`${newUrl}/auth/status`, { withCredentials: true });
  // console.log(response.data);
  return response.data;
});

// Async thunk to handle logout
export const logout = createAsyncThunk('auth/logout', async () => {
  await axios.get(`${newUrl}/logout`, { withCredentials: true });
});

// Define the initial state
const initialState = {
  UserDetails: null,
  loading: false,
  error: null,
};

// Define the slice
const UserDetailSlice = createSlice({
  name: 'UserDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle pending state
    builder.addCase(fetchUserData.pending, (state) => {
      state.loading = true;
    });
    // Handle fulfilled state
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.loading = false;
      state.UserDetails = action.payload;
    });
    // Handle rejected state
    builder.addCase(fetchUserData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default UserDetailSlice.reducer;
export const { logoutSuccess,setUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
