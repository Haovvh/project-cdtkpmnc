import React, { useState } from "react";
import GoongMap from "../Goong/GoongMap"


export default function BoardDriver() {
  const [isOnline, setIsOnline] = useState("Online")
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
        <div >
          <GoongMap isOnline={isOnline} />
        </div>
      </div>
    </React.Fragment>

  );
}
