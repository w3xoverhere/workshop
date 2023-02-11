import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './routes/Root/Root';
import './index.css'
import {createBrowserRouter, createRoutesFromElements, RouterProvider, Route} from "react-router-dom";
import Error from "./routes/Error/Error";
import Main from "./routes/Main/Main";
import Catalog from "./routes/Catalog/Catalog";

const JSXRouter = createBrowserRouter(createRoutesFromElements(
    <Route element={<Root/>} path='/' errorElement={<Error/>}>
        <Route element={<Main/>} path='/'/>
        <Route element={<Catalog/>} path='catalog/:type?'/>
    </Route>
))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={JSXRouter}/>
);

