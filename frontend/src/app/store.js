import { configureStore } from '@reduxjs/toolkit';
import clothingReducer from '../features/clothing/clothingSlice';
import electronicsReducer from '../features/electronics/electronicsSlice';
import cartReducer from '../features/cart/cartSlice';
import loadingReducer from '../features/loading/loadingSlice';
import sessionReducer from '../features/session/sessionSlice'



const store = configureStore({
    reducer:{
        electronics: electronicsReducer,
        clothing: clothingReducer,
        cart: cartReducer,
        loading: loadingReducer,
        session: sessionReducer
    }

});

export default store;