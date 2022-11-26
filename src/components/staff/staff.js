import React, { useState, useEffect } from "react";
import StaffJourney from "./staffJourney";
import UserInfo from "./userInfo";
import userService from "../../apiService/customer";
import { URL_WEB } from "../../public/const";
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
  const [show, setShow] = useState(true)
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
          window.location.assign(URL_WEB)
      }
    )
    
  },[])

  const handleClick = () => {
    userService.getFiveMostPlaces(Info.phone).then(
      response => {
          
          if(response.data.length > 0 ){
              console.log(response.data)
              setHidden(true)
          }
      }, error => {
          console.log(error)
      }
  )
  userService.getFiveRecentCall(Info.phone).then(
      
      response => {
          console.log(response.data)
          if(response.data.length > 0) {
            setHidden(true)
          }
          
      }, error => {
          console.log(error)
      }
  )
    /*
    userByPhoneService.getUserbyPhone(Info.Phone).then(
      response => {
        if(response.data.resp) {
          console.log("Response True")
          console.log(response.data.data)
          setInfo(prevState => ({
            ...prevState,
            Fullname: response.data.data.Fullname,
            User_ID: response.data.data.User_ID
          }))
          
          setPlaces(response.data.address)
          setCountPlace(response.data.count)
        }
        else {
          console.log("Response False")
          setMessage(response.data.message)          
        }                 
      },
      error => {
        
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();  
          setMessage(resMessage)               
        })
        */
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
        <div className="container">
        <header className="jumbotron">
          <h3>Staff: {Staff.Fullname} </h3>       
          <h3>Phone: {Staff.phone} </h3>     
          
        </header>
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
              {(hidden) ? (<div className="col-5" >
                <button className="btn btn-primary" onClick={() => setShow(!show)}>
                  {!show ? "Show" :"Hidden"}
                </button>
              </div>) : null}              
            </div> 
      </InputGroup>
        <div className="card-container">          
          <UserInfo show = {show}  places = {places} countPlace = {countPlace} Fullname={Info.Fullname}/>          
        </div>
        <StaffJourney place = {places} Info= {Info} show = {hidden}/> 
      </React.Fragment>      
    );
}