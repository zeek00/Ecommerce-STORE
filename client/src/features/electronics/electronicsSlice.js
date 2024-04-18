import {createSlice} from '@reduxjs/toolkit';

const initialState ={
    electronics: []

}

const options = {
    name: 'electronics',
    initialState,
    reducers:{    
        addElectronics(state,action){
            state.electronics = action.payload
       }
    }
}



export const electronicsSlice = createSlice(options)
export const {addElectronics} = electronicsSlice.actions
export const filterElectronics = (query, electronics) => Object.values(electronics).filter(item => item.category.toLowerCase().includes(query.toLowerCase()));

export default electronicsSlice.reducer;