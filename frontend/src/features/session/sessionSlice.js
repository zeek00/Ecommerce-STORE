import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  fail: false
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    signUp: (state, action) => {
      const { name, email, password, shippingAddress } = action.payload;
      const newUser = {
        id: state.users.length + 1,
        name,
        email,
        password,
        shippingAddress,
        orderHistory: [],
        isLoggedIn: true,
      };
      state.users.push(newUser);
      state.fail = false;
    },
    signIn: (state, action) => {
      const { name, password } = action.payload;
      const existingUserIndex = state.users.findIndex(user => user.name === name && user.password === password);

      if (existingUserIndex !== -1) {
        state.users = [...state.users]; // Shallow copy
        state.users.forEach((user, index) => {
          state.users[index] = {
            ...user,
            isLoggedIn: index === existingUserIndex,
          };
        });
      } else {
        state.fail = true;
        console.log('User not found!');
        console.log(state.fail);
      }
    },
    editUser: (state, action) => {
      const loggedInUser = state.users.find(user => user.isLoggedIn);

      if (loggedInUser) {
        state.users = [...state.users]; // Shallow copy
        state.users.forEach((user, index) => {
          state.users[index] = user.id === loggedInUser.id ? { ...user, ...action.payload } : user;
        });
      }
    },
    logOut: (state) => {
      // Set isLoggedIn to false for current user
      const loggedInUserIndex = state.users.findIndex(user => user.isLoggedIn);
      if (loggedInUserIndex !== -1) {
        state.users = [...state.users]; // Shallow copy
        state.users[loggedInUserIndex] = {
          ...state.users[loggedInUserIndex],
          isLoggedIn: false,
        };
      }
    },
  },
});

export const { signUp, signIn, logOut, editUser } = sessionSlice.actions;
export default sessionSlice.reducer;
