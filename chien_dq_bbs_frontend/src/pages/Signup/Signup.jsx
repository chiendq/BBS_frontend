import './Signup.css'
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Navbar} from "../../components/navbar/Navbar";
import {useState} from "react";
import {EmailInput} from "../../components/inputs/EmailInput";
import {PasswordInput} from "../../components/inputs/PasswordInput";
import {UsernameInput} from "../../components/inputs/UsernameInput";
import {SubmitAndCancelButton} from "../../components/SubmitAndCancelButton";

export const Signup = () => {

    let navigate = useNavigate();

    const [email, setEmail]                     = useState("aa@aa.aa")
    const [username, setUsername]               = useState("a")
    const [password, setPassword]               = useState("a1@")
    const [confirmPassword, setConfirmPassword] = useState("a1@")

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

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }

    return (
        <>
            <ToastContainer/>
            <Navbar/>
            <form onSubmit={onSubmit} className="signup-container signup" >
                <h2 className="signup-header">Sign up</h2>
                <EmailInput email={email} setEmail={setEmail}/>
                <UsernameInput username={username} setUsername={setUsername}/>
                <PasswordInput password={password} setPassword={setPassword} placeHolder={"Password *"}/>
                <PasswordInput password={confirmPassword} setPassword={setConfirmPassword} placeHolder={"Confirm password *"}/>
                <SubmitAndCancelButton />
            </form>
        </>
    );
}