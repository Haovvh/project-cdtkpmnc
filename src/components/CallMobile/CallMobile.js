import React, {useState} from "react";
import Input from "react-validation/build/input";
import Form from "react-validation/build/form";


const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default function CallMobile () {
    const [message, setMessage] = useState("");
    const [NewInfo, setNewInfo] = useState({
        phone: "",
        firstName: "",
        lastName: ""
      })


    const handleClickNewUSer = () => {
     
      }

    return (
            <React.Fragment>
              <div className="container">
              <header className="jumbotron">
                <h3>SupportStaff</h3> 
              </header>
              </div>
              {message && (
                    <div className="form-group">
                      <div className="alert alert-danger" role="alert">
                        {message}
                      </div>
                    </div>
                  )}
              <div>
                <Form
                >
                <div className="form-group">
                    <label htmlFor="phoneuser">Phone User</label>
                    <Input
                      value={NewInfo.Phone}
                      placeholder="Phone User"
                      type="phone"
                      className="form-control"
                      validations={[required]}
                      onChange={(event) => setNewInfo(prevState => ({...prevState, phone: event.target.value}))}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phonecustomer">FirstName </label>
                    <Input
                      value={NewInfo.firstName}
                      placeholder="First Name"
                      type="text"
                      className="form-control"
                      validations={[required]}
                      onChange={(event) => setNewInfo(prevState => ({...prevState,firstName: event.target.value}))}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="LastName">LastName </label>
                    <Input
                      value={NewInfo.lastName}
                      placeholder="Last Name"
                      type="text"
                      className="form-control"
                      validations={[required]}
                      onChange={(event) => setNewInfo(prevState => ({...prevState,lastName: event.target.value}))}
                    />
                  </div>                  
                </Form>             
      
              </div>
              <div>        
                <button className="btn btn-primary" onClick={() => {handleClickNewUSer()}} >Create</button>
              </div>

    </React.Fragment>
    )
}
