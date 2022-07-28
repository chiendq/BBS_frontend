import './Header.css'
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
                <a href="/" className={"header-home "}>Home</a>
                <a href="/login/Login" className={"header-login"}>Login</a>
            </div>
        </>
    )
}