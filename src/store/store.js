import {configureStore} from "@reduxjs/toolkit";
import userReducer from '../features/user/userSlice'
import {useDispatch} from "react-redux";

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
})

export const useStoreDispatch = () => useDispatch();