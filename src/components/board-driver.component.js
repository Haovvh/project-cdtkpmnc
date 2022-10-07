import React, { useState } from "react";
import GoongMap from "../Goong/GoongMap"
import DriverAcceptCustomer from "./driver-accept-customer.component";

export default function BoardDriver() {
  const [isTrips, setIsTrips] = useState(true);
  const [isOnline, setIsOnline] = useState("Online")
  const [customerInfo, setCustomerInfo] = useState({

    name: "Trần Văn A",
    sdt: "090123456789",
    placeFrom: "181 Cao thắng Q.10",
    placeTo: "285 Phạm văn chiêu gò vấp"
  })
  const handleOnline = () => {
    if (isOnline === "Online") {
      setIsOnline("Offline");
    } else {
      setIsOnline("Online");
    }


  }
  return (
    <React.Fragment>
      <div className="card card-container">
        <div>
          <h1>Driver</h1>
        </div>
        <div>
          <button className="btn btn-primary btn-block" onClick={() => {
            handleOnline()
          }}>{(isOnline === "Online") ? 'Offline' : 'Online'}</button>
        </div>
        <div>
          <DriverAcceptCustomer info={customerInfo} isTrips={true} />
        </div>
        <div >
          <GoongMap isOnline={isOnline} />
        </div>
      </div>
    </React.Fragment>

  );
}
