import React, { useState } from "react";
import { API_KEY } from "../Goong/GoongKEY";
import axios from "axios";


const required = value => {
    if (!value || value == null) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

export default function Customer(props = true) {

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
            const origins = await axios.get(`https://rsapi.goong.io/geocode?address=${placeFrom}&api_key=${API_KEY}`)

            const jsonorigins = await origins.data.results[0].geometry.location.lat + ',' + origins.data.results[0].geometry.location.lng

            const destinations = await axios.get(`https://rsapi.goong.io/geocode?address=${placeTo}&api_key=${API_KEY}`)
            const jsondestinations = await destinations.data.results[0].geometry.location.lat + ',' + destinations.data.results[0].geometry.location.lng

            if (jsonorigins && jsondestinations) {
                const distance = await axios.get(`https://rsapi.goong.io/DistanceMatrix?origins=${jsonorigins}&destinations=${jsondestinations}&vehicle=car&api_key=${API_KEY}`)
                const json = await distance.data.rows[0].elements[0]
                setDistance("Quảng đường là: " + json.distance.text)
                setDuration("Thời gian là: " + json.duration.text)
                setShow(!show)
            }
            else {
                return;
            }
        } catch (error) {
            console.log(error)
        }
    }
    if (!props.warn) {
        return null;
    }
    return (
        <React.Fragment>
            <div className="col-md-12 container">
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
                            onChange={(event) => { handlePlaceFrom(event) }}
                            validations={[required]}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Điểm đến:</label>
                        <input
                            placeholder="Điểm đến"
                            type="text"
                            className="form-control"
                            value={placeTo}
                            onChange={(event) => { handlePlaceTo(event) }}
                            validations={[required]}
                        />
                    </div>
                    <div className="form-group">
                        <select id="cars" name="cars">
                            <option value="car4">Car 4 Chỗ</option>
                            <option value="car7">Car 7 Chỗ</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary btn-block" onClick={() => {
                            handleOnClick()
                        }}>
                            Show info</button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
