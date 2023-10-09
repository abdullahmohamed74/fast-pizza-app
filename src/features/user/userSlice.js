import { createSlice } from '@reduxjs/toolkit';
import { fetchUserAddress } from './fetchUserPositionThunk';

const getUserName = () => {
  return localStorage.getItem('userName');
};

const initialState = {
  userName: getUserName() || '',
  isLoading: false,
  position: {},
  address: '',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserName(state, action) {
      state.userName = action.payload;
      localStorage.setItem('userName', action.payload);
    },
    logout(state) {
      state.userName = '';
      localStorage.removeItem('userName');
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUserAddress.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchUserAddress.fulfilled, (state, action) => {
      state.isLoading = false;
      state.position = action.payload.position;
      state.address = action.payload.address;
    });

    builder.addCase(fetchUserAddress.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { updateUserName, logout } = userSlice.actions;
export default userSlice.reducer;
