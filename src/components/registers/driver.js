import React, { useState } from "react";
import driverService from "../../apiService/driver";
import userService from "../../apiService/customer";

export default function RegisterDriver () {
  
  const Id = userService.getCurrentUser().id;
  const [controlNumber, setcontrolNumber] = useState("")
  const [type, settype] = useState("CAR4")
  const [personalId, setpersonalId] = useState("");
    

  const onChangePersonalId = (event) => {
    setpersonalId(event.target.value)
  }
    
  const onChangeControlNumber = (event) => {
    setcontrolNumber( event.target.value)
  }

  const onChangeType = (event) => {
    settype( event.target.value 
    )
  }  

  const handleRegister = () => {
    driverService.registerDriver(Id,personalId,controlNumber, type).then(
      response => {
        if(response.status === 200) {
          console.log(response)
          alert("Register Driver Success")
          window.location.assign('/login')
        }          
      },
      //Xử lý trường hợp đăng ký không thành công?
      error => {
        console.log(error)
      }
    )  

    
    }
    return (
      <React.Fragment>      
      <div className="col-md-12">
        <div className="card card-container">
              <div>
                <div className="form-group">
                  <label htmlFor="Personal">Personal ID</label>
                  <input
                    placeholder="Personal ID"
                    type="text"
                    className="form-control"
                    name="Personal"
                    value={personalId}
                    onChange={(event) => {onChangePersonalId(event)}}
                  />
                  </div>
                            
                <div className="form-group">
                  <label htmlFor="Control">Control Number</label>
                  <input
                    placeholder="Control Number"
                    type="text"
                    className="form-control"
                    name="Control"
                    value={controlNumber}
                    onChange={(event) => {onChangeControlNumber(event)}}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="username">Car Type</label>
                  <select value={type} onChange={(event) => {onChangeType(event)}}>
                    <option value="CAR4">Car 4 seat</option>
                    <option value="CAR7">Car 7 seat</option>
                  </select>
                  
                </div>               

                <div className="form-group">
                  <button onClick={() => {handleRegister()}} className="btn btn-primary btn-block">Register</button>
                </div>
              </div>
        </div>
      </div>
      <div>
        
      </div>
      </React.Fragment>
    );
}
