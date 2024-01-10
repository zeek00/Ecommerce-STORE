import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    male: [],
    female: []
}

const options = {
    name: 'clothing',
    initialState,
    reducers:{
        addMale(state, action){
            state.male = action.payload
        },
        addFemale(state, action){
            state.female = action.payload
        }
    }
}

export const clothingSlice = createSlice(options);
export const {addMale, addFemale} = clothingSlice.actions;
export const filterMale = (query, male) => Object.values(male).filter(item => item.category.toLowerCase().includes(query.toLowerCase()));
export const filterFemale = (query, female) => Object.values(female).filter(item => item.category.toLowerCase().includes(query.toLowerCase()));

export default clothingSlice.reducer;