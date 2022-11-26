import React, {useEffect, useState} from "react";
import "../App.css"
import journey from "../apiService/journey";
import customer from "../apiService/customer";

export default function History () {
    const id = customer.getCurrentUser().id;
    const [Info, setInfo] = useState([])
    
    useEffect ( () => {
        journey.getHistoryJourney(id).then(
            response => {
                console.log(response.data)
                if(response.data) {
                  setInfo(response.data)
                  
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
                        
                }
        )

    }, [])

    return (
        <React.Fragment>
        <div className="card container">
          <header className="jumbotron">
            <h3>
                History 
            </h3>            
          </header>
          <div className="container totalTable">
                <div className="col-md-12">
                <table>
                      <thead>
                      <tr>
                                <th className="col">Orgin</th>
                                <th className="col">Destination</th>
                                <th className="col">Price</th>
                                <th className="col">StartTime</th>
                            </tr>
                      </thead>
                        <tbody>
                            
                            {Info.length > 0 && Info.map((val, key) => {
                                return (
                                    <tr key={key}>
                                        <td data-label="Orgin">{val.origin.fullAddressInString}</td>
                                        <td data-label="Destination">{val.destination.fullAddressInString}</td>
                                        <td data-label="Price">{val.price}</td>
                                        <td data-label="StartTime">{val.startDateTime}</td>
                                    </tr>
                                )
                            })}
                            
                        </tbody>
                    </table>                    
                </div>
            </div>
          </div>
          </React.Fragment>
    )
}