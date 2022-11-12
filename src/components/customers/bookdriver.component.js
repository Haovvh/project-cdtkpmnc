import React, { useState, useEffect } from "react";
import GoongAPI from "../../Goong/GoongAPI";
import GoongMap from "../../Goong/GoongMap";
import socketIOClient from "socket.io-client";
import authHeader from "../../services/auth-header";
import journeyService from "../../services/journey.service";
import DriverInfo from "./driverInfo.component";
import { MONEY_1KM_DISTANCE } from "../../public/const";


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

    // const param = { query: 'token=' }
    // const socket = socketIOClient(process.env.REACT_APP_WEBSOCKETHOST, param )

    const [message, setMessage] = useState("");
    const [type, settype] = useState('CAR4');
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

    const [status, setStatus] = useState("showtripinfo")
    const [places, setPlaces] = useState([])
    const [distance_km, setDistance_km] = useState();
    const [distance, setDistance] = useState("")
    const [disabled, setDisabled] = useState(false);
    const [disabledbutton, setDisabledbutton] = useState(false);
    
    const [driverInfo, setDriverInfo] = useState({
        Fullname: "",
        Phone: "",
        vehicleInfo: {
            controlNumber: "",
            type: "CAR4"
        }
    });

    //socket

    // socket.on("driverinfo", (data) => {
    //     console.log(data)
    //     setDriverInfo({
    //         Fullname: data.Fullname,
    //         Phone: data.Phone,
    //         vehicleInfo: {
    //             controlNumber: data.controlNumber,
    //             type: data.type
    //         }
    //     })
    //     setDisabledbutton(true)
    // })
    
    // socket.on("successpassenger",  (data) => {
        
    //     setStatus("showtripinfo")
    //     setJourney({
    //         origin: {
    //             placeId: "",
    //             lat: 0,
    //             lng: 0,
    //             fullAddressInString: ""
    //         },
    //         destination : {
    //             placeId: "",
    //             lat: 0,
    //             lng: 0,
    //             fullAddressInString: ""
    //         },
    //         price: 0,
    //         paymentMethod: "CASH",
    //         pointCode: ""
    //     })  
    //     setDisabledbutton(false)
    //     setDistance_km();
    //     setDistance("")
    //     setDisabled(false);
    //     setDriverInfo({
    //         Fullname: data.Fullname,
    //         Phone: data.Phone,
    //         vehicleInfo: {
    //             controlNumber: data.controlNumber,
    //             type: data.type
    //         }
    //     });    
    //   })

    useEffect( () => {
        
        //Lấy địa điểm đi thường xuyên
        console.log("check api get all Journey")
        journeyService.getAllJourneybyPassenger().then(
            response => {
                console.log(response.data)
                if(response.data) {
                    //setPlaces(response.data)
                    
                } else {

                }
            }, error => {
                const resMessage =
                  (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString();
                  setMessage(resMessage)            
                }
        )
        
        //check xem có chuyến đi nào chưa hoàn thành không?

        journeyService.getJourneybyPassenger().then(
          response => {
            console.log(response.data)
            if(response.data) {
                setMessage(response.data.message)
              console.log("Có Data")
              const user = response.data.data;
              console.log(user)
              setDriverInfo({
                Fullname: user.Fullname,
                Phone: user.Phone,
                vehicleInfo: {
                    controlNumber: user.controlNumber,
                    type: user.type
                }
              })
              setJourney(prevState => ({
                ...prevState,
                origin: {
                    fullAddressInString: user.fullAddressInString
                },
                destination: {
                    fullAddressInString: user.fullAddressInString
                },
                pointCode: user.pointCode
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

                    console.log("Khong duoc null");
                    const origins = await GoongAPI.getGeocode(journey.origin.fullAddressInString);

                    const jsonorigins = await origins.data.results[0].geometry.location.lat + ',' + origins.data.results[0].geometry.location.lng
    
                    const destinations = await GoongAPI.getGeocode(journey.destination.fullAddressInString);
                    console.log(destinations.data.results[0].formatted_address)

                    const jsondestinations = await destinations.data.results[0].geometry.location.lat + ',' + destinations.data.results[0].geometry.location.lng
                    setJourney(prevState => ({
                        ...prevState,
                        origin: {
                            placeId: origins.data.results[0].place_id,
                            fullAddressInString: origins.data.results[0].formatted_address,
                            lng: origins.data.results[0].geometry.location.lat,
                            lat: origins.data.results[0].geometry.location.lng
                        },
                        destination: {
                            placeId: destinations.data.results[0].place_id,
                            fullAddressInString: destinations.data.results[0].formatted_address,
                            lng: destinations.data.results[0].geometry.location.lng,
                            lat: destinations.data.results[0].geometry.location.lat
                        }
                    }))
                    if (jsonorigins && jsondestinations) {
                        console.log(" jsonorigins && jsondestinations ")
                        const distance = await GoongAPI.getDirection(jsonorigins,jsondestinations);                        
                        const json = await distance.data.routes[0]                        
                        console.log(json.legs[0].distance.text)
                        console.log(json.legs[0].duration.text)
                        console.log(json.overview_polyline.points);
                        
                        setJourney(prevState => ({
                            ...prevState,
                            pointCode: json.overview_polyline.points
                        }))
                                                
                        setJourney(prevState => ({
                            ...prevState,price: Math.round((json.legs[0].distance.value)*MONEY_1KM_DISTANCE/1000)
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
            console.log("Book driver")
            //check connect xem được không? 

            //socket gọi đến server tìm tài xế
            // socket.emit("calldriver", {               
                
            //     socket_ID: socket.id,
            //     //data gửi kèm đến server
            //     CustomerId: authHeader().id,
            //     origin: journey.origin,
            //     destination: journey.destination,
            //     pointCode: journey.pointCode,
            //     price: journey.price,
            //     Fullname: props.InfoCustomer.firstName + ' ' + props.InfoCustomer.lastName,
            //     Phone: props.InfoCustomer.Phone,
            //     type: type

            // });
            
            setStatus("completeTrip") 
                   
        
        }
        else if (status === "completeTrip") {
            console.log("completeTrip");
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
            setDisabledbutton(false)
        }        
    }

    const handleChange = (event) => {
        settype( event.target.value)
    }
    //onChangePaymethod
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
            <div className="container">
                <div className="card">
                    <div>
                        {journey.price >0 && <h4>Price: {journey.price} VND</h4>}                        
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Origin:</label>
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
                            {places.map((item, key) => 
                            <option key = {key} value={item.origin_Fulladdress}/>)} 
                        </datalist>
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Destination:</label>
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
                            {places.map((item, key) => 
                            <option key = {key} value={item.origin_Fulladdress}/>)} 
                        </datalist>
                    </div>
                    <div className="row">
                        <div className="col-5">
                            <div className="form-group">
                                <label htmlFor="username">Car Type:</label>
                                    <select value={type} onChange = {(event) =>{handleChange(event)}}>
                                        <option value="CAR4">Car 4 seat</option>
                                        <option value="CAR7">Car 7 seat</option>
                                        <option value="">Any</option>
                                    </select>
                            </div>
                        </div>
                        <div className="col-5">
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
                                <button disabled={disabledbutton} className="btn btn-primary" onClick={() => {
                                handleOnClick()}}>
                                {(status === "showtripinfo") ? "Show Trip Info" : 
                                (status === "bookdriver") ? "Book Driver" : 
                                (status === "completeTrip") ? "Complete Trip" : 
                                "Show Trip Info"}
                                </button>
                            </div>
                            <div className="col-5 container">
                                <button className="btn btn-primary" disabled={disabledbutton} onClick={() => {
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
                <DriverInfo info ={driverInfo}/>
            </div>
            <GoongMap coordinates={journey.pointCode} />
        </React.Fragment>
    );
}
