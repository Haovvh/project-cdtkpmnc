import React from "react";
import "../../App.css"

export default function UserInfo(props) {
    
    
    return (
        <React.Fragment>
            {!props.show ? 
            null : 
            (<div>
                <div className="container">
                <div className="col-md-12">
                    <div className="form-group">
                        <label htmlFor="name">Fullname</label>   
                        <input
                            type="text"
                            value={props.Fullname}
                            className="form-control"
                            disabled
                        />
                    </div>                    
                </div>
            </div>
            <div>
                <h3>History</h3>
            </div>
            <div className="container totalTable">
                <div className="col-md-12">
                    <table>
                        <tbody>
                            <tr>
                                <th className="col">Origin</th>
                                <th className="col">Destination</th>
                            </tr>
                            {props.places.length >0 && props.places.map((val, key) => {
                                return (
                                    <tr key={key}>
                                        <td data-label="Origin">{val.origin.fullAddressInString}</td>
                                        <td data-label="Destination">{val.destination.fullAddressInString}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <h3>Place</h3>
            </div>
            <div className="container totalTable">
                <div className="col-md-12">
                    <table>
                        <tbody>
                            <tr>
                                <th className="col">Place</th>
                            </tr>
                            {props.countPlace.length > 0 && props.countPlace.map((val, key) => {
                                return (
                                    <tr key={key}>
                                        <td data-label="Place">{val.fullAddressInString}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            </div>)}
            
        </React.Fragment>
    );
}