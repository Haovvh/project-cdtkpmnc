import axios from 'axios';
import authHeader from './auth-header';


class User {

  loginUser(username, password) {
    return axios
    
      .post(process.env.REACT_APP_API_URL + "/user/login", {
        username,
        password
      })
      .then(response => {
        console.log(response.data)
        if (response.data) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response;
      });
  }
  
  getUserbyPhone(Phone) {
    return axios.get(process.env.REACT_APP_API_URL + `/user/${Phone}`, 
    { headers: authHeader() });
  }

  registerUser(username, firstName, lastName, phone, email, password) {
    console.log( username + " " + firstName + " " + lastName + " " + phone + " " + email + " " + password)
    return axios.post(process.env.REACT_APP_API_URL + "/user/register", {
      username, firstName, lastName, phone, email, password
    });
  }
  logoutUser() {
    localStorage.removeItem("user");
  }

  getUserbyId(id) {
    return axios.get(process.env.REACT_APP_API_URL + `/user/${id}`, 
    { headers: authHeader() });
  }
  putUserCustomer(id, firstName, lastName, phone, email,  ) {
    return axios.put(process.env.REACT_APP_API_URL + `/user/${id}`,{
      firstName, lastName, phone, email
    }, {
      headers: authHeader()
    }
    )
  }  
  putUserDriver(id, firstName, lastName, phone, email, personalId , vehicleInfo ) {
    return axios.put(process.env.REACT_APP_API_URL + `/user/${id}`,
    {
      firstName, lastName, phone, email, personalId, vehicleInfo
    }, {
      headers: authHeader()
    }
  )
  } 
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
 
  
  
  
}

export default new User();
