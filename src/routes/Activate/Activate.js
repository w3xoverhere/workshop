import React, {useContext, useEffect} from 'react';
import {Navigate, useParams} from "react-router-dom";
import {useStoreDispatch} from "../../store/store";
import {registerActivation} from "../../features/user/actions";
import {ModalContext} from "../../contexts/modalContext/ModalContext";
import {useSelector} from "react-redux";

const Activate = () => {
    const user = useSelector(state => state.user);
    const modal = useContext(ModalContext);
    const {uid, token} = useParams();
    const dispatch = useStoreDispatch();

    useEffect(()=>{
        dispatch(registerActivation({uid: uid, token: token})).then(()=>{
            if(user.error.length>0) {
                modal.setMessage(user.error[0]);
                modal.setActive(true);
            } else {
                modal.setMessage('Успешная активация!');
                modal.setActive(true);
            }
        });
    }, [])

    return (
        <Navigate to='/'/>
    );
};

export default Activate;