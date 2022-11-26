import React from "react";
import ProfileUser from "./profile.User";
import userService from "../../apiService/customer";



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
