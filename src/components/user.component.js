import React, { useState } from "react";

export default function User() {
    const [show, setShow] = useState(true)
    if (!show) {
        return null;
    }
    return (
        <React.Fragment>
            <div className="card card-container">
                <div className="col-md-12">
                    <div className="form-group">
                        <label htmlFor="phonecustomer">Phone Customer: </label>
                        <input
                            placeholder="Phone Customer"
                            type="phone"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary btn-block" onClick={() => { setShow(!show) }}>
                            {show ? 'Hide' : 'Show'}</button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}