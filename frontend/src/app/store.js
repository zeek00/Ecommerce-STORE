import { 
    combineReducers,
    configureStore 
} from '@reduxjs/toolkit';
import clothingReducer from '../features/clothing/clothingSlice';
import electronicsReducer from '../features/electronics/electronicsSlice';
import cartReducer from '../features/cart/cartSlice';
import loadingReducer from '../features/loading/loadingSlice';
import sessionReducer from '../features/session/sessionSlice';
import productsReducer from '../features/products/productsSlice';
import storage from 'redux-persist/lib/storage';
import { 
    persistReducer, 
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
 } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2
};

const rootReducer = combineReducers({
    electronics: electronicsReducer,
    clothing: clothingReducer,
    cart: cartReducer,
    loading: loadingReducer,
    session: sessionReducer,
    products: productsReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export const setupStore = (preloadedState) => {
    return store;
};

export const createPreloadedState = (customState) => {
    const currentState = store.getState();
    return {
        electronics: { ...currentState.electronics, ...customState.electronics },
        clothing: { ...currentState.clothing, ...customState.clothing },
        cart: { ...currentState.cart, ...customState.cart },
        loading: { ...currentState.loading, ...customState.loading },
        session: { ...currentState.session, ...customState.session },
        products: { ...currentState.products, ...customState.products },
    };
};
export const AppDispatch = store.dispatch;
export const AppStore = setupStore();
export const RootState = store.getState();

export default store;
