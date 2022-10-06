import React from "react";
import Customer from "./customer.component";
import { WEBSOCKET_SERVICE } from "../utils/publicKey";
import { io } from "socket.io-client";

const socket = io(WEBSOCKET_SERVICE);

export default function BoardCustomer() {
  return (
    <React.Fragment>
      <Customer warn={true} />
    </React.Fragment>
  );
}
