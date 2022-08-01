import './Header.css'
import {Link} from "react-router-dom";
export const Header = () => {
    // const style = {
    //     color: "white",
    //     backgroundColor: "blue",
    //     display: "block",
    //     height: "50px",
    //     lineHeight: "50px",
    //     textDecoration: "none",
    //     paddingLeft: "30px",
    //     fontSize: "30px"
    // }

    return (
        <>
            <div className={"header"}>
                <Link to="/" className={"header-home "}>Home</Link>
                <Link to="/newPost" className={"header-newPost"}>New Post</Link>
                <Link to="/login" className={"header-login"}>Login</Link>
            </div>
        </>
    )
}