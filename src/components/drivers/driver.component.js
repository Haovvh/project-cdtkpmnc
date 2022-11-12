import React, { useState, useEffect} from "react";
import GongMapDriver from "../../Goong/GoongMap.Driver";
import authService from "../../services/auth.service";
import userService from "../../services/user.service";
import driverService from "../../services/driver.service";
import journeyService from "../../services/journey.service";
import onlinedriverService from "../../services/onlinedriver.service";
import CustomerInfo from "./customerInfo.component";

import io from "socket.io-client";

const socket = io.connect(process.env.REACT_APP_WEBSOCKETHOST)

export default function Driver (){  
  const driverId = authService.getCurrentUser().id;

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

  const [Online, setOnline] = useState("");
  const [status, setStatus] = useState("Offline")
  const [InfoCustomer, setInfoCustomer] = useState({})
  const [room, setRoom] = useState("");

  useEffect(  () => {  
    
    userService.getUser(driverId).then(
      response => {
        if(response.data) {
          console.log(response.data)

          setDriverInfo(prevState => ({ ...prevState,
            id: response.data.id,
            Fullname: response.data.firstName + " " + response.data.lastName,
            Phone: response.data.phone,
            vehicleInfo: {
              controlNumber: response.data.vehicleInfo.controlNumber,
              type: response.data.vehicleInfo.type
            }
            
          }))
          //setOnline(response.data.data.Status)
          //setStatus(response.data.data.Status)
        } else {
          //setMessage(response.data.message)
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
        localStorage.removeItem("user");
        alert("Token is Exprise. Please Login");
        window.location.assign("http://localhost:8082/login")
      }
    )
    //check xem có journey nào chưa hoàn thành không? gọi API journey
    console.log("check api get Journey")
    journeyService.getJourneybyDriver(driverId).then(
      response => {
        console.log(response.data) 
        if(response.data) {
                 
          // setPassengerInfo( prevState => ({
          //       ...prevState,
          //       Passenger_ID: user.Passenger_ID,
          //       Fullname: user.Fullname,
          //       Phone: user.Phone,
          //       origin_Fulladdress: user.origin_Fulladdress,
          //       destination_Fulladdress: user.destination_Fulladdress, 
          //       distance_km: user.distance_km,
          //       Price: user.Price,
          //       pointCode: user.pointCode 
          // }))
          setStatus("Donetrip")
          //setOnline("Online");
          
        } else {

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
        }
    )
  }, []);

  //Socket
  socket.on("broadcat",  (data) => {
    console.log("driver");
    console.log(data.drivers)
    let driver = data.drivers;

    for(let i =0 ; i< driver.length; i++) {
      console.log(driverInfo.Driver_ID)

      if(driverId === driver[i].Driver_ID){
        setRoom(data.room)
        setStatus("isPassenger");
        setPassengerInfo(prevState =>  ({
          ...prevState,
          Passenger_ID: data.user.Passenger_ID,
          User_ID: data.user.User_ID,
          SupportStaff_ID: data.user.SupportStaff_ID,
          Fullname: data.user.Fullname,
          Phone: data.user.Phone,
          origin_Id: data.user.origin.placeId,
          origin_Fulladdress: data.user.origin.fulladdress,
          destination_Id: data.user.destination.placeId,
          destination_Fulladdress: data.user.destination.fulladdress, 
          distance_km: data.user.distance_km,
          Price: data.user.Price,
          pointCode: data.user.pointCode
        }))
      }
    }
  }) 

  
  const handleOnline = () => {   
    
    if (status === "Online") {
      //gọi API đến server
      setOnline("Offline")
      setStatus("Offline");
      onlinedriverService.putOnlineDriver("Offline").then(
        response => {
          if (response.data.resp) {
            console.log("Success")
          }
        }, error => {
          console.log(error)
        }
      )
      

    } else if (status === "Offline") {
      onlinedriverService.putOnlineDriver("Online").then(
        response => {
          if (response.data.resp) {
            console.log("Success")
          }
        }, error => {
          console.log(error)
        }
      )
      setOnline("Online")
      setStatus("Online");

    } else if(status === "isPassenger") {
      //goi api tạo journey
      console.log(" vao status co khach")
      journeyService.createjourney(InfoCustomer.id, 
        driverId, InfoCustomer.price,
         InfoCustomer.origin.placeId,
        InfoCustomer.origin.fullAddressInString, 
        InfoCustomer.origin.placeId,
        InfoCustomer.destination.fullAddressInString, 
        InfoCustomer.price,
        InfoCustomer.pointCode).then(
          response => {
            if(response.data) {
              //setMessage(response.data.message)
              console.log(response.data)
              console.log(response.data)
              onlinedriverService.putOnlineDriver("isTrip").then(
                response => {
                  console.log(response.data);
                }, error => {
                  console.log(error)
                }
              )
              socket.emit("driveracceptjourney", {
                room: room,
                Driver_ID: driverInfo.id,
                Phone: driverInfo.Phone,
                Fullname: driverInfo.Fullname,

                Car_type: driverInfo.Car_type,
                Car_code: driverInfo.Car_code,
                Car_seat: driverInfo.Car_seat,
                Car_color: driverInfo.Car_color
              })                  
              setStatus("Donetrip")
            } else {
              setMessage(response.data.message)
              setStatus("Online")
              setInfoCustomer({})
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
            } 
         )      

    } else if(status === "Donetrip") {
      //gọi api update journey thành công
      journeyService.updatejourney(driverId).then(
        response => {
          if(response.data.resp) {
            setMessage(response.data.message)
            socket.emit("successjourney", {
              room: room,
              Status: "success"
            })
            onlinedriverService.putOnlineDriver("Online").then(
              response => {
                console.log(response.data);
              }, error => {
                console.log(error)
              }
            )
            setStatus("Online")
            setInfoCustomer({});
          } else {
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
          } 
      )      
    }    
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
          ((status === "Online") ? 'Offline' : ((status === "isPassenger") ? 'Accept' : "Done Trip"))}</button>
            </div>
            <div className="col-6">
            {(status === "isPassenger") && (
            <button   className="btn btn-primary"
            onClick={() => window.location.reload()}>
            Cancel
          </button>)}
            </div>
          </div>
        </div>        
        <div>
          <CustomerInfo info={InfoCustomer} />
        </div >
        <div className="">
          {(Online === "Offline") ? <h1>Offline</h1> : 
          <GongMapDriver Online={Online}/>  
            }
        </div>              
          
        </div>
      </React.Fragment>
      
    );
  }

