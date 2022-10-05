import axios from "axios";
import { API_KEY } from "../Goong/GoongKEY";
export default async function check(origins, destinations) {
    const URLGoong = `https://rsapi.goong.io/DistanceMatrix?origins=${origins}&destinations=${destinations}&vehicle=car&api_key=${API_KEY}`;
    let res = await axios.get(URLGoong)
    console.log(res.data)
    return res.data;
}