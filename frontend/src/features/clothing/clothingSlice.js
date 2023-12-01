import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    tops:[],
    male: [],
    female: []
}

const options = {
    name: 'clothing',
    initialState,
    reducers:{
        addMale(state,action){
             state.male = {...action.payload}
        },
        addFemale(state, action){
            state.female = {...action.payload}
        },
        addTops(state, action){
            state.tops = {...action.payload}
        }
    }
}

export const clothingSlice = createSlice(options);
export const {addMale, addFemale, addTops} = clothingSlice.actions
export default clothingSlice.reducer;