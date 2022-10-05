import React, { useState } from "react";
import GongMap from "../Goong/GoongMap";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import TotalMoney from "./totalMoney.component";



export default function BoardCustomer() {
  const [isCheck, setIsCheck] = useState(true);

  //https://rsapi.goong.io/Place/AutoComplete?api_key=Q8Ig6pAAaXN7omsq4aAGbjx9JS2FyOuCAylzUwcq&input=140%20lê%20trọng%20tấn%20tân%20phú
  //https://rsapi.goong.io/geocode?address=140%20lê%20trọng%20tấn%20tân%20phú&api_key=Q8Ig6pAAaXN7omsq4aAGbjx9JS2FyOuCAylzUwcq
  //{isCheck ? <TotalMoney origins="140 lê trọng tấn tân phú" destinations="66 nguyễn ngọc phương bình thạnh" /> : <h1></h1>}
  return (
    <React.Fragment>
      <div className="col-md-12">
        <div className="card card-container">
          <h1>
          </h1>
          <TotalMoney Origins="10.7979227,106.6750609" Destinations="10.7891245,106.6722005" />
          <Form >
            <div>
              <div className="form-group">
                <label htmlFor="username">Điểm đón:</label>
                <Input
                  placeholder="Điểm đón"
                  type="text"
                  className="form-control"
                  name="placeFrom"
                />
              </div>
              <div className="form-group">
                <label htmlFor="username">Điểm đến:</label>
                <Input
                  placeholder="Điểm đến"
                  type="text"
                  className="form-control"
                  name="placeTo"
                />
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-block" onClick={() => setIsCheck(!isCheck)}>Xác nhận</button>
              </div>
            </div>
          </Form>

        </div>
      </div>
      <div>
        <GongMap />
      </div>
    </React.Fragment>
  );
}
