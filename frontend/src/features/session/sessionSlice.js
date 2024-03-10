import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import 
{
  fetchUserDataAsync,
  fetchAllUsersAsync,
  savedItemsAsync,
  signUpAsync,
  signInAsync,
  editUserAsync,
  logOutAsync
} from './dataThunks';


// Async Thunk for fetching all users

const initialState = {
  users: [],
  savedItems: [],
  fail: false,
  isLoading: false,
  currentUser: null,
  token: null,
  error: null
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDataAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserDataAsync.fulfilled, (state, action) => {
        const {accessToken, user} = action.payload;
        state.token = accessToken;
        state.userData = user;
        state.isLoading = false;
      })
      .addCase(fetchUserDataAsync.rejected, (state) => {
        state.isLoading = false;
        state.userData = {};
        state.token = null;
      })
      .addCase(fetchAllUsersAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllUsersAsync.fulfilled, (state, action) => {
       state.users.push(action.payload.allUsers);

      })
      .addCase(fetchAllUsersAsync.rejected, (state) => {
        state.fail = true;
        state.isLoading = false;
      })
      .addCase(savedItemsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(savedItemsAsync.fulfilled, (state, action) => {
        const items = Array.isArray(action.payload) ? [...action.payload] : { ...action.payload };

        //append to the existing savedItems array
        state.savedItems = state.savedItems.concat(items);
        state.fail = false;
        state.isLoading = false;

      })
      .addCase(savedItemsAsync.rejected, (state) => {
        state.fail = true;
      })
      .addCase(signUpAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUpAsync.fulfilled, (state, action) => {
        const newUser = {
          ...action.payload,
          id: uuidv4()
        };
        state.users.push(newUser);
        state.fail = false;
        state.isLoading = false;

      })
      .addCase(signUpAsync.rejected, (state, action) => {
        state.error = action.payload;
        state.fail = true;
      })
      .addCase(signInAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signInAsync.fulfilled, (state, action) => {
        const {accessToken, user} = action.payload;
            state.token = accessToken;
            state.currentUser = user;
            state.isLoading = false;

      })
      .addCase(signInAsync.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;

      })
      .addCase(editUserAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editUserAsync.fulfilled, (state, action) => {
        const loggedInUser = state.users.find(user => user.isLoggedIn);
        if (loggedInUser) {
          state.users = [...state.users];
          state.users.forEach((user, index) => {
            state.users[index] = user.id === action.payload.id ? action.payload : user;
          });
        }
        state.isLoading = false; // Clear loading state
        state.currentUser = action.payload
      })
      .addCase(editUserAsync.rejected, (state) => {
        state.fail = true;
      })
      .addCase(logOutAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logOutAsync.fulfilled, (state) => {
        const loggedInUserIndex = state.users.findIndex(user => user.isLoggedIn);
        if (loggedInUserIndex !== -1) {
          state.users = [...state.users];
          state.users.forEach((user, index) => {
            state.users[index] = index === loggedInUserIndex ? { ...user, isLoggedIn: false } : user;
          });
        }
        state.isLoading = false;
        state.currentUser = null; // Resets current user on logout
      })
      .addMatcher((action) => action.type.endsWith('/rejected'), (state) => {
        state.fail = true;
        state.isLoading = false;
      });
  },
});

export default sessionSlice.reducer;
