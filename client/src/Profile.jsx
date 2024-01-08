import React from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './styles_profile.css'
import logo from './logo.png'
import line from './Vector.png'
import corner from './corner_img.png'
import prof from './prof.png'

function Pfp(){
    return(
        <div className="pfp">
            <div className="header"></div>
            <div className="brown_box">
                <img src={line} className="line_1"></img>
                <img src={line} className="line_1"></img>
                <img src={line} className="line_1"></img>
                <img src={line} className="line_1"></img>
            </div>
            <div className="yellow_bg"></div>
            <div className="white_box">
                <div>
                <img src={logo} class="logo_pfp" alt="logo img"/>
                <img src={corner} class="corner_pfp" alt="corner_img"/>
                <img src={prof} class="prof_" alt="sample_img"/>
                {/* <label id="name">Username:</label> */}
                </div>
            </div>


            <label id="name">Username</label>
            <label id="sem">SEMESTER:</label>
            <label id="sect">SECTION:</label>
            <label id="mail">EMAIL:</label>
            <button id="edit">Edit Profile</button>
            <div className="inner_yellow"></div>

        </div>
    );
}

export default Pfp;