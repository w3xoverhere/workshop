import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {checkAuthentication} from "../user/actions";


export const getFavoriteCount = createAsyncThunk(
    'favorite/count',
    async (id, {rejectWithValue, dispatch}) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_REST_API}announcements/${id}/favorite-count/`, {
                headers: {
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                }
            })
            return response.data;
        } catch (e) {
            try {
                if (localStorage.getItem('refresh')) {
                    dispatch(checkAuthentication()).then(
                        () => {dispatch(getFavoriteCount(id));}
                    );
                } else return rejectWithValue(e.message)
            } catch (e) {
                return rejectWithValue(e.message)
            }
        }
    }
)


export const getFavoriteList = createAsyncThunk(
    'favorite/getFavoriteList',
    async ({userID}, {rejectWithValue, dispatch}) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        }
        try {
            const response = await axios.get(`${process.env.REACT_APP_REST_API}announcements/${userID}/favorite/`, config)
            if(response.status!==200) throw new Error('Error get ann list')
            return response.data;
        } catch (e) {
            try {
                if (localStorage.getItem('refresh')) {
                    dispatch(checkAuthentication()).then(
                        () => {dispatch(getFavoriteList({userID: userID}));}
                    );
                } else return rejectWithValue(e.message)
            } catch (e) {
                return rejectWithValue(e.message)
            }
        }
    }
)

export const addAnnToFavorite = createAsyncThunk(
    'favorite/addAnn',
    async ({userID, annID}, {rejectWithValue, dispatch}) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        }
        const body = JSON.stringify({announcement_id: annID})
        try {
            const response = await axios.post(`${process.env.REACT_APP_REST_API}announcements/${userID}/favorite/`,body, config)
            if(response.status!==201) throw new Error('Error add ann to favorite')
            dispatch(getFavoriteCount(userID));
            return response.data
        } catch (e) {
            try {
                if (localStorage.getItem('refresh')) {
                    dispatch(checkAuthentication()).then(
                        () => {dispatch(addAnnToFavorite({userID: userID, annID: annID}));}
                    );
                } else return rejectWithValue(e.message)
            } catch (e) {
                return rejectWithValue(e.message)
            }
        }
    }
)

export const removeAnnFromFavorite = createAsyncThunk(
    'favorite/removeAnn',
    async ({userID, annID}, {rejectWithValue, dispatch}) => {
        const body = JSON.stringify({announcement_id: annID})
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            },
            data: body
        }
        try {
            const response = await axios.delete(`${process.env.REACT_APP_REST_API}announcements/${userID}/favorite/`,config)
            if(response.status!==200) throw new Error('Error remove ann from favorite')
            dispatch(getFavoriteCount(userID));
            return response.data
        } catch (e) {
            try {
                if (localStorage.getItem('refresh')) {
                    dispatch(checkAuthentication()).then(
                        () => {dispatch(removeAnnFromFavorite({userID: userID, annID: annID}));}
                    );
                } else return rejectWithValue(e.message)
            } catch (e) {
                return rejectWithValue(e.message)
            }
        }
    }
)