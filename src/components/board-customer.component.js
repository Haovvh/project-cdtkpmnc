import React from "react";
import GongMap from "../Goong/GoongMap";
import useState from "react"
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import TotalMoney from "./totalMoney.component";


export default function BoardCustomer() {
  //const [isCheck, setisCheck] = useState(true);
  const check = false;

  return (
    <React.Fragment>
      <div className="col-md-12">
        <div className="card card-container">
          {check ? <TotalMoney origins="20.981971,105.864323" destinations="21.031011,105.783206" /> : <h1></h1>}

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
                <button className="btn btn-primary btn-block" >Xác nhận</button>
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
