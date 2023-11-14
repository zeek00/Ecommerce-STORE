import {createSlice} from '@reduxjs/toolkit';

const initialState ={
    cart: []
}

const options = {
    name: 'cart',
    initialState,
    reducers:{
        addToCart: (state, action) => {
            const { name, price } = action.payload;
            if (state[name]) {
              state[name].quantity += 1;
            } else {
              state[name] = { price, quantity: 1 };
            }
        },
        changeItemQuantity: (state, action) => {
            const { name, newQuantity } = action.payload;
            state[name].quantity = newQuantity;
        },
    }
}



export const cartSlice = createSlice(options)

export const { addToCart, changeItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;