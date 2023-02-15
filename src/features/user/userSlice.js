import {createSlice} from '@reduxjs/toolkit';
import {authentication, authorization, checkAuthentication, refreshToken} from "./actions";


const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: false,
    user: null,
    error: [],
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(authorization.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.error = [];
        })
            .addCase(authorization.rejected, (state, action) => {
                state.user = null;
                state.isAuthenticated = false;
                state.error.push(action.payload);

            })
            .addCase(checkAuthentication.rejected, (state, action) => {
                localStorage.removeItem('access');
                localStorage.removeItem('refresh');

                state.isAuthenticated = false;
                state.user = null;
                state.error.push(action.payload);
            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                localStorage.setItem('access', action.payload.access);
                state.access = action.payload.access;
            })
            .addCase(authentication.fulfilled, (state, action) => {
                state.access = action.payload.access;
                state.refresh = action.payload.refresh;
                localStorage.setItem('refresh', action.payload.refresh);
                localStorage.setItem('access', action.payload.access);
                state.error = [];
            })
            .addCase(authentication.rejected, (state, action) => {
                state.access = '';
                state.refresh = '';
                localStorage.removeItem('refresh');
                localStorage.removeItem('access');
                state.error.push(action.payload);
            })
    }
});

export default userSlice.reducer