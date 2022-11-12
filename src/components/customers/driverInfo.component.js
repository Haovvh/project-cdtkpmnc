import React from "react";

export default function DriverInfo(props) {
    
    if (!(props.info.Phone  && props.info.controlNumber && props.info.type )) {
        return null;
    }   
    return (
        <React.Fragment>
            <div  className=" card-container">
                <div className=" col-md-12">
                    <div className="form-group">
                        <label htmlFor="Driver">Driver:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={props.info.Fullname}
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Phone">Phone:</label>
                        <input
                            type="phone"
                            className="form-control"
                            value={props.info.Phone}
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Control Number">Control Number:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={props.info.controlNumber}
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Car Type:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={props.info.type}
                            disabled
                        />
                    </div>         
                </div>
            </div>
        </React.Fragment>
    )
}
