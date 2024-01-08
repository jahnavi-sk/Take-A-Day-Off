import React from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './styles_check.css'
import logo from './logo.png'
import check_l from './take_off_page_girl.png'
import check_m from './take_off_page_dude.png'

function Check()

{

    const next_display = ()=>{
        var div_1 = document.getElementById("btn");
        var div_2 = document.getElementById("attend");
        div_1.style.display = "none";
        div_2.style.display="block"
    }


    return(

        <div className="Checking">
            <div className="header"></div>
            <div className="Logo">
            <img src={logo} className="logo" alt="logo img"/>
            </div>

            {/* <div className="behind_box"></div> */}
            <div className="mid_big_box">
            <div className="whitecircle_1"></div>
            <div className="whitecircle_2"></div>
            <div className="whitecircle_3"></div>

            <div className="w_box">
            
                <label className="Q 1">How many days do you want to take off?</label>
                <div name="checkbox_1">
                <select id="daysno" name="days">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                </select>
                </div>
                {/* <div name="checkbox_2">
                <select id="classesno" name="classes">
                        <option value="DSA">DSA</option>
                        <option value="WT">WT</option>
                        <option value="SDS">SDS</option>
                        <option value="DDCO">DDCO</option>
                        <option value="AFLL">AFLL</option>

                </select>
                </div> */}

                <div id="attend">
                    <label id="attendance">Your attendance after taking those classes off will be: </label>
                    <button id="Back">GO BACK</button>
                </div>
                <div id="btn">
                    <button id="next_btn" onClick={next_display}>NEXT</button>
                </div>
                {/* <label className="Q_2">Which classes are you planning to take off?</label> */}
            </div>
            
            </div>
            <div className="images">
            <img src={check_l} className="checkl" alt="logo img"/>
            <img src={check_m} className="checkm" alt="logo img"/>
            </div>
                
        </div>
        
    )
}

export default Check;