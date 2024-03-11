import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {REGURL} from "../../config";
import { 
  getToken, 
  removeToken, 
  setToken,
  removeProfile,
  setProfile
} from '../../helpers/helperFunctions';


const fetchAllUsersAsync = createAsyncThunk('session/fetchAllUsersAsync', async (_, thunkAPI) => {
    try{
        const accessToken = getToken();
        const response = await axios.get(`${REGURL}/users`, {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        }
    });
  
      const data = response.data;
      return data;
  
    }catch (error){
      console.error('Error during fetch all users:', error);
      throw error;
    }
});
  
const fetchUserDataAsync = createAsyncThunk('session/fetchUserDataAsync', async (_, thunkAPI) => {
    try{
      const accessToken = getToken();
      const response = await axios.get(`${REGURL}/user`, {
        headers:{
          'Content-Type': 'application/json',
          'Authorization': accessToken
        }
      });
      return {...response.data, accessToken};
    }catch(e){
      removeToken();
      return thunkAPI.rejectWithValue('');
    }
});
  
  // Async Thunk for fetching a users savedItems
const savedItemsAsync = createAsyncThunk('session/savedItemsAsync', async (userData, thunkAPI) => {
    try{
        let accessToken = getToken();
        if(userData.id){
            const entries = Object.entries(userData);
    
            const sortedEntries = entries
            .filter(([key]) => key !== 'id')
            .sort(([keyA], [keyB]) => keyA - keyB)
            ;
            
            // Step 3: Create a new object from the sorted array
            const sortedObject = Object.fromEntries(sortedEntries);
            const response = await axios.post(`${REGURL}/users/${userData.id}`, sortedObject, {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken}
            });
            
            const data = response.data;
            return data;
        }
  
    }catch (error){
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
  
  // Async Thunk for signing up
const signUpAsync = createAsyncThunk('session/signUpAsync', async (userData, thunkAPI) => {
    try {
      const response = await axios.post(`${REGURL}/signup`, userData);
  
      return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
  
  // Async Thunk for signing in
const signInAsync = createAsyncThunk('session/signInAsync', async (userData, thunkAPI) => {
    try {
      const response = await axios.post(`${REGURL}/signin`, userData);
      setToken(response.data.accessToken);
      setProfile({
        email: response.data.user.email,
        name: response.data.user.name,
        id: response.data.user._id,
        role: response.data.user.role
      });
      return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
  
  // Async Thunk for editing user
const editUserAsync = createAsyncThunk('session/editUserAsync', async (userData, thunkAPI) => {
    try {
        let accessToken = getToken();
        const loggedInUser = thunkAPI.getState().session.users.find(user => user.isLoggedIn);
        if (loggedInUser) {
            const response = await axios.put(`${REGURL}/users/edit/${loggedInUser.id}`, userData, {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken}
            });
    
            return response.data;
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
  
  // Async Thunk for logging out
const logOutAsync = createAsyncThunk('session/logOutAsync', async () => {
    removeToken();
    removeProfile();
});
  

export {
    fetchUserDataAsync,
    fetchAllUsersAsync,
    savedItemsAsync,
    signUpAsync,
    signInAsync,
    editUserAsync,
    logOutAsync
};