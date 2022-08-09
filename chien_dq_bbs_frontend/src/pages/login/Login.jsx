import './Login.css'
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Navbar} from "../../components/navbar/Navbar";
import {Auth} from "../../components/Auth";
import {useState} from "react";

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

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const validateEmail = (email) => {
        return /\w+@\w+\.\w{2,}/.test(email);
    }

    const validatePassword = (password) => {
        return /.*\W.*/.test(password) && /.*[a-zA-Z].*/.test(password) && /.*[0-9].*/.test(password);
    }

    return (
        <>
            <Auth/>
            <ToastContainer/>
            <Navbar/>
            <form onSubmit={onSubmit} className="login-container login">
                <h2 className="login-header">Log in</h2>
                <p><input style={{borderColor: email.length ? "" : "red"}} type="email" placeholder="Email"
                          onChangeCapture={handleEmail}/></p>
                {email.length === 0 && <p style={{color: "red"}}>Email is required</p>}
                {!validateEmail(email) && <p style={{color: "red"}}>Email must has format xxx@yy.zz</p>}
                <p><input style={{borderColor: password.length ? "" : "red"}} type="password" placeholder="Password"
                          onChangeCapture={handlePassword}/></p>
                {password.length === 0 && <p style={{color: "red"}}>Password is required</p>}
                {!validatePassword(password) &&
                    <p style={{color: "red"}}>Password must have at least 8 characters including letters, numbers and
                        special characters</p>}
                <div className={"navigate"}>
                    <input style={{background: "red"}} onClick={() => {
                        navigate('/')
                    }} type={"submit"} value={"Cancel"}/>
                    <input type="submit"/>
                </div>
            </form>
        </>
    );
}