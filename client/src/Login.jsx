// import React from "react"
import { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './styles_login.css';
import logo from './logo.png'




function  Login()
{
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const navigate  = useNavigate();
    

    const handleSubmit = (e) => {
        e.preventDefault()    
        axios.post('http://localhost:3001/login',{"userid":name,"password" : password})
        .then(result=> {
            console.log("jsk1==",result.data)
            if(result.data==="correct"){
                console.log("inside");
                navigate('/land',{'state':{name:name, password:password}})
            }
        })
        .catch(err=> console.log(err))
    }

    return(
        <div className="MyLogin">
        <div className="header"></div>
        <img src={logo} className="logo" alt="logo img"/>
        <div className="dark-overlay"></div>
        <div className="white_box_1">
            <div className="lab_1"><b>Login</b></div>
            <div className="userPass">
            <div className="user_n">Username</div>
            <input 
                type="text"
                placeholder="Enter Name"
                autoComplete="off"
                name="email"
                className="form-control rounded-0"
                onChange={(e)=> setName(e.target.value)}
                />
            <input 
                type="password"
                placeholder="Enter password"
                name="password"
                className="form-control rounded-0"
                onChange={(e) => setPassword(e.target.value)}
                />
            <div className="pass_n">Password</div>
            
            </div>
        </div>
            
        </div>
    );
}

export default Login;