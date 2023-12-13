import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {v4 as uuidv4} from 'uuid';

// Async Thunk for signing up
export const signUpAsync = createAsyncThunk('session/signUpAsync', async (userData, thunkAPI) => {
  try {
    const response = await fetch('http://localhost:4050/api/reg/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Sign-up failed');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error during sign-up:', error);

    throw error;
  }
});

// Async Thunk for signing in
export const signInAsync = createAsyncThunk('session/signInAsync', async (userData, thunkAPI) => {
  try {
    const response = await fetch('http://localhost:4050/api/reg/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Sign-in failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during sign-in:', error);
    throw error;
  }
});

// Async Thunk for editing user
export const editUserAsync = createAsyncThunk('session/editUserAsync', async (userData, thunkAPI) => {
  try {
    const loggedInUser = thunkAPI.getState().session.users.find(user => user.isLoggedIn);
    if (loggedInUser) {
      const response = await fetch(`http://localhost:4050/api/reg/users/edit/${loggedInUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Edit user failed');
      }

      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error during user edit:', error);

    throw error;
  }
});

// Async Thunk for logging out
export const logOutAsync = createAsyncThunk('session/logOutAsync', async (_, thunkAPI) => {
  try {
    console.log('Attempting logout...');

    const loggedInUser = thunkAPI.getState().session.users.currentUser !== null;
    console.log('is there a user logged in: ' + loggedInUser);

    if (loggedInUser) {
      console.log('Logging out user:', loggedInUser);

      const response = await fetch(`http://localhost:4050/api/reg/logout`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }
    }
  } catch (error) {
    console.error('Error during logout:', error);

    throw error;
  }
});

const initialState = {
  users: [],
  fail: false,
  isLoading: false,
  currentUser: null
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      .addCase(signInAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signInAsync.fulfilled, (state, action) => {
        const loggedInUserIndex = state.users.findIndex(user => user.id === action.payload.id);
        console.log('the index is: ' + loggedInUserIndex);
        if (loggedInUserIndex !== -1) {
          state.users = [...state.users];
          state.users.forEach((user, index) => {
            state.users[index] = {
              ...user,
              isLoggedIn: index === loggedInUserIndex,
            };
          });
        }
        state.isLoading = false;

        state.currentUser = action.payload; //sets the current user
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
