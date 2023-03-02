import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const changeField = createAsyncThunk(
    'user/change_field',
    async ({field, value}, {rejectedWithValue, dispatch}) => {
        const config = {
            headers: {
                'Content-Type': field==='avatar'?'multipart/form-data':'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        }


        let body
        switch (field) {
            case "name":
                body =JSON.stringify({name: value});
                break;
            case "country":
                body = JSON.stringify({country: value});
                break;
            case "avatar":
                body = new FormData();
                body.append('avatar', value);
                break;
        }


        try {
            const response = await axios.patch(`${process.env.REACT_APP_REST_API}auth/users/me/`, body, config);
            if(response.status!==200) throw new Error();
        } catch (e) {
            if(localStorage.getItem('access')) {
                dispatch(checkAuthentication()).then(()=>{
                    dispatch(changeField({field:field, value: value}));
                })
            } else return rejectedWithValue('Ошибка смены поля пользователя');
        }
    }
)


export const changeEmail = createAsyncThunk(
    'user/reset_email',
    async (email, {rejectedWithValue}) => {
        const body = {
            email: email
        };

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };

        try {
            const response = await axios.post(`${process.env.REACT_APP_REST_API}auth/users/reset_email/`, body, config)
            if(response.status!==204) throw new Error();
            return response.data;
        } catch (e) {
            return rejectedWithValue('Ошибка смены почты')
        }
    }
)

export const register = createAsyncThunk(
    'user/register',
    async (credentials, {rejectWithValue}) => {

        const body = {
            email: credentials.email,
            name: credentials.name,
            country: credentials.country,
            password: credentials.password,
            re_password: credentials.re_password,
        };


        try {
            const response = await axios.post(`${process.env.REACT_APP_REST_API}auth/users/`, body);
            if (response.status !== 201) throw new Error('Ошибка регистрации')
            else return response.data;
        } catch (e) {
            return rejectWithValue('Ошибка регистрации. Перевроверьте поля');
        }
    }
);

export const registerActivation = createAsyncThunk(
    'user/register_activation',
    async ({uid, token}, {rejectWithValue}) => {

        const body = {
            uid: uid,
            token: token
        };

        try {
            const response = await axios.post(`${process.env.REACT_APP_REST_API}auth/users/activation/`, body);
            if (response.status !== 204) throw new Error('Ошибка активации пользователя')
            else return response.data
        } catch (e) {
            return rejectWithValue('Ошибка активации пользователя')
        }
    }
);


export const resetPasswordConfirm = createAsyncThunk(
    'user/reset_password_confirm',
    async ({uid, token, new_password, re_new_password}, {rejectedWithValue}) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        const body = JSON.stringify({
            'uid': uid,
            'token': token,
            'new_password': new_password,
            're_new_password': re_new_password
        });

        try {
            const response = await axios.post(`${process.env.REACT_APP_REST_API}auth/users/reset_password_confirm/`, body, config);
            if (response.status !== 204) throw new Error('Ошибка подтверждения смены пароля')
            else return response.data
        } catch (e) {
            return rejectedWithValue('Ошибка подтверждения смены пароля')
        }
    }
);

export const resetPassword = createAsyncThunk(
    'user/reset_password',
    async (email, {rejectWithValue}) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        const body = JSON.stringify({'email': email});

        try {
            const response = await axios.post(`${process.env.REACT_APP_REST_API}auth/users/reset_password/`, body, config)
            if (response.status !== 204) throw new Error('Ошибка сброса пароля')
            else return response.data
        } catch (e) {
            return rejectWithValue('Ошибка сброса пароля');
        }

    }
)

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
            const response = await axios.post(`${process.env.REACT_APP_REST_API}auth/jwt/refresh`, body, config);

            if (response.statusText !== 'OK') throw new Error('Ошибка обновления токена')
            else return response.data;
        } catch (e) {
            return rejectWithValue('Ошибка обновления токена');
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
                const res = await axios.post(`${process.env.REACT_APP_REST_API}auth/jwt/verify`, body, config);
                if (res.statusText !== 'OK' || res.data.code === 'token_not_valid') throw new Error('Verify error')
                dispatch(authorization());
            } catch (e) {
                try {
                    if (localStorage.getItem('refresh')) {
                        dispatch(refreshToken(localStorage.getItem('refresh')))
                            .then(() => dispatch(authorization()));
                    } else console.log('Ошибка рефреш токена')
                } catch (e) {
                    return rejectWithValue('Ошибка рефреш токена')
                }
            }
        } else return rejectWithValue('Ошибка проверки токена');

    }
)

export const authentication = createAsyncThunk(
    'user/authentication_user',
    async function ({email, password}, {rejectWithValue}) {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_REST_API}auth/jwt/create`,
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
            const response = await axios.get(`${process.env.REACT_APP_REST_API}auth/users/me`, {
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