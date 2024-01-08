import React from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './styles_land.css'
import logo from './logo.png'
import land from './landing_page.png'
import { useLocation } from "react-router-dom";

function Land()
{

    const navigate  = useNavigate();
    const location = useLocation();
    let name = location.state.name;
    let password=location.state.password;

    const profilePage = ()=>{
        navigate('/profile')
    }

    const clicked = (e) => {
        console.log("name"+name+"password"+password);
        navigate('/check',{'state':{name:name,password:password}});
            // JSON.parse(result)
            // navigate('/login')
        
    }

    return(
        <div className="Landing">
            <div className="header"></div>
            <a href="/home"><img src={logo} className="logo_land" alt="logo img"/></a>
            <div>
            
            <img src ={land} className="land" alt="land_img"/>
            </div>

            <div className="right">
                <button className="Check" onClick={profilePage}><b>Profile</b></button>
                <button className="Day_Off" onClick={clicked}><b>Take Day off</b></button>
                <label id="info"><b><i>" Never regard study as duty, but as the enviable opportunity to learn. "</i> </b></label>
                
            </div>

        </div>
    )
}

export default Land;