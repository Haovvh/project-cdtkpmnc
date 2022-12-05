import React from "react";

export default function DriverInfo(props) {
    return (
        <React.Fragment>
            {props.info.vehicleInfo.controlNumber &&  
            
            (<div  className=" card-container">
                <div className=" col-md-12">
                    <div className="form-group">
                        <label htmlFor="Driver">Driver</label>
                        <input
                            type="text"
                            className="form-control"
                            value={props.info.Fullname}
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Phone">Phone</label>
                        <input
                            type="phone"
                            className="form-control"
                            value={props.info.phone}
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Control Number">Control Number</label>
                        <input
                            type="text"
                            className="form-control"
                            value={props.info.vehicleInfo.controlNumber}
                            disabled
                        />
                    </div>
                            
                </div>
            </div>
            )}
            
        </React.Fragment>
    )
}
