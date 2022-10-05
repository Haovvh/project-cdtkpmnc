import React, { useState, useEffect } from "react";
import check from "./check";
import axios from "axios";
import { API_KEY } from "../Goong/GoongKEY";



function TotalMoney(prop) {

    const [distance, setDistance] = useState({
        quangduong: "",
        thoigian: ""
    });
    const [origins, setorigins] = useState("")
    const [destinations, setdestinations] = useState("")
    //https://rsapi.goong.io/geocode?address=${}&api_key=Q8Ig6pAAaXN7omsq4aAGbjx9JS2FyOuCAylzUwcq
    useEffect(() => {





        const URLGoong = `https://rsapi.goong.io/DistanceMatrix?origins=${prop.Origins}&destinations=${prop.Destinations}&vehicle=car&api_key=${API_KEY}`;
        axios.get(URLGoong).then((res) => {
            setDistance({
                quangduong: res.data.rows[0].elements[0].distance.text,
                thoigian: res.data.rows[0].elements[0].duration.text
            })
        }).catch((err) => {
            console.log(err)
        })
        //<TotalMoney Origins="10.7979227,106.6750609" Destinations="10.7891245,106.6722005" />



    }, [])


    return (
        <div>
            <h1>
                Số Km: {distance.quangduong}
            </h1>
            <h2>
                Thời Gian: {distance.thoigian}
            </h2>


        </div>
    )
}

export default TotalMoney;