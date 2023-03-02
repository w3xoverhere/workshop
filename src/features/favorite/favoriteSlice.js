import {createSlice} from "@reduxjs/toolkit";
import {addAnnToFavorite, getFavoriteCount, getFavoriteList, removeAnnFromFavorite} from "./actions";

const initialState = {
    count: 0,
    announcements: [],
    error: '',
}

export const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        clearFavorite(state) {
            state.announcements = [];
            state.error = '';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getFavoriteCount.fulfilled, (state, action) => {
            state.count = action.payload
        })
        builder.addCase(getFavoriteCount.rejected, (state, action) => {
            state = {...state};
            state.error = action.payload;
        })
        builder.addCase(getFavoriteList.fulfilled, (state, action) => {
            state.announcements = action.payload.favorite_ann;
        })
        builder.addCase(getFavoriteList.rejected, (state, action) => {
            state.announcements = [];
            state.error = action.payload;
        })
        builder.addCase(addAnnToFavorite.fulfilled, (state) => {
            state = {...state};
        })
        builder.addCase(addAnnToFavorite.rejected, (state, action) => {
            state = {...state};
            state.error = action.payload;
        })
        builder.addCase(removeAnnFromFavorite.fulfilled, (state,action) => {
            state.announcements.map((ann) => {
                if(ann.id === Number(action.payload.removed))
                    state.announcements.splice(state.announcements.indexOf(ann), 1);
            })
        })
        builder.addCase(removeAnnFromFavorite.rejected, (state, action) => {
            state = {...state};
            state.error = action.payload;
        })
    }
})

export default favoriteSlice.reducer;
export const {clearFavorite} = favoriteSlice.actions;