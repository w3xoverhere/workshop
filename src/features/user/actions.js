import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {REST_API_URL} from "../../env";

export const refreshToken = createAsyncThunk(
    'user/refresh_access',
    async (refresh, {rejectWithValue}) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        const body = JSON.stringify({'refresh': refresh});
        try {
            const response = await axios.post(`${REST_API_URL}auth/jwt/refresh`, body, config);

            if (response.statusText !== 'OK') throw new Error('Ошибка обновления токена');

            return response.data;
        } catch (e) {
            console.log('Ошибка проверки токена');
        }

    }
)

export const checkAuthentication = createAsyncThunk(
    'user/check_authentication',
    async (_, {rejectWithValue, dispatch}) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        const body = JSON.stringify({'token': localStorage.getItem('access')})
        if (localStorage.getItem('access')) {
            try {
                const res = await axios.post(`${REST_API_URL}auth/jwt/verify`, body, config);
                if (res.statusText !== 'OK' || res.data.code === 'token_not_valid') throw new Error('Verify error')
                dispatch(authorization());
            } catch (e) {
                try {
                    if (localStorage.getItem('refresh')) {
                        dispatch(refreshToken(localStorage.getItem('refresh')))
                            .then(() => dispatch(authorization()));
                    } else console.log('Ошибка рефреш токена')
                } catch (e) {
                    console.log('Ошибка рефреш токена токена')
                }
            }
        } else console.log('Ошибка проверки токена');

    }
)

export const authentication = createAsyncThunk(
    'user/authentication_user',
    async function ({email, password}, {rejectWithValue}) {
        try {
            const response = await axios.post(
                `${REST_API_URL}auth/jwt/create`,
                {
                    email: email,
                    password: password
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

            if (response.statusText !== 'OK') throw new Error()

            return response.data;
        } catch (e) {
            return rejectWithValue('Ошибка аутенфикации пользователя!');
        }
    }
)

export const authorization = createAsyncThunk(
    'user/authorization_user',
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${REST_API_URL}auth/users/me`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                    'Accept': 'application/json'
                }
            })

            if (response.statusText !== 'OK') throw Error();
            return response.data;

        } catch (e) {
            return rejectWithValue('Ошибка авторизации пользователя!');
        }
    }
)