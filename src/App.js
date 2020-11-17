import React, { Component } from "react";
import './App.css';
import validator from 'validator';

class App extends Component {


    state = {
      email: "",
      password: "",
      effectualMessage: "",
      targetField: "",
      isError: false,
      // isError: false,
    }

//============================================================================================================//
//============================================================================================================//

handleOnChangeEmail = (event)=>{
// set email state to whatever os updated in the email input
this.setState({
  [event.target.name]: event.target.value,
}, ()=>{
  //grabbing the email in our state so we can work with it in verifying our inputs
  const {email} = this.state;

  console.log(event.target.name)

  // validator.isEmail to follow if inputted string becomes an accepted email format
  // set to isEmail
  let isEmail = validator.isEmail(email);

  //  if isEmail results to true *- a validated email format 
  //   do nothing, 
  // else show alert to user to input an accepted email format
  
  if(isEmail){ 
    this.setState({
      isError: false,
      effectualMessage: "",
      targetField: "email",
    })
  }else {
    this.setState({
      isError: true,
      effectualMessage: `Please enter your email address in desired format: yourname@example.com  `,
      targetField: "email",
    })
  }
} )}

//============================================================================================================//
//============================================================================================================//
handelOnChangePassword = (event)=>{
  this.setState({

    [event.target.name]: event.target.value,
  }, ()=>{
    const {password} = this.state;

    // check if given string matches
    let isPassword = validator.matches(password, "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$" );

    // if password format-validator results to true, state remains normal
    // otherwise alert should prompt user instructing the accepted validated password format
    if(isPassword){
      this.setState({
        isError: false,
        effectualMessage: '',
        targetField: "password"
      })
    } else {
      this.setState({
        isError: true,
        effectualMessage: `Password must contain A minimum of 8 characters, including:
        - 1 Uppercase Letter,  
        - 1 Lowercase Letter,
        - 1 Number,  
        - and 1 of these special characters " #?!@$%^&*_ "`,
        targetField: "password"
      
      });
    }

  });
}

//============================================================================================================//
//============================================================================================================//
handleOnSubmit = async (event) => {
  event.preventDefault();

  // console.log(event)
const {email, password} = this.state;

if(validator.isEmpty(email) && validator.isEmpty(password)) {
  this.setState({
    isError:  true,
    effectualMessage: " Cannot have empty Email and Password",
    targetField: "submit-button"
  });
  return;
} else {
  this.setState({
    isError: false,
    effectualMessage: "",
    targetField: "submit-button"
  });
}

if(validator.isEmpty(email)){
  this.setState({
    isError: true,
    effectualMessage: "Cannot have empty email",
    targetField: "submit-button"
  })
} else {
  this.setState({
    isError: false,
    effectualMessage: "",
    targetField: "submit-button"
  });
}


if(validator.isEmpty(password)){
  this.setState({
    isError: true,
    effectualMessage: "Cannot have empty password",
    targetField: "submit-button"
  });
} else {
  this.setState({
    isError:false,
    effectualMessage:"",
    targetField: "submit-button"
  })
}

};



//============================================================================================================//
//============================================================================================================//

render () { 

const {effectualMessage, isError, targetField}= this.state

  let showSignUpComponent = <form onSubmit={this.handleOnSubmit}>
            <div className="login-info-box" >
            <h2>Sign Up</h2>
            
            {isError && targetField ==="email"  ? <div className="effectual-message">{effectualMessage}</div>: ""}
            {isError && targetField ==="submit-button" ? <div className="effectual-message">{effectualMessage}</div>: ""}
            <br/>
                <input 
                type="text"
                placeholder="enter email"
                name="email"
                onChange={this.handleOnChangeEmail}
                />
                {" "}<br />

                
              {isError && targetField === "password" ? <div className="effectual-message">{effectualMessage}</div>: ""}
                <input
                type="text"
                placeholder="enter password"
                name="password"
                onChange={this.handelOnChangePassword}
                />
                {" "}
                <br />

                <button>Sign Up</button>
            </div>
          </form>
  return (

    <div>
    {showSignUpComponent}

  </div>
    )

  
}}

export default App;
