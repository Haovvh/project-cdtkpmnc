import React, {useState, useEffect} from "react";

import axios from "axios";
import { API_KEY } from "../Goong/GoongKEY";

function TotalMoney(prop){
    
    const [distance, setDistance] = useState({
        quangduong: "",
        thoigian: ""
    });
    useEffect(() => {
        const URLGoong = `https://rsapi.goong.io/DistanceMatrix?origins=${prop.origins}&destinations=${prop.destinations}&vehicle=car&api_key=${API_KEY}`;
        axios.get(URLGoong).then((res) => {
            console.log(res.data.rows[0].elements[0].distance.text);
            setDistance({
                quangduong: res.data.rows[0].elements[0].distance.text,
                thoigian: res.data.rows[0].elements[0].duration.text
            })
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    

    return(
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