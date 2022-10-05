import React from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

export default function BoardCallcenter() {
  return (
    <React.Fragment className="container col-md-12">
      <div className="card card-container">
        <h1>
          BoardCallcenter
        </h1>
        <Form >
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="phonecustomer">Phone Customer: </label>
              <Input
                placeholder="Phone Customer"
                type="phone"
                className="form-control"
                name="phonecustomer"
              />
            </div>

          </div>

        </Form>
      </div>

    </React.Fragment>

  );
}
