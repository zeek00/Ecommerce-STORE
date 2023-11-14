import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    jewelry: []
}

const options = {
    name: 'jewelry',
    initialState,
    reducers:{
        addJewelries(state,action){
            state.jewelry = action.payload
        }
    }
}



export const jewelriesSlice = createSlice(options);
export const {addJewelries} = jewelriesSlice.actions;
export default jewelriesSlice.reducer;