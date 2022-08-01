import './Login.css'
import {useForm} from 'react-hook-form'
import {Header} from "../../components/header/Header";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    let navigate = useNavigate();

    const onSubmit = data => {
        axios.post(`http://localhost:9000/login`, data, {withCredentials: true})
            .then(res => {
                localStorage.setItem("username",res.data)
                navigate("/", { replace: true });            })
            .catch(e =>{
                toast("Username or password incorrect!")
            })
    }

    return (
        <>
            <ToastContainer />
            <Header/>
            <form onSubmit={handleSubmit(onSubmit)} className="login-container login">
                <h2 className="login-header">Log in</h2>
                <p><input type="email" placeholder="Email" {...register("email", {required: true})} /></p>
                <p><input type="password" placeholder="Password" {...register("password", {required: true, min: 8})} /></p>
                <p><input type="submit" /></p>
            </form>
        </>
    );
}