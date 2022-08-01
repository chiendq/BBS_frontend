import './Signup.css'
import {useForm} from 'react-hook-form'
import {Header} from "../../components/header/Header";
import {useNavigate} from "react-router-dom";

import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const Signup = () => {

    const {register, handleSubmit, formState: {errors}} = useForm();

    let navigate = useNavigate();

    const onSubmit = data => {
        console.log(data.password)
        console.log(data.rePassword)
        if (data.password === data.rePassword) {
            const formData = new FormData();
            formData.append("email", data.email)
            formData.append("password", data.password)
            formData.append("username", data.username)

            axios.post(`http://localhost:9000/register`, formData, {withCredentials: true})
                .then(res => {

                    toast("Logged in <3")
                    setTimeout(() => navigate("/", {replace: true}), 2000)
                })
                .catch(e => {
                    toast.error(e.response.data)
                })
        }else {
            toast.error("Password not the same!")
        }


    }

    return (
        <>
            <ToastContainer/>
            <Header/>
            <form onSubmit={handleSubmit(onSubmit)} className="signup-container signup">
                <h2 className="signup-header">Log in</h2>
                <p><input type="email" placeholder="Email *" {...register("email", {required: true})} /></p>
                <p><input type="text" placeholder="Username *" {...register("username", {required: true})} /></p>
                <p><input type="password" placeholder="Password *" {...register("password", {required: true, min: 8})} /></p>
                <p><input type="password" placeholder="Confirm Password *" {...register("rePassword", {required: true, min: 8})} />
                </p>
                <p><input type="submit"/></p>
            </form>
        </>
    );
}