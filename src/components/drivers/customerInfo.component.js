import React from "react";

  
export default function CustomerInfo(props) {
    
    return (
        <React.Fragment>
            {props.info.Fullname && props.journey.origin.fullAddressInString && 
            <div className=" card-container">
            <div className=" col-md-12">
                <div className="form-group">
                    <label htmlFor="username">Customer:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={props.info.Fullname}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        value={props.info.phone}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Origin</label>
                    <input
                        type="text"
                        className="form-control"
                        value={props.journey.origin.fullAddressInString}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="">Destination</label>
                    <input
                        type="text"
                        className="form-control"
                        value={props.journey.destination.fullAddressInString}
                        disabled
                    />
                </div>    
                <div className="form-group">
                    <label htmlFor="">Total Money</label>
                    <input
                        type="text"
                        className="form-control"
                        value={props.journey.price + " VND"}
                        disabled
                    />
                </div>
                <div className="row">
                    <div className="col-5">
                        <div className="form-group">
                            <label htmlFor="username">Car Type</label>
                                <select value={props.journey.vehicleType} disabled>
                                    <option value="CAR4">Car 4 seat</option>
                                    <option value="CAR7">Car 7 seat</option>
                                    <option value="">Any</option>
                                </select>
                        </div>
                    </div>
                    <div className="col-5">
                        <div className="form-group">
                            <label htmlFor="Pay method">Pay method</label>
                                <select value={props.journey.paymentMethod} disabled>
                                    <option value="CASH">CASH</option>
                                    <option value="CARD">CARD</option>
                                    <option value="EWALLET">EWALLET</option>
                                </select>
                            </div>
                    </div>

                </div>                 
            </div>
        </div>
            }
            
        </React.Fragment>
    )
}
