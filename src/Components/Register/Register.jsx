import axios from "axios";
import joi from "joi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  // ----------------useState-----------------------------------------------------------
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    age: "",
    password: "",
  });

  // ---------ErorrMessage----------------------------------------------------------
  const [errorBackMassage, setErrorBackMassage] = useState([]);
  const [errorFrontMassage, setErrorFrontMassage] = useState([]);
  const [loading, setLoading] = useState(false);
  // ---------submitData----------------------------------------------------------
  let submitData = async (e) => {
    // frontErrMassage();
    e.preventDefault();
    setLoading(true);
    let validationResponse = validateFormData();
     try {
      if (validationResponse.error) { 
          setErrorFrontMassage(validationResponse.error.details)
        }
        else {
        setErrorFrontMassage([])
        let { data } = await axios.post(
          "https://movies-front-kappa.vercel.app/user/signUp",user);
      
        if (data.message === "success") {
          goToLogin();
        }
      }      
     } catch (error) {
      if (error.response) {
        setErrorBackMassage(error.response.data.message);
      }          
     }
    setLoading(false); 
  };
  // ------------------------useNavigate-----------------------
  let navigate = useNavigate();
  let goToLogin = () => {
    navigate("/login");
  };
  // -------------getInPutValue------------------------------------------------------------
  let getInPutValue = (e) => {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  };
  // ------------------Validation Form---------------------------------------------------------------
  let validateFormData = () => {
    const schema = joi.object({
      first_name: joi.string().alphanum().required().min(2).max(10),
      last_name: joi.string().alphanum().required().min(2).max(10),
      age: joi.number().required().min(20).max(80),
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

  let frontErrMassage = (proms) => {
    let setError = errorFrontMassage.filter((error) => error.message.includes(proms));
    if (setError[0] !== undefined) {
      return <div className="alert bg-danger p-1 text-white ">{setError[0].message}</div>;
    } else {
      return "";
    }
  };
  let backErrMassage = (props) => {
    let setError = errorBackMassage.includes(props);
    if (setError) {
      return <div className="alert bg-danger p-1 text-white ">{errorBackMassage}</div>;
    } else {
      return "";
    }
  };


  // -------------------------------------------------------------------------------------------------
  return (
    <>
      <div className=" containerRegister w-75 m-auto mt-5 p-5">
        <h2>Registration form</h2>
        <form onSubmit={submitData}>
          <div>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              className=" form-control mb-2 "
              name="first_name"
              onChange={getInPutValue}
            />
          </div>
          {(frontErrMassage("first_name"))} 
          <div>
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              className=" form-control mb-2 "
              name="last_name"
              onChange={getInPutValue}
            />
          </div>
        
          {(frontErrMassage("last_name"))} 
          <div>
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              className=" form-control mb-2 "
              name="age"
              onChange={getInPutValue}
            />
          </div>
          
          {  (frontErrMassage("age"))} 
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              className=" form-control mb-2"
              name="email"
              onChange={getInPutValue}
            />
          </div>
          
          {  (frontErrMassage("email"))} 
          {  (backErrMassage("email already exist"))} 
          <div>
          
            <label htmlFor="password">Password:</label>
            <input
              type="Password"
              className="mb-2 form-control rNput"
              name="password"
              onChange={getInPutValue}
            />
          </div>
          
          {  (frontErrMassage("password"))} 
          {loading?

(<button className=" btn btn-info mt-3 float-end">
<i className="fas fa-spinner fa-spin"></i> </button>)
:

(<button className=" btn btn-info mt-3 float-end">
Register</button>)

}
          <div className="clearfix"></div>
        </form>
      </div>
    </>
  );
}
