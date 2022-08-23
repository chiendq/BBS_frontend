import './Login.css'
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Navbar} from "../../components/navbar/Navbar";
import {Auth} from "../../components/Auth";
import {useState} from "react";
import {EmailInput} from "../../components/inputs/EmailInput";
import {PasswordInput} from "../../components/inputs/PasswordInput";
import {SubmitAndCancelButton} from "../../components/SubmitAndCancelButton";

export const Login = () => {

    const [email, setEmail] = useState("demo@demo.demo")
    const [password, setPassword] = useState("Password123@")

    let navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(
                `/login`,
                {email, password},
                {withCredentials: true}
            )
            let data = res.data;
            localStorage.setItem("username", data.username);
            localStorage.setItem("accountId", data.accountId);
            toast("Login successfully!");
            setTimeout(() => navigate("/", {replace: true}), 2000);
        } catch (e) {
            toast.error("Invalid username or password")
        }
    }

    return (
        <>
            <Auth/>
            <ToastContainer/>
            <Navbar/>
            <form onSubmit={onSubmit} className="login-container login">
                <h2 className="login-header">Log in</h2>
                <EmailInput email={email} setEmail={setEmail}/>
                <PasswordInput password={password} setPassword={setPassword} placeHolder={"Password *"}/>
                <SubmitAndCancelButton/>
            </form>
        </>
    );
}