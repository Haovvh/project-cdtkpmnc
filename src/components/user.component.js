import React, { useState } from "react";

export default function User(props) {
    const [show, setShow] = useState("showTotal")
    if (!show) {
        return null;
    }
    const handleClick = () => {
        if (show === "showTotal") {
            setShow("Hide");
        } else if (show === "Hide") {
            setShow("showTotal")
        } else if (show === "showTotal") {
            setShow("bookTrip")
        }
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
                        <button className="btn btn-primary btn-block" onClick={() => { handleClick() }}>
                            {(show === "Hide") ? 'Hide' : ((show === "showTotal") ? "ShowTotal" : "Book")}</button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}