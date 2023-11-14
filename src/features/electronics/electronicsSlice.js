import {createSlice} from '@reduxjs/toolkit';

const initialState ={
    smartphones: [],
    laptops: []

}

const options = {
    name: 'electronics',
    initialState,
    reducers:{    
        addSmartphones(state,action){
            state.smartphones = action.payload
       },
       addLaptops(state, action){
           state.laptops = action.payload
       }
    }
}



export const electronicsSlice = createSlice(options)
export const {addSmartphones, addLaptops} = electronicsSlice.actions
export default electronicsSlice.reducer;