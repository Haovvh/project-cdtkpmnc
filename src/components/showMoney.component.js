import React, {useState, useEffect} from "react";
import { API_KEY } from "../Goong/GoongKEY";
import axios from "axios";

export default function ShowMoney(props) {
    const [distance, setDistance] = useState({
        quangduong: "",
        thoigian: ""
      });
      const [origins, setorigins] = useState("")
      const [destinations, setdestinations] = useState("")
      console.log(props)
      useEffect(() => {
          async function fetchAPI() {       
              try {
                  const resOrigin = await axios.get(`https://rsapi.goong.io/geocode?address=${props.origins}&api_key=${API_KEY}`)
                  const jsonOrigin = await resOrigin.data.results[0].geometry.location.lat + ',' + resOrigin.data.results[0].geometry.location.lng
                  
                  if(jsonOrigin) {
                      setorigins(jsonOrigin)
                  }
                  else {
                      setorigins("")
                  }
                  const resdesti = await axios.get(`https://rsapi.goong.io/geocode?address=${props.destinations}&api_key=${API_KEY}`)
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
      },[])
    
    if (!props.warn) {
      return null;
    }
  
    return (
      <div className="warning">
        <h1>
            Quảng đường là: {distance.quangduong}
        </h1>
        <h1>
            Thời gian là: {distance.thoigian}
        </h1>
      </div>
    );
  }