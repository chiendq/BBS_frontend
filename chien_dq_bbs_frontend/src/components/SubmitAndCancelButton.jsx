import {useNavigate} from "react-router-dom";

export const SubmitAndCancelButton = () => {

    let navigate = useNavigate();

    return (
      <>
          <div className={"submit-and-cancel"}>
              <input style={{background:"red"}} onClick={()=>{navigate('/')}} type={"submit"} value={"Cancel"}/>
              <input type="submit"/>
          </div>
      </>
  )
}