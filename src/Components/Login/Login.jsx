import axios from "axios";
import joi from "joi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Login({saveUserData}) {
  // ----------------useState-----------------------------------------------------------
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  // -------------getInPutValue------------------------------------------------------------
  let getInPutValue = (e) => {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  };
  // ---------ErrorMessage----------------------------------------------------------
  const [errorBackMassage, setErrorBackMassage] = useState("");
  const [errorList, setErrorList] = useState([]);
  // ---------submitData----------------------------------------------------------
  let submitData = async (e) => {
    e.preventDefault();
    setLoading(true)
    let validationResponse = validateFormData();
    try {
      if (validationResponse.error) {
        setErrorList(validationResponse.error.details);
        
      } else {
        setErrorList([]);
  
        let { data } = await axios.post("https://movies-front-kappa.vercel.app/user/login",
        user
        );
       
        
        if (data.message === "success") {
          localStorage.setItem('token',data.token)
          saveUserData()
          goToHome();
        }  
      }
      
    } catch (error) {
  
      setErrorBackMassage(error.response.data.message);  
    }
   
    setLoading(false) 
  };


  // ------------------------useNavigate-----------------------
  let navigate = useNavigate();
  let goToHome = () => {
    navigate("/");
  };
  // ------------------Validation Form---------------------------------------------------------------
  let validateFormData = () => {
    const schema = joi.object({
      email: joi
        .string()
        .email({ tlds: { allow: ["com", "net"] } })
        .required(),
      password: joi
        .string().min(4)
        .required()
    });
    return schema.validate(user, { abortEarly: false });

  };
 
//  =======================================================================================
  let frontAlert=(props)=>{
    let x =errorList?.filter((error)=> error.message.includes(props))
    if(x[0] !== undefined){
    return <div  className="alert bg-danger p-1 text-white"> {x[0].message} </div> 
  }
  else{
    return '';
  }
  }

  let backError=(props)=>{
    let massage =errorBackMassage.includes(props)
    if(massage){
    return <div  className="alert bg-danger p-1 text-white">{errorBackMassage} </div> 
  }
  else{
    return '';
  }
  }

  return (
    <>
      <div className="containerLogin w-75 m-auto mt-5 p-5">
        <h2>Login form</h2>        
        <form onSubmit={submitData}>
          <div> <label htmlFor="email">Email:</label>
      
            <input  type="email"className=" form-control mb-2"name="email"  onChange={getInPutValue}/>
      
       
          </div>
          {frontAlert('email')}
          {backError("invalid email information")}

                    
         
          <div><label htmlFor="password">Password:</label>
            <input  type="Password" className=" form-control mb-2 rNput"  name="password" onChange={getInPutValue} />
       
          </div>
          {frontAlert('password')}
          {backError("invalid password information")}
           {loading?

           (<button className=" btn btn-info mt-3 float-end">
          <i className="fas fa-spinner fa-spin"></i> </button>)
          :

          (<button className=" btn btn-info mt-3 float-end">
          Login</button>)
          
           }
          
          <div className="clearfix"></div>
        </form>
      </div>
    </>
  );
}
