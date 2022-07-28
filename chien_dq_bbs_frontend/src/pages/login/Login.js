import './Login.css'
import {useForm} from 'react-hook-form'
import {useState} from "react";
import {Header} from "../../components/header/Header";
import axios from "axios";

export const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [data, setData] = useState("");

    const onSubmit = data => {
        axios.post(`http://localhost:9000/login`, data, {withCredentials: true})
            .then(res => {
                localStorage.setItem("username",res.data)
            })
            .catch()
    }

    return (
        <>
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