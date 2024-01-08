import { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './styles_home.css';
import logo from './logo.png'
import homeImg from './home_img.png'
import line from './line.png'





function  Home()
{
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const navigate  = useNavigate();
    

   

    const signupFn = ()=>{
        navigate('/register')
    }
    const submit_1 = ()=>{
        var dark_screen = document.getElementById("dark-overlay")
        dark_screen.style.display="block";
    }
    
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
        <div className="MyHome">
        <div className="header"></div>
        <img src={logo} className="logo" alt="logo img"/>
        <img src={homeImg} className="img_h" alt="logo img"/>
        <p className="home_text"><i>Welcome to our attendance management platform! Easily balance your packed schedule with our guidance on choosing optimal days to take off while maintaining attendance. Our website analyzes your attendance and timetable, suggesting the best days for time off, minimizing class disruptions. Streamline your schedule and make the most of your personal time with our user-friendly tool.</i></p>
        <button className="white_btn" onClick={submit_1}><b>Log In</b></button>
        <div id="dark-overlay">
            <div className="whiteContainer">
            <button className="reg_btn" onClick={signupFn}><b>Sign Up</b></button>
            <label className="acct">Don't have an account?</label>
            <div className="lab_1"><b>Login</b></div>
            <div className="user_n">Username</div>
            <input 
                placeholder="Enter Name"
                autoComplete="off"
                className="user_name"
                onChange={(e)=> setName(e.target.value)}
            />

            

            <input 
            placeholder="Enter password"
            type="password"
            autoComplete="off"
            className="pass_word"
            onChange={(e) => setPassword(e.target.value)}
            />
            <img src={line} className="line"/>
            <img src={line} className="line_2"/>
            <label className="or">OR</label>
            <div className="pass_n">Password</div>
            <button id="sbt_btn" onClick={handleSubmit}><b>Submit</b></button>

            </div>
        </div>
            
        </div>
    );
}

export default Home;