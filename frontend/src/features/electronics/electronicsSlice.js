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
export default electronicsSlice.reducer;