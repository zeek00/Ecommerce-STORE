import {createSlice} from '@reduxjs/toolkit';
import { fetchUserCartAsync, AddItemToUserCartAsync } from './dataThunks'

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
            const indexToRemove = state.cart.findIndex((item) => item.id === action.payload);
            if (indexToRemove !== -1) {
                state.cart.splice(indexToRemove, 1)
            }
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
                    // Check if the item is already in the cart
                    const isItemInCart = state.cart.some(item => item.id === element.id);
            
                    // If the item is not in the cart, push it
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
    }
}



export const cartSlice = createSlice(options)

export const { removeCartItem } = cartSlice.actions;
export default cartSlice.reducer;