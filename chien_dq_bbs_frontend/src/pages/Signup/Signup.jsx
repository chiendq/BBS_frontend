import './Signup.css'
import {useForm} from 'react-hook-form'
import {useNavigate} from "react-router-dom";
import {Auth} from "../../components/Auth";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Navbar} from "../../components/navbar/Navbar";

export const Signup = () => {

    const {register, handleSubmit, formState: {errors}} = useForm();

    let navigate = useNavigate();

    const onSubmit = data => {
        if (data.password === data.rePassword) {
            axios.post(`/register`, data, {withCredentials: true})
                .then(res => {
                    toast("Welcome <3")
                    setTimeout(() => navigate("/login", {replace: true}), 2000)
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
            <Navbar/>
            <form onSubmit={handleSubmit(onSubmit)} className="signup-container signup">
                <h2 className="signup-header">Sign up</h2>
                <p><input type="email" placeholder="Email *" {...register("email", {required: true, min:1})} /></p>
                <p><input type="text" maxLength={"50"} placeholder="Username *" {...register("username", {required: true, min:1})} /></p>
                <p><input type="password" maxLength={"20"} placeholder="Password *" {...register("password", {required: true, min: 8})} /></p>
                <p><input type="password" placeholder="Confirm Password *" {...register("rePassword", {required: true, min: 8})} />
                </p>
                <div className={"navigate"}>
                    <input style={{background:"red"}} onClick={()=>{navigate('/')}} type={"submit"} value={"Cancel"}/>
                    <input type="submit"/>
                </div>
            </form>
        </>
    );
}