export const Input = ({prob, setProb, name, type, maxLength}) => {

    const handleOnChange = (e) => {
        setProb(e.target.value);
    }
    return(
        <>
            <p><input style={{borderColor: prob.length ? "" :"red"}} onChangeCapture={handleOnChange} defaultValue={prob} type={type} placeholder={`${name} *`} maxLength={maxLength}/></p>
            {!prob && <p style={{color:"red"}}>{`${name} is required`}</p>}
        </>
    );
}