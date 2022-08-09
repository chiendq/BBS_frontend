export const EmailInput = ({email, setEmail}) => {

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const validateEmail = (email) => {
        return /\w+@\w+\.\w{2,}/.test(email);
    }

  return (
      <div>
          <p><input style={{borderColor: email.length ? "" : "red"}} type="email" placeholder="Email *" onChangeCapture={handleEmail}/></p>
          {email.length === 0 && <p style={{color: "red"}}>Email is required</p>}
          {!validateEmail(email) && <p style={{color: "red"}}>Email must has format xxx@yy.zz</p>}
      </div>
  )
}