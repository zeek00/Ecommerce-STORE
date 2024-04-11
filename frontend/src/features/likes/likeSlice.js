import {createSlice} from '@reduxjs/toolkit';
import { fetchUserLikesAsync, AddItemToUserLikesAsync, DeleteItemFromUserLikesAsync } from './dataThunks'

const initialState = {
    likes: [],
    isLoading: false,
    error: null,
    message: null,
    count: null

}

const options = {
    name: 'likes',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserLikesAsync.pending, (state)=>{
                state.isLoading = true;
            })
            .addCase(fetchUserLikesAsync.fulfilled, (state, action) => {
                let items = action.payload;
                items.forEach(element => {
                    const isItemInLikes = state.likes.some(item => item.id === element.id);

                    if (!isItemInLikes) {
                        state.likes.push(element);
                    }
                });
                state.isLoading = false;

            })
            .addCase(fetchUserLikesAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(AddItemToUserLikesAsync.pending, (state)=>{
                state.isLoading = true; 
            })
            .addCase(AddItemToUserLikesAsync.fulfilled, (state, action)=>{
                state.message = action.payload;
                state.count += 1;
                state.isLoading = false;
            })
            .addCase(AddItemToUserLikesAsync.rejected, (state, action)=>{
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(DeleteItemFromUserLikesAsync.pending, (state)=>{
                state.isLoading = true; 
            })
            .addCase(DeleteItemFromUserLikesAsync.fulfilled, (state, action)=>{
                const {itemId} = action.payload
                const indexToRemove = state.likes.findIndex((item) => item.id === itemId);
                if (indexToRemove !== -1) {
                    state.likes.splice(indexToRemove, 1)
                }
                state.count -= 1;
                state.isLoading = false;
                state.message = action.payload;

            })
            .addCase(DeleteItemFromUserLikesAsync.rejected, (state, action)=>{
                state.error = action.payload;
                state.isLoading = false;
            })
    }
}



export const likeSlice = createSlice(options)

export default likeSlice.reducer;