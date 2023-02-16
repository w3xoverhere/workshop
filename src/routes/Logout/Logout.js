import React from 'react';
import {Navigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {userLogout} from "../../features/user/userSlice";

const Logout = () => {
    const dispatch = useDispatch();
    dispatch(userLogout());
    return <Navigate to='/'/>
};

export default Logout;