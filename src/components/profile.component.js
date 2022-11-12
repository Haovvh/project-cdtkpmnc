import React from "react";
import AuthService from "../services/auth.service";
import ProfileUser from "./profile.User.component";


const user = AuthService.getCurrentUser();
export default function Profile (props) { 
   
    if (!user) {
      return null;
    }
  return (
    <React.Fragment>
      <ProfileUser/>      
    </React.Fragment>
  );
}
