import React, { useState, useEffect } from "react";
import mapService from "../../apiService/map.service";
import DriverJourney from "../customers/driverInfo.component";
import { MONEY_CAR4,MONEY_CAR7 } from "../../public/const";
import userService from "../../apiService/user.service";
import { WEB_SOCKET } from "../../public/const";
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


export default function StaffJourney (props) {
    const id = userService.getCurrentUser().id;
    const socket = io.connect(WEB_SOCKET);
    const [type, setType] = useState();
    const [message, setMessage] = useState("");
    const [journey, setJourney] = useState({
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
    const [Info, setInfo] = useState({
        SupportStaff_ID: "",
        Phone: "",
        Fullname: ""
    });

    const [status, setStatus] = useState("showtripinfo")
    const [distance_km, setDistance_km] = useState();
    const [distance, setDistance] = useState("")
    const [disabled, setDisabled] = useState(false);

    const [driverInfo, setDriverInfo] = useState({
        Fullname: "",
        Phone: "",
        vehicleInfo: {
            controlNumber: "",
            type: "CAR4"
        }
    });
    useEffect( ()=> {
        // socket.emit("join_room", {
        //     room: room
        // });

        userService.getUserbyId(id).then(
            response => {
                if(response.data.resp) {
                    setInfo(prevState => ({
                        ...prevState,
                        SupportStaff_ID: response.data.data.customerId,
                        Fullname: response.data.data.Fullname,
                        Phone: response.data.data.Phone
                    }))
                }
                else {
                    setMessage(response.data.message)
                }
            }, error => {
                console.log(error)
            }
        )

    },[])

    const handlePlaceFrom = (event) => {   

        setJourney(prevState => ({
            ...prevState,origin: {
                fullAddressInString: event.target.value
            } 
        }))
    }
    const handlePlaceTo = (event) => {

        setJourney(prevState => ({
            ...prevState,
            destination: {
                fullAddressInString: event.target.value
            }
        }))
    }

    const handleOnClick = async () => {
        if(status === "showtripinfo") {
            try {
                if (journey.origin.fullAddressInString && journey.destination.fullAddressInString ) {


                    const origins = await mapService.getGeocode(journey.origin.fullAddressInString);

                    const jsonorigins = await origins.data.results[0].geometry.location.lat + ',' + origins.data.results[0].geometry.location.lng
    
                    const destinations = await mapService.getGeocode(journey.destination.fullAddressInString);

                    const jsondestinations = await destinations.data.results[0].geometry.location.lat + ',' + destinations.data.results[0].geometry.location.lng
                    setJourney(prevState => ({
                        ...prevState,
                        origin: {
                            placeId: origins.data.results[0].place_id,
                            fullAddressInString: origins.data.results[0].formatted_address,
                            lat: origins.data.results[0].geometry.location.lat,
                            lng: origins.data.results[0].geometry.location.lng
                        }, destination: {
                            placeId: destinations.data.results[0].place_id,
                            fullAddressInString: destinations.data.results[0].formatted_address,
                            lat: destinations.data.results[0].geometry.location.lat,
                            lng: destinations.data.results[0].geometry.location.lng
                        }
                    }))
                    if (jsonorigins && jsondestinations) {
                        const distance = await mapService.getDirection(jsonorigins,jsondestinations);                        
                        const json = await distance.data.routes[0]   
                        setJourney(prevState => ({
                            ...prevState,
                            pointCode: json.overview_polyline.points,
                            price: Math.round((json.legs[0].distance.value)*MONEY_CAR4/1000)
                        }))
                        
                        setDistance_km(parseInt(json.legs[0].distance.value)/1000)
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
            
            setStatus("completeTrip")           
        
        }
        else if (status === "completeTrip") {

            setJourney({
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
            setDistance_km();
            setDistance("");
            setStatus("showtripinfo");
            setDisabled(false)
        }        
    }

    const onChangePaymethod = (event) => {
        setJourney(prevState => ({
            ...prevState,
            paymentMethod: event.target.value })
        )
    }
    //
//
    return (
        <React.Fragment>
            { !props.show ? null : (
                <div>
                <div className="container">
                    <div className="card">
                    <div>
                        {journey.price >0 && <h4>Price: {journey.price} VND</h4>}                        
                    </div>
                        <div className="form-group">
                            <label htmlFor="username">Origin</label>
                            <input
                                list="placeFrom" name="browser"
                                placeholder="Origin"
                                type="text"
                                className="form-control"
                                value={journey.origin.fullAddressInString}
                                onChange={(event) => { handlePlaceFrom(event) }}
                                disabled={disabled}
                            />
                            <datalist id="placeFrom">
                                {props.place.map((item, key) => 
                                <option key = {key} value={item.origin_Fulladdress}/>)} 
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
                                onChange={(event) => { handlePlaceTo(event) }}
                                disabled={disabled}
                            />
                            <datalist id="placeTo">
                                {props.place.map((item, key) => 
                                <option key = {key} value={item.origin_Fulladdress}/>)} 
                            </datalist>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="username">Car Seat</label>
                                    <select className="form-control" value={type} onChange={(event) => {       
                                        setType(event.target.value)
                                        }}>
                                        <option value="4">Car 4 Seat</option>
                                        <option value="7">Car 7 Seat</option>
                                        <option value="">Any</option>
                                    </select> 
                        </div>
                            </div>
                            <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="Pay method">Pay method:</label>
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
                                    <button className="btn btn-primary" 
                                    onClick={() => {
                                    handleOnClick()}}>
                                    {(status === "showtripinfo") ? "Show Trip Info" : 
                                    (status === "bookdriver") ? "Book Driver" : 
                                    (status === "completeTrip") ? "Complete Trip" : 
                                    "Show Trip Info"}
                                    </button>
                                </div>
                                <div className="col-5 container">
                                    <button  className="btn btn-primary" onClick={() => {
                                    window.location.reload();}}>Cancel</button>
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
                    <DriverJourney info ={driverInfo}/>
                </div>
                </div>
            )}          
            
        </React.Fragment>
    );
}
