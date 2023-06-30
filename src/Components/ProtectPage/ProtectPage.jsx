import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectPage({ userdata, children }) {
  if ((userdata == null) & localStorage.getItem("token")==null) {
    return <Navigate to="/Login" />;
  } else {
    return children;
  }
}
