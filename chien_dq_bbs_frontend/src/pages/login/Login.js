import './Login.css'
import {useForm} from 'react-hook-form'
import {useState} from "react";
import {Header} from "../../components/header/Header";

export const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [data, setData] = useState("");
    const onSubmit = data => console.log(data);

    return (
        <>
            <Header/>
            <form onSubmit={handleSubmit(onSubmit)} className="login-container">
                <p><input type="email" placeholder="Email" {...register("Email", {})} /></p>
                <p><input type="password" placeholder="Password" {...register("Password", {required: true, min: 8})} /></p>
                <p><input type="submit" /></p>
            </form>
        </>
    );
}