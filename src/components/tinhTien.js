import axios from "axios";
import { API_KEY } from "../Goong/GoongKEY";

export default function TotalMoney(origins, destinations){   
    
    const URLGoong = `https://rsapi.goong.io/DistanceMatrix?origins=${origins}&destinations=${destinations}&vehicle=car&api_key=${API_KEY}`;
    axios.get(URLGoong).then((res) => {
        console.log(res.data.rows[0].elements[0].distance.text);
        var dataObject = {
            distance: res.data.rows[0].elements[0].distance.text,
            duration: res.data.rows[0].elements[0].duration.text
        }
        return "So km la: " + dataObject.distance + "Thời gian là: " + dataObject.duration;
        
    }).catch((err) => {
        console.log(err)
    })
}

