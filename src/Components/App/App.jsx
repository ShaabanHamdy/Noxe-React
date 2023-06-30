import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import {
  createHashRouter,
  Navigate,
  RouterProvider
} from "react-router-dom";
import Details from "../Details/Details";
import Home from "../Home/Home";
import Login from "../Login/Login";
import Logout from "../Logout/Logout";
import MasterLayout from "../MasterLayout/MasterLayout";
import Movies from "../Movies/Movies";
import Notfound from "../Notfound/Notfound";
import People from "../People/People";
import ProtectPage from "../ProtectPage/ProtectPage";
import Register from "../Register/Register";
import Tvshows from "../Tvshows/Tvshows";


export default function App() {
  const [userdata, setUserdata] = useState(null);
  let saveUserData = () => {
    let encoded = localStorage.getItem("token");
    let decodedToken = jwtDecode(encoded);
    setUserdata(decodedToken);
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveUserData();
    }
  }, []);
  let logout = () => {
    localStorage.removeItem("token");
    setUserdata(null);

    return <Navigate to="Login" />;
  };

  let routes = createHashRouter([{path: "/", element: <MasterLayout logout={logout} userdata={userdata} />, errorElement: <Notfound />,
    children: [ {  index: true,  element: (    <ProtectPage saveUserData={saveUserData}>      {" "}      <Home />{" "}    </ProtectPage>  ),},

        { path: "Details", element: (   <ProtectPage saveUserData={saveUserData}>     {" "}     <Details />{" "}   </ProtectPage> ),},
        { path: "Login", element: <Login saveUserData={saveUserData} /> },
        {
          path: "Movies",
          element: (
            <ProtectPage saveUserData={saveUserData}>
              {" "}
              <Movies />{" "}
            </ProtectPage>
          ),
        },

        {
          path: "People",
          element: (
            <ProtectPage saveUserData={saveUserData}>
              {" "}
              <People />{" "}
            </ProtectPage>
          ),
        },
        { path: "Register", element: <Register /> },
        {
          path: "Tvshows",
          element: (
            <ProtectPage saveUserData={saveUserData}>
              {" "}
              <Tvshows />{" "}
            </ProtectPage>
          ),
        },
        {
          path: "Logout",
          element: (
            <ProtectPage saveUserData={saveUserData}>
              {" "}
              <Logout />{" "}
            </ProtectPage>
          ),
        },
        {
          path: "Details/:id/:mediaType",
          element: (
            <ProtectPage saveUserData={saveUserData}>
              {" "}
              <Details />{" "}
            </ProtectPage>
          ),
        },
      ],
    },
  ]);

  return (
    <>
   <RouterProvider router={routes} /> 
    </>
  );
}
