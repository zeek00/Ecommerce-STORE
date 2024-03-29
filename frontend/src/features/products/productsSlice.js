import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    products: [],
    filtered: []
}

const options = {
    name: 'products',
    initialState,
    reducers:{
        addProducts(state, action){
            state.products = action.payload
        },
        addfilterProducts(state, action){
            state.filtered = state.products.filter(item=>item.category === action.payload)
        }
    }
}

export const productsSlice = createSlice(options);
export const {addProducts, addfilterProducts} = productsSlice.actions;

export default productsSlice.reducer;