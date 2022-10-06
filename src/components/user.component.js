import React, {useState}from "react";

export default function User(props) {
    const [callHistory, setCallHistory] = useState([
        {time: "2022-10-10 10:10", place: "105 Trường chinh, tân phú", car: 4},
        {time: "2023-10-10 10:10", place: "106 Trường chinh, tân phú", car: 7},
        {time: "2024-10-10 10:10", place: "107 Trường chinh, tân phú", car: 7},
        {time: "2025-10-10 10:10", place: "108 Trường chinh, tân phú", car: 4},
        {time: "2026-10-10 10:10", place: "109 Trường chinh, tân phú", car: 4},
    ])
    if(props) {
        return null;
    }
    return (
        <React.Fragment>
            <div className="card card-container">
                <div className="col-md-12">
                    <div className="form-group">
                        <label htmlFor="phonecustomer">Họ và tên: </label>
                        <input
                            placeholder="Phone Customer"
                            type="phone"
                            className="form-control"
                            disabled
                        />
                    </div>  
                    <div className="form-group">
                        <label htmlFor="phonecustomer">Địa chỉ: </label>
                        <input
                            placeholder="Phone Customer"
                            type="phone"
                            className="form-control"
                            disabled
                        />
                    </div>  
                    <div className="form-group">
                        {callHistory.map((result) => <CallHistory time={callHistory.time}/>)}
                    </div>                 
                </div>
            </div>
        </React.Fragment>
    );
}