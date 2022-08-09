export const PasswordInput = ({password, setPassword, placeHolder}) => {


    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const validatePassword = (password) => {
        return /.*\W.*/.test(password) && /.*[a-zA-Z].*/.test(password) && /.*[0-9].*/.test(password);
    }

  return (
      <div>
          <p><input autoComplete="new-password" maxLength="20" style={{borderColor: password.length ? "" : "red"}} type="password" placeholder={placeHolder} onChangeCapture={handlePassword}/></p>
          {password.length === 0 && <p style={{color: "red"}}>Password is required</p>}
          {!validatePassword(password) && <p style={{color: "red"}}>Password must have at least 8 characters including letters, numbers and special characters</p>}
      </div>
  )
}