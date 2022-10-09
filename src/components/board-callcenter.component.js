import React, { useState } from "react";
import Customer from "./customer.component";
import CustomerInfo from "./customer-info.component";


export default function BoardCallcenter() {
  const [show, setShow] = useState(true)
  const [status, setStatus] = useState("getCustomer")

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
              {status === "getCustomer" ? 'Show Customer' : ((status === "bookdriver") ? "Book Driver" : "Complete")}</button>
          </div>
        </div>
      </div>
      <CustomerInfo warn={show} />
      <Customer warn={show} />
    </React.Fragment>

  );
}
