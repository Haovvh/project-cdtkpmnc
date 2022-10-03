import React, {useState} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import TotalMoney from "../utils/TotalMoney";
import GoongAPI from "../Goong/GoongAPI";

function Customer() {
    
    const totalMoney = (origins, destinations) => {
        GoongAPI.DISTANCEMATRIS_API(origins, destinations)
    }
    return(
        <React.Fragment>
            <div className="col-md-12">
                <div className="card card-container">

                <Form onSubmit={() => TotalMoney}>
                    <div>
                        <div className="form-group">
                        <label htmlFor="username">Điểm đón</label>
                        <Input
                            placeholder="Điểm đón"
                            type="text"
                            className="form-control"
                            name="placeFrom"                            
                        />
                        </div>  
                        <div className="form-group">
                        <label htmlFor="username">Điểm đến</label>
                        <Input
                            placeholder="Điểm đến"
                            type="text"
                            className="form-control"
                            name="placeTo"                            
                        />
                        </div>                      
                        <div className="form-group">
                        <button className="btn btn-primary btn-block">Xác nhận</button>
                        </div>
                    </div>
                </Form>
                </div>

            </div>
        </React.Fragment>
    )
}
export default Customer;