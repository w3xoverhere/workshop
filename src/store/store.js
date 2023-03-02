import {configureStore} from "@reduxjs/toolkit";
import userReducer from '../features/user/userSlice';
import {useDispatch} from "react-redux";
import favoriteReducer from '../features/favorite/favoriteSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        favorite: favoriteReducer
    },
})

export const useStoreDispatch = () => useDispatch();