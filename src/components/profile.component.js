import React from "react";
import ProfileUser from "./profile.User.component";
import userService from "../apiService/user.service";



export default function Profile (props) { 
  const user = userService.getCurrentUser();
    if (!user) {
      return null;
    }
  return (
    <React.Fragment>
      <ProfileUser/>      
    </React.Fragment>
  );
}
