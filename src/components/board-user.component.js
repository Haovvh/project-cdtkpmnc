import React, { Component } from "react";



export default function BoardUser() {

  return (
    <React.Fragment className="container">
      <div>
        <h1>
          User
        </h1>
      </div>
      <div >
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>
      </div>
    </React.Fragment>

  );
}
