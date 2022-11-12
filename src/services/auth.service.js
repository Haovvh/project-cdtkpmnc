import axios from "axios";


class AuthService {
  login(username, password) {
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

  logout() {
    localStorage.removeItem("user");
  }

  register(username, firstName, lastName, phone, email, password) {
    console.log( username + " " + firstName + " " + lastName + " " + phone + " " + email + " " + password)
    return axios.post(process.env.REACT_APP_API_URL + "/user/register", {
      username, firstName, lastName, phone, email, password
    });
  }
  

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
