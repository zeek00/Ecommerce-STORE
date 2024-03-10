import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {CARTURL} from "../../config";
import { getToken } from '../../helpers/helperFunctions';



const fetchUserCartAsync = createAsyncThunk('cart/fetchUserCartAsync', async(userId, thunkAPI) => {
    try{
        let accessToken = getToken();
        const response = await axios.get(`${CARTURL}/users/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken
            }
        })
        const data = response.data.items;
        return data;
    }catch(error){
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

const AddItemToUserCartAsync = createAsyncThunk('cart/AddItemToUserCartAsync', async(userData, thunkAPI) => {
    try{
        let accessToken = getToken();
        const response = await axios.post(`${CARTURL}/add`, userData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken
            }
        })
        const data = response;
        return data.data;
    }catch(error){
        return thunkAPI.rejectWithValue(error.response.data);
    }
});


export {fetchUserCartAsync, AddItemToUserCartAsync}