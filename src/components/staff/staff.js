import React, { useState, useEffect } from "react";
import StaffJourney from "./staffJourney";
import UserInfo from "./userInfo";
import userService from "../../apiService/customer";
import { WEB_LOGIN } from "../../public/const";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default function SupportStaff () {  
  const id = userService.getCurrentUser().id;
  const [message, setMessage] = useState("");
  const [hidden, setHidden] = useState(false)
  const [show, setShow] = useState(false)
  const [Staff, setStaff] = useState({
    Fullname: "", 
    phone: "",
    role: ""
  })

  const [Info, setInfo] = useState({
    phone: "",
    User_ID: "",
    Fullname: ""
  });
  
  const [places, setPlaces] = useState([])
  const [countPlace, setCountPlace]= useState([]);

  useEffect( () =>{
    userService.getUserbyId(id).then(
      response => {
        console.log(response.data)
        if(response.data) {
          setStaff(prevState => ({
            ...prevState,
            Fullname: response.data.firstName + ' ' + response.data.lastName, 
            phone: response.data.phone, 
            role: response.data.userType
          }))
        } else {
          setMessage(response.data.message) 
        }
      }, error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();  
          setMessage(resMessage)
          userService.logoutUser();
          alert("Token is Expires. Please Login");
          window.location.assign(WEB_LOGIN)
      }
    )
    
  },[])

  const handleClick = () => {

    userService.getUserbyPhone(Info.phone).then(
      response => {
        console.log(response.data)
        if(response.data) {
          setHidden(true)
          setShow(true)
          setInfo(prevState => ({
            ...prevState,
            Fullname: response.data.firstName + " " + response.data.lastName
          }))
          
        }
      }, error => {
        console.log(error)
      }
    )
    userService.getFiveMostPlaces(Info.phone).then(
      response => {
          if(response.data.length > 0 ){
            
            setCountPlace(response.data)
              console.log(response.data)
              
              setHidden(true)
          }
      }, error => {
          console.log(error)
      }
  )
  userService.getFiveRecentCall(Info.phone).then(
      
      response => {
          
          if(response.data.length > 0) {
            setPlaces(response.data)
            console.log(response.data)
            setHidden(true)
          }
          
      }, error => {
          console.log(error)
      }
  )
    
   
  }  

  const handlePhone =  (event) => {
    setInfo(prevState => ({
      ...prevState,
      phone: event.target.value
    }))
  }
  
    if(!Staff.role.includes('STAFF')) {
      
      return null;
    }
 
    return (
      <React.Fragment>
        <div className="card container">
          <h3>Staff: {Staff.Fullname} </h3>            
        </div>
        {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}

        
        <InputGroup className="mb-3">
        <input
                value={Info.phone}
                placeholder="Phone Customer"
                type="phone"
                className="form-control"
                onChange={(event) => { handlePhone(event) }}
              />
        <div className="row">
              <div className="form-group col-5">
                <button className="btn btn-primary" onClick={() => {handleClick()}}>
                  Search</button>
              </div>
              {(show) ? (<div className="col-5" >
                <button className="btn btn-primary" onClick={() => setShow(!show)}>
                  {!show ? "Show" :"Hidden"}
                </button>
              </div>) : null}              
            </div> 
      </InputGroup>
        <div className="card-container">          
          <UserInfo show = {show}  places = {places} countPlace = {countPlace} Fullname={Info.Fullname}/>          
        </div>
        <StaffJourney place = {places} countPlace = {countPlace} Info= {Info} show = {hidden}/> 
      </React.Fragment>      
    );
}