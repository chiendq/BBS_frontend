export const UsernameInput = ({username, setUsername}) => {

    const handleUsername = (e) => {
        setUsername(e.target.value);
    }

  return (
      <>
          <p><input type="text" maxLength={"50"} placeholder="Username *" onChangeCapture={handleUsername} /></p>
          {username.length === 0 && <p style={{color: "red"}}>Name is required</p>}
      </>
  )
}