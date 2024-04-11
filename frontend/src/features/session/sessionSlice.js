import { createSlice } from '@reduxjs/toolkit';
import 
{
  fetchUserDataAsync,
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
  token: null,
  error: null,
  currentUser : null
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    resetState: state => initialState
  },
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
      .addCase(signUpAsync.fulfilled, (state) => {
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
            state.currentUser= user;
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
        const loggedInUser = state.users.find(user => user);
        if (loggedInUser) {
          state.user = action.payload;
        }
        state.isLoading = false; // Clear loading state
      })
      .addCase(editUserAsync.rejected, (state) => {
        state.fail = true;
      })
      .addCase(logOutAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logOutAsync.fulfilled, (state) => {
        return { ...initialState };        
      })
      .addMatcher((action) => action.type.endsWith('/rejected'), (state) => {
        state.fail = true;
        state.isLoading = false;
      });
  },
});

export const { resetState } = sessionSlice.actions;

export default sessionSlice.reducer;
