import React from "react";
import Customer from "./customer.component";
import { WEBSOCKET_SERVICE } from "../utils/publicKey";
import GongMap from "../Goong/GoongMap";

//const socket = io(WEBSOCKET_SERVICE);

export default function BoardCustomer() {
  return (
    <React.Fragment>
      <h1>
        Customer
      </h1>
      <div className="card card-container">
        <div className=" col-md-12">
          <Customer warn={true} />
        </div>
        <div className=" col-md-12 col-sm-4">
          <GongMap />
        </div>
      </div>
    </React.Fragment>
  );
}
