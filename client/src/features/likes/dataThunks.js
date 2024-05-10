import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {LIKESURL} from "../../helpers/config";
import { getToken } from '../../helpers/helperFunctions';



const fetchUserLikesAsync = createAsyncThunk('cart/fetchUserLikesAsync', async(userId, thunkAPI) => {
    try{
        let accessToken = getToken();
        const response = await axios.get(`${process.env.PORT}${LIKESURL}/users/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken
            }
        })
        const data = await response.data.items;
        return data;
    }catch(error){
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

const AddItemToUserLikesAsync = createAsyncThunk('cart/AddItemToUserLikesAsync', async(userData, thunkAPI) => {
    try{
        let accessToken = getToken();
        const response = await axios.post(`${process.env.PORT}${LIKESURL}/add`, userData, {
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
const DeleteItemFromUserLikesAsync = createAsyncThunk('cart/DeleteItemFromUserLikesAsync', async(userData, thunkAPI) => {
    try{
        let accessToken = getToken();
        const {userId, itemId} = userData
        const response = await axios.delete(`${process.env.PORT}${LIKESURL}/delete/${userId}/${itemId}`, {
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


export {fetchUserLikesAsync, AddItemToUserLikesAsync, DeleteItemFromUserLikesAsync}