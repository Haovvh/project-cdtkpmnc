import React from "react";
import "../../App.css"

export default function UserInfo(props) {

    if ((props.Fullname === "")) {
        return null;
    }
    return (
        <React.Fragment>
            {!props.show ? 
            null : 
            (<div>
                <div className="container">
                <div className="col-md-12">
                    <div className="form-group">
                        <label htmlFor="name">FullName</label>   
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
                <h1>Call History</h1>
            </div>
            <div className="container totalTable">
                <div className="col-md-12">
                    <table>
                        <tbody>
                            <tr>
                                <th>Time</th>
                                <th>Origin</th>
                                <th>Destination</th>
                            </tr>
                            {props.places.length >0 && props.places.map((val, key) => {
                                return (
                                    <tr key={key}>
                                        <td className="col-3">{val.modified_date}</td>
                                        <td className="col-3">{val.origin.fullAddressInString}</td>
                                        <td className="col-3">{val.destination.fullAddressInString}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <h1>Place History</h1>
            </div>
            <div className="container totalTable">
                <div className="col-md-12">
                    <table>
                        <tbody>
                            <tr>
                                <th>Place</th>
                                <th>Count</th>
                            </tr>
                            {props.countPlace.length > 0 && props.countPlace.map((val, key) => {
                                return (
                                    <tr key={key}>
                                        <td className="col-3">{val.origin.fullAddressInString}</td>
                                        <td className="col-3">{val.Count}</td>
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