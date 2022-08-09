import './Signup.css'
import {useForm} from 'react-hook-form'
import {useNavigate} from "react-router-dom";
import {Auth} from "../../components/Auth";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Navbar} from "../../components/navbar/Navbar";
import {useState} from "react";

export const Signup = () => {

    const [email, setEmail]                     = useState("a")
    const [username, setUsername]               = useState("a")
    const [password, setPassword]               = useState("a")
    const [confirmPassword, setConfirmPassword] = useState("a")
    let navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault()
        if (password === confirmPassword) {
            try {
                await axios.post(`/register`, {"email":email, "username" : username, "password" : password}, {withCredentials: true})
                toast("Welcome <3")
                setTimeout(() => navigate("/login", {replace: true}), 2000)
            } catch (e) {
                toast.error(e.response.data)
            }
        } else {
            toast.error("Password not the same!")
        }
    }


    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleUsername = (e) => {
        setUsername(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }

    const validateEmail = (email) => {
        return /\w+@\w+\.\w{2,}/.test(email);
    }

    const validatePassword = (password) => {
        return /.*\W.*/.test(password) && /.*[a-zA-Z].*/.test(password) && /.*[0-9].*/.test(password);
    }

    return (
        <>
            <ToastContainer/>
            <Navbar/>
            <form onSubmit={onSubmit} className="signup-container signup">
                <h2 className="signup-header">Sign up</h2>

                <p><input style={{borderColor: email.length ? "" : "red"}} type="email" placeholder="Email" onChangeCapture={handleEmail}/></p>
                {email.length === 0 && <p style={{color: "red"}}>Email is required</p>}
                {!validateEmail(email) && <p style={{color: "red"}}>Email must has format xxx@yy.zz</p>}
                <p><input type="text" maxLength={"50"} placeholder="Username *" onChangeCapture={handleUsername} /></p>
                {username.length === 0 && <p style={{color: "red"}}>Name is required</p>}
                <p><input maxLength={"20"} style={{borderColor: password.length ? "" : "red"}} type="password" placeholder="Password" onChangeCapture={handlePassword}/></p>
                {password.length === 0 && <p style={{color: "red"}}>Password is required</p>}
                {!validatePassword(password) && <p style={{color: "red"}}>Password must have at least 8 characters including letters, numbers and special characters</p>}
                <p><input maxLength={"20"} onChangeCapture={handleConfirmPassword} type="password" placeholder="Confirm Password *"/></p>
                <div className={"navigate"}>
                    <input style={{background:"red"}} onClick={()=>{navigate('/')}} type={"submit"} value={"Cancel"}/>
                    <input type="submit"/>
                </div>
            </form>
        </>
    );
}