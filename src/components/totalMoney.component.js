import React, { useState, useEffect } from "react";

import axios from "axios";
import { API_KEY } from "../Goong/GoongKEY";



function TotalMoney(prop) {
    
    const [distance, setDistance] = useState({
        quangduong: "",
        thoigian: ""
    });
    const [origins, setorigins] = useState("")
    const [destinations, setdestinations] = useState("")
    
    useEffect(() => {
        async function fetchAPI() {       
            try {
                const resOrigin = await axios.get(`https://rsapi.goong.io/geocode?address=${prop.origins}&api_key=${API_KEY}`)
                const jsonOrigin = await resOrigin.data.results[0].geometry.location.lat + ',' + resOrigin.data.results[0].geometry.location.lng
                
                if(jsonOrigin) {
                    setorigins(jsonOrigin)
                }
                else {
                    setorigins("")
                }
                const resdesti = await axios.get(`https://rsapi.goong.io/geocode?address=${prop.destinations}&api_key=${API_KEY}`)
                const jsondesti = await resdesti.data.results[0].geometry.location.lat + ',' + resdesti.data.results[0].geometry.location.lng
                
                if (jsondesti) {
                    setdestinations(jsondesti)
                } else {
                    setdestinations("")
                }
                console.log("123")
                console.log(origins)
                console.log(destinations)
                console.log(321)
                const res = await axios.get(`https://rsapi.goong.io/DistanceMatrix?origins=${origins}&destinations=${destinations}&vehicle=car&api_key=${API_KEY}`)
                const json = await res.data.rows[0].elements[0]
                console.log(json)
                if (json) {
                    setDistance({
                        quangduong: json.distance.text,
                        thoigian: json.duration.text
                    })
                }
                else {
                    setDistance({quangduong: "", thoigian: ""})
                }
                
                
            } catch (error) {
                console.log(error)
            }           
        }
        fetchAPI();
    },[distance.quangduong])
    
    
    if(prop.origins != "" || prop.destinations != "") {
        return (<h1></h1>);
    }
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