import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    name: '',
    email: '',
    phone: '',
    password: '',
  },
  isLoggedIn: false,
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    signUp: (state, action) => {
      state.user = { ...action.payload };
      state.isLoggedIn = true;
    },
    editUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    logOut: (state) => {
      state.user = {
        name: '',
        email: '',
        phone: '',
        password: '',
      };
      state.isLoggedIn = false;
    },
  },
});

export const { signUp, logOut, editUser } = sessionSlice.actions;
export default sessionSlice.reducer;
