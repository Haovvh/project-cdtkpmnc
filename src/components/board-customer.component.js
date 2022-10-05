import React, { useState} from "react";
import GongMap from "../Goong/GoongMap";
import Input from "react-validation/build/input";
import ShowMoney from "./showMoney.component";
import Form from "react-validation/build/form";
import { API_KEY } from "../Goong/GoongKEY";
import axios from "axios";
import { json } from "react-router-dom";


const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};


export default function BoardCustomer() {
  const [distance, setDistance] = useState("")
  const [duration, setDuration] = useState("")
  const [placeFrom, setPlaceFrom] = useState("");
  const [placeTo, setPlaceTo] = useState("");
  const [show, setShow] = useState(true) 
  const handlePlaceFrom = (event) => {
    setPlaceFrom(event.target.value)
  }
  const handlePlaceTo = (event) => {
    setPlaceTo(event.target.value)
  }
  const handleOnClick = async () => {
    try {
      const resOrigin = await axios.get(`https://rsapi.goong.io/geocode?address=${placeFrom}&api_key=${API_KEY}`)
      const jsonOrigin = await resOrigin.data.results[0].geometry.location.lat + ',' + resOrigin.data.results[0].geometry.location.lng
      
      
      const resdesti = await axios.get(`https://rsapi.goong.io/geocode?address=${placeTo}&api_key=${API_KEY}`)
      const jsondesti = await resdesti.data.results[0].geometry.location.lat + ',' + resdesti.data.results[0].geometry.location.lng
      
      
      const res = await axios.get(`https://rsapi.goong.io/DistanceMatrix?origins=${jsonOrigin}&destinations=${jsondesti}&vehicle=car&api_key=${API_KEY}`)
      const json = await res.data.rows[0].elements[0]
      setDistance("Quảng đường là: " + json.distance.text)
      setDuration("Thời gian là: " + json.duration.text)
      console.log(json.distance)
      console.log(json.duration)                  
      
  } catch (error) {
      console.log(error)
  }
  
  }
  
//          {isCheck ? <TotalMoney origins="140 lê trọng tấn tân phú" destinations="66 nguyễn ngọc phương bình thạnh" /> : <h1></h1>}  
  return (
    <React.Fragment>
      <div className="col-md-12">
        <div className="card card-container">     
            <div>
              <h1>
                {distance}
              </h1>
              <h1>
                {duration}
              </h1>
            </div>
            <div className="form-group">
                <label htmlFor="username">Điểm đón:</label>
                <input
                  placeholder="Điểm đón"
                  type="text"
                  className="form-control"
                  value={placeFrom}
                  onChange={(event) => {handlePlaceFrom(event)}}
                />
              </div>
              <div className="form-group">
                <label htmlFor="username">Điểm đến:</label>
                <input
                  placeholder="Điểm đến"
                  type="text"
                  className="form-control"
                  value={placeTo}
                  onChange={(event) => {handlePlaceTo(event)}}
                />
              </div>
              <div className="form-group">
              <button className="btn btn-primary btn-block" onClick={() => { handleOnClick()
                }}>
                    {show ? 'Hide' : 'Show'}</button>
              </div>
            
              
        </div>
      </div>
      <div>
        <GongMap />
      </div>
    </React.Fragment>
  );
}
