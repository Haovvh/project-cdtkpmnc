import React, { Component } from "react";
import GoongMap from "../Goong/GoongMap"


export default function BoardDriver() {
  return (
    <React.Fragment className="container">
      <div>
        <h1>Driver</h1>
      </div>
      <div >
        <GoongMap />
      </div>
    </React.Fragment>

  );
}
