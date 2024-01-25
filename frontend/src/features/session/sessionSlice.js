import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {URL} from "../../config";
import { v4 as uuidv4 } from 'uuid';


// Async Thunk for fetching all users
export const fetchAllUsersAsync = createAsyncThunk('session/fetchAllUsersAsync', async (_, thunkAPI) => {
  try{
    const response = await axios.get(`${URL}/users`, {
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.TOKEN_KEY}`
      },
    });

    const data = response.data;
    return data;

  }catch (error){
    console.error('Error during fetch all users:', error);
    throw error;
  }
});

// Async Thunk for fetching a users savedItems
export const savedItemsAsync = createAsyncThunk('session/savedItemsAsync', async (userData, thunkAPI) => {
  try{
    if(userData.id){
      const entries = Object.entries(userData);

      const sortedEntries = entries
        .filter(([key]) => key !== 'id' && key !== 'token')
        .sort(([keyA], [keyB]) => keyA - keyB);
      
      // Step 3: Create a new object from the sorted array
      const sortedObject = Object.fromEntries(sortedEntries);
      const response = await axios.post(`${URL}/users/${userData.id}`, sortedObject, {
      headers:{
        'Content-Type': 'application/json',
        'Authorization': userData.token
      },
    });
    
    const data = response.data;
    return data;
  }else {
    console.error('Error during fetch all users: Logged in user not found.');
    throw new Error('Logged in user not found.');
  }

  }catch (error){
    console.error('Error during fetch all users:', error);
    throw error;
  }
});

// Async Thunk for signing up
export const signUpAsync = createAsyncThunk('session/signUpAsync', async (userData, thunkAPI) => {
  try {
    const response = await axios.post(`${URL}/signup`, userData);

    return response.data;
  } catch (error) {
    console.error('Error during sign-up:', error);

    throw error;
  }
});

// Async Thunk for signing in
export const signInAsync = createAsyncThunk('session/signInAsync', async (userData, thunkAPI) => {
  try {
    const response = await axios.post(`${URL}/signin`, userData);

    return response.data;
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
      const response = await axios.put(`${URL}/users/edit/${loggedInUser.id}`, userData);

      return response.data;
    }
  } catch (error) {
    console.error('Error during user edit:', error);

    throw error;
  }
});

// Async Thunk for logging out
export const logOutAsync = createAsyncThunk('session/logOutAsync', async (_, thunkAPI) => {
  try {
    const loggedInUser = thunkAPI.getState().session.users.currentUser !== null;
    if (loggedInUser) {
      await axios.post(`${URL}/logout`);
    }
  } catch (error) {
    console.error('Error during logout:', error);

    throw error;
  }
});

const initialState = {
  users: [],
  savedItems: [],
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
      .addCase(signUpAsync.rejected, (state) => {
        state.fail = true;
      })
      .addCase(signInAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signInAsync.fulfilled, (state, action) => {
        const loggedInUserIndex = state.users.length > 0
          ? state.users.findIndex(user => user._id === action.payload._id)
          : -1
        ;
        if (loggedInUserIndex !== -1) {
          state.users[loggedInUserIndex].isLoggedIn = true;
        }
        state.currentUser = action.payload; //sets the current user
        state.isLoading = false;

      })
      .addCase(signInAsync.rejected, (state) => {
        state.fail = true;
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
