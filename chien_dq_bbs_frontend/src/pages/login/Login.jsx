import './Login.css'
import {useForm} from 'react-hook-form'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Navbar} from "../../components/navbar/Navbar";
import {Auth} from "../../components/Auth";

export const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    let navigate = useNavigate();

    const onSubmit = data => {
        axios.post(`/login`, data, {withCredentials: true})
            .then(res => {
                let data = res.data
                localStorage.setItem("username",data.username)
                localStorage.setItem("accountId",data.accountId)
                toast("Logged in <3")
                setTimeout(() => navigate("/", { replace: true }), 2000)
                })
            .catch(e =>{
                toast.error(e.response.data)
            })
    }

    return (
        <>
            <Auth/>
            <ToastContainer />
            <Navbar/>
            <form onSubmit={handleSubmit(onSubmit)} className="login-container login">
                <h2 className="login-header">Log in</h2>
                <p><input type="email" placeholder="Email" {...register("email", {required: true})} /></p>
                <p><input type="password" placeholder="Password" {...register("password", {required: true, min: 8})} /></p>
                <div className={"navigate"}>
                    <input style={{background:"red"}} onClick={()=>{navigate('/')}} type={"submit"} value={"Cancel"}/>
                    <input type="submit"/>
                </div>
            </form>
        </>
    );
}