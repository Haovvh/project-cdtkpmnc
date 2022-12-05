import React, { useState, useEffect } from "react";
import mapService from "../../apiService/map";
import GoongMap from "../../Goong/Map";
import DriverInfo from "./driverInfo";
import { MONEY_CAR4, MONEY_CAR7, WEB_SOCKET } from "../../public/const";
import callService from "../../apiService/call";
import journeyService from "../../apiService/journey";

import customersService from "../../apiService/customer";

import * as io from "socket.io-client";



const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

export default function BookDriver (props) {   
    const socket = io.connect(WEB_SOCKET); 
    const id = customersService.getCurrentUser().id;
    const [message, setMessage] = useState("");
    const [vehicleType, setvehicleType] = useState('CAR4');
    const [journey, setJourney] = useState({
        id: 0,
        origin: {
            placeId: "",
            lat: 0,
            lng: 0,
            fullAddressInString: ""
        },
        destination : {
            placeId: "",
            lat: 0,
            lng: 0,
            fullAddressInString: ""
        },
        price: 0,
        paymentMethod: "CASH",
        pointCode: ""
    })

    const [status, setStatus] = useState("showtripinfo")
    const [places, setPlaces] = useState([
    ])
    const [disabled, setDisabled] = useState(false);
    const [disabledbutton, setDisabledbutton] = useState(false);
    
    const [driverInfo, setDriverInfo] = useState({
        Fullname: "",
        phone: "",
        vehicleInfo: {
            controlNumber: "",
            type: "CAR4"
        }
    });

    //SOCKET
    socket.on("customers-noti", (...args) => {
        let listdriver = args[0].driver;
        if( args[0].customerId === id){
            
            setDriverInfo(prevState => ({
                ...prevState, 
                Fullname: listdriver.firstName + " " + listdriver.lastName,
                phone: listdriver.phone,
                vehicleInfo: {
                    controlNumber: listdriver.vehicleInfo.controlNumber,
                    type: listdriver.vehicleInfo.type
                }
            }))

            setStatus("completeTrip");
            setDisabledbutton(true);
        }
        // ...
        
      });

      socket.on("finish-journey", (...args) => {
        let listdriver = args[0];
        console.log(listdriver)
        if(listdriver.customerId === id){
            alert("Done Trip");
            window.location.reload();
        }
        
        // ...
        
      });

    useEffect( () => {     
        customersService.getUserbyId(id).then(
            response => {
                if(response.data.phone){
                    const _phone = response.data.phone;
                    customersService.getFiveMostPlaces(_phone).then(
                        response => {
                            
                            if(response.data.length > 0 ){
                                console.log(response.data)
                                setPlaces(response.data)
                                console.log(places)
                            }
                        }, error => {
                            console.log(error)
                        }
                    )
                    customersService.getFiveRecentCall(_phone).then(
                        
                        response => {
                            console.log(response.data)
                            if(response.data.length > 0) {
                                
                            }
                            
                        }, error => {
                            console.log(error)
                        }
                    )
                }
                console.log(response.data)
            }
        )

        
        
        //check xem có chuyến đi nào chưa hoàn thành không?
        

        journeyService.getJourneybyCustomer(id).then(
          response => {
            if(response.data) {
                if(response.data.driverId) {
                    customersService.getDriverbyId(response.data.driverId).then(
                        response => {
                            if(response.data) {
                                setDriverInfo({
                                    Fullname: response.data.firstName + " " + response.data.lastName,
                                    phone: response.data.phone,
                                    vehicleInfo: {
                                        controlNumber: response.data.vehicleInfo.controlNumber,
                                        type: response.data.vehicleInfo.type
                                    }
                                  })
                                  setDisabledbutton(true);
                            }
                            
                        }, error => {
                            console.log(error)
                        }
                    )
                }
              
              setJourney(prevState => ({
                ...prevState,
                origin: {
                    fullAddressInString: response.data.origin.fullAddressInString
                },
                destination: {
                    fullAddressInString: response.data.destination.fullAddressInString
                },
                pointCode: response.data.pointCode
              }))
              
              setStatus("completeTrip")
              setDisabled(true)
            } else {
                
            }
                   
          },
          error => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString(error.response.data.message);
            setMessage(resMessage)                 
            }
        )

    },[])

    //lấy giá trị trong textbox 
    const onChangeOrigin = (event) => {   
        setJourney(prevState => ({
            ...prevState,
            origin: {
                fullAddressInString: event.target.value
            }
        }))
    }
    const onChangeDestination = (event) => {

        setJourney(prevState => ({
            ...prevState,
            destination: {
                fullAddressInString: event.target.value
            } 
        }))
    }
    //event click
    const handleOnClick = async () => {
        if(status === "showtripinfo") {
            try {
                if (journey.origin.fullAddressInString  && journey.destination.fullAddressInString ) {

                    const origins = await mapService.getGeocode(journey.origin.fullAddressInString);

                    const ORIGIN_LAT_LNG = await origins.data.results[0].geometry.location.lat + ',' + origins.data.results[0].geometry.location.lng
    
                    const destinations = await mapService.getGeocode(journey.destination.fullAddressInString);

                    const DESTINATION_LAT_LNG = await destinations.data.results[0].geometry.location.lat + ',' + destinations.data.results[0].geometry.location.lng
                    setJourney(prevState => ({
                        ...prevState,
                        origin: {
                            placeId: origins.data.results[0].place_id,
                            fullAddressInString: origins.data.results[0].formatted_address,
                            lng: origins.data.results[0].geometry.location.lng,
                            lat: origins.data.results[0].geometry.location.lat
                        },
                        destination: {
                            placeId: destinations.data.results[0].place_id,
                            fullAddressInString: destinations.data.results[0].formatted_address,
                            lng: destinations.data.results[0].geometry.location.lng,
                            lat: destinations.data.results[0].geometry.location.lat
                        }
                    }))
                    if (ORIGIN_LAT_LNG && DESTINATION_LAT_LNG) {
                        const distance = await mapService.getDirection(ORIGIN_LAT_LNG,DESTINATION_LAT_LNG);                        
                        const json = await distance.data.routes[0]    
                        
                        setJourney(prevState => ({
                            ...prevState,
                            pointCode: json.overview_polyline.points
                        }))
                                                
                        setJourney(prevState => ({
                            ...prevState,price: Math.round((json.legs[0].distance.value)*MONEY_CAR4/1000)
                        }))

                        setStatus("bookdriver")
                        setDisabled(true)
                    }
                    else {
                        return;
                    }
                }
    
            } catch (error) {
                console.log(error)
            }
            
        } else if (status === "bookdriver") {
            //customerId, phone, callType, origin, destination
            
            callService.call(id, props.InfoCustomer.phone,'WEB_APP', vehicleType ,journey.origin,journey.destination).then(
                response => {
                    if(response.data.id) {
                        console.log("callId: " +  response.data.id)
                         journeyService.createjourney(response.data.id , id, vehicleType, props.InfoCustomer.phone, journey.origin,journey.destination,
                            journey.price,journey.paymentMethod,journey.pointCode).then(
                                responses => {

                                    if(responses.data.id){
                                        console.log("journeyId: " + responses.data.id)
                                        
                                        journeyService.postJourneybyId(responses.data.id).then(
                                            responsess=> {

                                                console.log(responsess.status)
                                                if(response.status === 200) {
                                                    console.log("success ");
                                                    setStatus("awaitdriver") 
                                                }
                                            }, error => {
                                                console.log(error)
                                            }
                                        ).catch(error => {
                                            console.log(error)
                                        })
                                    }
                                }, error => {
                                    console.log(error)
                                }
                            ).catch(error => {
                                console.log(error)
                            })
                    }
                    
                }, error => {
                    console.log(error)
                }
            ).catch(error => {
                console.log(error)
            })
            
        } 
        else if (status === "completeTrip") {
            window.location.reload();
        }        
    }

    const handleChange = (event) => {
        setvehicleType(event.target.value)
    }
    //onChangePaymethod
    const onChangePaymethod = (event) => {
        setJourney(prevState => ({
            ...prevState,
            paymentMethod: event.target.value })
        )
    }

    const  handleOnClickCancel = () => {
        if(status === 'awaitdriver') {
            journeyService.cancelJourney(id).then(
                response => {
                    console.log(response)
                }, error => {
                    console.log(error)
                }
            )
        } 
        window.location.reload();      
      }
      const handleOnClickOrigin = () =>{
        
      }
      const handleOnClickDestination = () => {

      }

    //
//
    return (
        <React.Fragment>
            <div className="container">
                
                <div className="card">
                    <div>
                        {journey.price >0 && <h4>Price {journey.price} VND</h4>}                        
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Origin</label>
                        <input
                            list="placeFrom" name="browser"
                            placeholder="Origin"
                            type="text"
                            className="form-control"
                            value={journey.origin.fullAddressInString}
                            onChange={(event) => { onChangeOrigin(event) }}
                            validations={[required]}
                            disabled={disabled}
                        />
                        <datalist id="placeFrom">
                            {places.length > 0 && places.map((item, key) => 
                            <option key = {key} value={item.fullAddressInString}/>)} 
                        </datalist>
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Destination</label>
                        <input
                            list="placeTo"
                            placeholder="Destination"
                            type="text"
                            className="form-control"
                            value={journey.destination.fullAddressInString}
                            onChange={(event) => { onChangeDestination(event) }}
                            disabled={disabled}
                            validations={[required]}
                        />
                        <datalist id="placeTo">
                            {places.length >0 && places.map((item, key) => 
                            <option key = {key} value={item.fullAddressInString}/>)} 
                        </datalist>
                    </div>
                    <div className="row">
                        <div className="col-sm-5 col-lg-6 col-sm-6">
                            <div className="form-group">
                                <label htmlFor="username">Car Type</label>
                                    <select value={vehicleType} onChange = {(event) =>{handleChange(event)}}>
                                        <option value="CAR4">Car 4 seat</option>
                                        <option value="CAR7">Car 7 seat</option>
                                        <option value="">Any</option>
                                    </select>
                            </div>
                        </div>
                        <div className="col-sm-5 col-lg-6 col-sm-6">
                            <div className="form-group">
                                <label htmlFor="Pay method">Pay Method</label>
                                    <select value={journey.paymentMethod} onChange = {(event) =>{onChangePaymethod(event)}}>
                                        <option value="CASH">CASH</option>
                                        <option value="CARD">CARD</option>
                                        <option value="EWALLET">EWALLET</option>
                                    </select>
                                </div>
                        </div>

                    </div>
                    
                    <div className="form-group ">
                        <div className="row">
                            <div className="col-5 container">
                                <button disabled={disabledbutton} className="btn btn-primary" onClick={() => {
                                handleOnClick()}}>
                                {(status === "showtripinfo") ? "Trip Info" : 
                                (status === "bookdriver") ? "Book Driver" : 
                                (status === "completeTrip") ? "Complete Trip" : 
                                "Trip Info"}
                                </button>
                            </div>
                            <div className="col-5 container">
                                <button className="btn btn-primary" disabled={disabledbutton} onClick={() => {
                                handleOnClickCancel()}}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
            <div>
                <DriverInfo info ={driverInfo}/>
            </div>
            <GoongMap coordinates={journey.pointCode} />
        </React.Fragment>
    );
}
