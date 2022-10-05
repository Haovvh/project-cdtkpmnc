import React, { useState, useEffect } from "react";

import axios from "axios";
import { API_KEY } from "../Goong/GoongKEY";



function TotalMoney(prop) {
    
    
    
    if(prop.origins != "" || prop.destinations != "") {
        return (<h1></h1>);
    }
    return (
        <div>
            <h1>
                Số Km: {distance.quangduong}
            </h1>
            <h2>
                Thời Gian: {distance.thoigian}
            </h2>
        </div>
    )
    
}

export default TotalMoney;