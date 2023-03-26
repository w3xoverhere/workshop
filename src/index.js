import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './routes/Root/Root';
import './index.css'
import {createBrowserRouter, createRoutesFromElements, RouterProvider, Route} from "react-router-dom";
import Error from "./routes/Error/Error";
import Main from "./routes/Main/Main";
import Catalog from "./routes/Catalog/Catalog";
import Login from "./routes/Login/Login";
import Logout from "./routes/Logout/Logout";
import Forgot from "./routes/Forgot/Forgot";
import {Provider} from "react-redux";
import {store} from "./store/store";
import Register from "./routes/Register/Register";
import Profile from "./routes/Profile/Profile";
import CatalogDetail from "./routes/CatalogDetail/CatalogDetail";
import ForgotConfirm from "./routes/ForgotConfirm/ForgotConfirm";
import Activate from "./routes/Activate/Activate";
import ProfileSettings from "./routes/ProfileSettings/ProfileSettings";
import ResetEmail from "./routes/ResetEmail/ResetEmail";
import Favorite from "./routes/Favorite/Favorite";

const JSXRouter = createBrowserRouter(createRoutesFromElements(
    <Route element={<Root/>} path='/' errorElement={<Error/>}>
        <Route element={<Main/>} path='/'/>
        <Route element={<Login/>} path='/login/'/>
        <Route element={<Profile/>} path='/profile/'/>
        <Route element={<Favorite/>} path='/favorite/'/>
        <Route element={<ProfileSettings/>} path='/profile/settings/'/>
        <Route element={<Logout/>} path='/logout/'/>
        <Route element={<Register/>} path='/register/'/>
        <Route element={<Activate/>} path='/activate/:uid/:token'/>
        <Route element={<ResetEmail/>} path='/email/reset/confirm/:uid/:token'/>
        <Route element={<Forgot/>} path='/reset-password/'/>
        <Route element={<ForgotConfirm/>} path='/password/reset/confirm/:uid/:token'/>
        <Route element={<Catalog/>} path='/catalog/:type?'/>
        <Route element={<CatalogDetail/>} path='/catalog/:type/:id'/>
    </Route>
))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <RouterProvider router={JSXRouter}/>
    </Provider>
);

