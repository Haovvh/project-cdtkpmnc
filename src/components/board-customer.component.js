import React, { useState, useEffect} from "react";
import GongMap from "../Goong/GoongMap";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import TotalMoney from "./totalMoney.component";



export default function BoardCustomer() {
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

  return (
    <React.Fragment>
      <div className="col-md-12">
        <div className="card card-container">
          {isCheck ? <TotalMoney origins="140 lê trọng tấn tân phú" destinations="66 nguyễn ngọc phương bình thạnh" /> : <h1></h1>}         
          
          <Form >
            <div>
              <div className="form-group">
                <label htmlFor="username">Điểm đón:</label>
                <Input
                  placeholder="Điểm đón"
                  type="text"
                  className="form-control"
                  name="placeFrom"
                />
              </div>
              <div className="form-group">
                <label htmlFor="username">Điểm đến:</label>
                <Input
                  placeholder="Điểm đến"
                  type="text"
                  className="form-control"
                  name="placeTo"
                />
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-block" onClick={() => setIsCheck(!isCheck)}>Xác nhận</button>
              </div>
            </div>
          </Form>

        </div>
      </div>
      <div>
        <GongMap />
      </div>
    </React.Fragment>
  );
}
