import {createSlice} from '@reduxjs/toolkit';
import { fetchUserCartAsync, AddItemToUserCartAsync, DeleteItemFromUserCartAsync } from './dataThunks'

const initialState ={
    cart: [],
    isLoading: false,
    error: null,
    message: null,
    count: null
}

const options = {
    name: 'cart',
    initialState,
    reducers:{
        removeCartItem: (state, action) => {
            
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserCartAsync.pending, (state)=>{
                state.isLoading = true;
            })
            .addCase(fetchUserCartAsync.fulfilled, (state, action) => {
                let items = action.payload;
                console.log(items)
                items.forEach(element => {
                    const isItemInCart = state.cart.some(item => item.id === element.id);
            
                    if (!isItemInCart) {
                        state.cart.push(element);
                    }
                });
                state.isLoading = false;

            })
            .addCase(fetchUserCartAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(AddItemToUserCartAsync.pending, (state)=>{
                state.isLoading = true; 
            })
            .addCase(AddItemToUserCartAsync.fulfilled, (state, action)=>{
                state.message = action.payload;
                state.count += 1;
                state.isLoading = false;
            })
            .addCase(AddItemToUserCartAsync.rejected, (state, action)=>{
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(DeleteItemFromUserCartAsync.pending, (state)=>{
                state.isLoading = true; 
            })
            .addCase(DeleteItemFromUserCartAsync.fulfilled, (state, action)=>{
                const {itemId} = action.payload
                const indexToRemove = state.cart.findIndex((item) => item.id === itemId);
                if (indexToRemove !== -1) {
                    state.cart.splice(indexToRemove, 1)
                }
                state.count -= 1;
                state.isLoading = false;
                state.message = action.payload;

            })
            .addCase(DeleteItemFromUserCartAsync.rejected, (state, action)=>{
                state.error = action.payload;
                state.isLoading = false;
            })
    }
}



export const cartSlice = createSlice(options)

export const { removeCartItem } = cartSlice.actions;
export default cartSlice.reducer;