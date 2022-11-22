import React, { useState, useEffect} from "react";
import GongMapDriver from "../../Goong/GoongMap.Driver";
import userService from "../../apiService/user.service";
import driverService from "../../apiService/driver.service";
import journeyService from "../../apiService/journey.service";
import CustomerInfo from "./customerInfo.component";
import * as io from "socket.io-client";
import { WEB_SOCKET, URL_WEB } from "../../public/const";


export default function Driver (){  
  const socket = io.connect(WEB_SOCKET);
  const driverId = userService.getCurrentUser().id;

  const [message, setMessage] = useState("");
  const [driverInfo, setDriverInfo] = useState({
    id: "",
    Fullname: "",
    Phone: "",
    vehicleInfo: {
      controlNumber: "",
      type: ""
    }
    
  });

  const [Online, setOnline] = useState(false);
  const [status, setStatus] = useState("Offline")
  const [InfoCustomer, setInfoCustomer] = useState({
    Fullname: "",
    phone: ""
  })
  const [journey, setJourney] = useState({
    origin: {
      lat: 0 ,
      lng: 0,
      fullAddressInString: "",
      placeId: ""
    },
    destination: {
      lat: 0 ,
      lng: 0,
      fullAddressInString: "",
      placeId: ""
    }, 
    callId: 0,
    vehicleType: "CAR4",
    paymentMethod: "CASH",
    price: 0,
    pointCode: ""

  })
  const [journeyId, setJourneyId] = useState(0);
  const [show, setShow] = useState(false);

  socket.on("drivers", (...args) => {
    let listdriver = args[0];
    console.log(args[0])
    setJourneyId(listdriver.journey.id);
    console.log(listdriver.journey)
    console.log(listdriver.drivers)
    for(let i=0; i<listdriver.drivers.length;i++) {
      if(driverId === listdriver.drivers[i]) {
        setStatus("isBookDriver")
      }
    }
    // ...
    
  });

  useEffect(  () => {     
    userService.getDriverbyId(driverId).then(
      response => {
        if(response.data) {
          console.log(response.data)
          setOnline(response.data.isOnline);
          if(response.data.isOnline) {
            setStatus('Online');

          } else {
            setStatus('Offline')
          }
          setDriverInfo(prevState => ({ ...prevState,
            id: response.data.id,
            Fullname: response.data.firstName + " " + response.data.lastName,
            Phone: response.data.phone,
            vehicleInfo: {
              controlNumber: response.data.vehicleInfo.controlNumber,
              type: response.data.vehicleInfo.type
            }
            
          }))
        } else {
        }
      }, error => {
        console.log(error)

        const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
        setMessage(resMessage)
        userService.logoutUser();
        alert("Token is Exprise. Please Login");
        window.location.assign(URL_WEB)
      }
    )

    journeyService.getJourneybyDriver(driverId).then(
      response => {
        console.log(response.data)
        if(response.data) {
          let temp = response.data;
          userService.getUserbyId(temp.customerId).then(
            response => {
              console.log(response.data)
              if(response.data){
                setInfoCustomer(prevState => ({
                  ...prevState,
                  Fullname: response.data.firstName + " " + response.data.lastName,
                  phone: response.data.phone
                }))
              }
            }, error => {
              console.log(error)
            }
          )          
          setStatus("Donetrip")         
          
          setJourneyId(temp.id);
          setJourney(prevState => ({
            ...prevState,
            origin: {
              placeId: temp.origin.placeId,
              fullAddressInString: temp.origin.fullAddressInString,
              lat: temp.origin.lat,
              lng: temp.origin.lng
            },
            destination: {
              placeId: temp.destination.placeId,
              fullAddressInString: temp.destination.fullAddressInString,
              lat: temp.destination.lat,
              lng: temp.destination.lng
            },
            paymentMethod: temp.paymentMethod,
            price: temp.price,
            pointCode: temp.pointCode,
            vehicleType: temp.vehicleType
          }))
        }
      }, error => {
        console.log(error)
      }
    )    
    
  }, []);

  
  
  const handleOnline = () => {   
    
    if (status === "Online") {

      driverService.driverOffline(driverId).then(
        response => {
          console.log(response.status)
        }, error => {
          console.log(error)
        }
      )
      setOnline(false)
      setStatus("Offline");   
      

    } else if (status === "Offline") {
      driverService.driverOnline(driverId).then(
        response => {
          console.log(response.status)
        }, error => {
          console.log(error)
        }
      )
      
      setOnline(true)
      setStatus("Online");

    } else if(status === "isBookDriver") {
      
      journeyService.putJourneybyDriver(journeyId, driverId).then(
        response => {
          console.log(response.status);
          if(response.status) {
            setShow(true);
            setStatus("Donetrip")
          }
        }, error => {
          window.location.reload();
          console.log(error)
        }
      )
            

    } else if(status === "Donetrip") {

      journeyService.finishJourney(journeyId).then(
        response => {
          if(response.status === 200){
            window.location.reload();
          }
        }, error => {
          console.log(error)
        }
      )
            
    }    
  }

  const handleOnClickCancel = () => {
    window.location.reload();
  }
  
    return (
      <React.Fragment>
        <div className="card container">
          <header className="jumbotron">
            {driverInfo.id && (
              <div>
                <h3>FullName: {driverInfo.Fullname}</h3>
                <h4>Phone: {driverInfo.Phone}</h4>
                <h4>Car Info: {driverInfo.vehicleInfo.controlNumber}  </h4>
                
              </div>
            )}
          </header> 
          {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
          <div className="form-group ">
          <div className="row">
            <div className="col-5 container">
            <button  className="btn btn-primary" onClick={() => {
            handleOnline()
          }}>
            {(status === "Offline") ? 'Online' : 
          ((status === "Online") ? 'Offline' : 
          ((status === "isBookDriver") ? 'Accept' : 
          "Done Trip"))}</button>
            </div>
            <div className="col-6">
            {(status === "isBookDriver") && (
            <button   className="btn btn-primary"
            onClick={() => {handleOnClickCancel()}}>
            Cancel
          </button>)}
            </div>
          </div>
        </div>        
        <div>
          <CustomerInfo info={InfoCustomer} journey = {journey}/>
        </div >
        <div className="">
          {!Online ? <h1>Offline</h1> : 
          <GongMapDriver Online={Online}/>  
            }
        </div>              
          
        </div>
      </React.Fragment>
      
    );
  }

