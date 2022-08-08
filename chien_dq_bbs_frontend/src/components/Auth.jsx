import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";

export const Auth = () => {

    let navigate = useNavigate();
    let location = useLocation();

    let accountId = localStorage.getItem('accountId');
    let uname = localStorage.getItem('username');

    useEffect(()=>{
        if(accountId ===null || uname === null){
            localStorage.clear();
            navigate('/login');
        }else {
            axios.get("/ping", {withCredentials:true})
                .then(rs =>{
                    if(location.pathname === '/login' || location.pathname === '/signup'){
                        navigate('/');
                    }
                })
                .catch(e=>{
                    localStorage.clear();
                    navigate('/login');
                })
        }
    }, [])

}