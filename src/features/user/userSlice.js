import {createSlice} from '@reduxjs/toolkit';
import {
    authentication,
    authorization, changeEmail, changeField,
    checkAuthentication,
    refreshToken, register, registerActivation,
    resetPassword,
    resetPasswordConfirm
} from "./actions";


const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: false,
    user: null,
    error: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLogout(state) {
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            state.access = '';
            state.refresh = '';
            state.isAuthenticated = false;
            state.user = null;
            state.error = ''
        },
    },
    extraReducers: (builder) => {
        builder.addCase(authorization.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.error = '';
        })
            .addCase(authorization.rejected, (state, action) => {
                state.user = null;
                state.isAuthenticated = false;
                state.error = action.payload;

            })
            .addCase(checkAuthentication.rejected, (state, action) => {
                localStorage.removeItem('access');
                localStorage.removeItem('refresh');
                state.isAuthenticated = false;
                state.user = null;
                state.error = action.payload;
            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                localStorage.setItem('access', action.payload.access);
                state.access = action.payload.access;
                state.error = '';
            })
            .addCase(authentication.fulfilled, (state, action) => {
                state.access = action.payload.access;
                state.refresh = action.payload.refresh;
                localStorage.setItem('refresh', action.payload.refresh);
                localStorage.setItem('access', action.payload.access);
                state.error = '';
            })
            .addCase(authentication.rejected, (state, action) => {
                state.access = '';
                state.refresh = '';
                localStorage.removeItem('refresh');
                localStorage.removeItem('access');
                state.error = action.payload;
            })
            .addCase(resetPassword.fulfilled, (state) => {state.error = '';})
            .addCase(resetPassword.rejected, (state, action) => {state.error = action.payload;})
            .addCase(resetPasswordConfirm.fulfilled, (state) => {state.error = '';})
            .addCase(resetPasswordConfirm.rejected, (state, action) => {state.error = action.payload;})
            .addCase(register.fulfilled, (state) => {state.error = '';})
            .addCase(register.rejected, (state, action) => {state.error = action.payload;})
            .addCase(registerActivation.fulfilled, (state) => {state.error = '';})
            .addCase(registerActivation.rejected, (state, action) => {state.error = action.payload;})
            .addCase(changeField.fulfilled, (state) => {state.error = '';})
            .addCase(changeField.rejected, (state, action) => {state.error = action.payload;})
            .addCase(changeEmail.fulfilled, (state) => {state.error = '';})
            .addCase(changeEmail.rejected, (state, action) => {state.error = action.payload;})
    }
});

export const {userLogout} = userSlice.actions
export default userSlice.reducer