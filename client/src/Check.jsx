import React from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './styles_check.css'
import logo from './logo.png'
import check_l from './take_off_page_girl.png'
import check_m from './take_off_page_dude.png'
import { useLocation } from "react-router-dom";


function Check()

{
    const navigate  = useNavigate();
    const location = useLocation();
    const [days,setDays] = useState();
    const [message, setMessage] = useState('');
    let named = location.state.name;
    let password=location.state.password;

    const handleDropdownChange = (e) => {
        setDays(e.target.value);
    console.log("in handle drop")

      };


    const next_display = ()=>{

        
        var div_1 = document.getElementById("btn");
        var div_2 = document.getElementById("attend");
        var div_3= document.getElementById("Q_1");
        var div_4 = document.getElementById("daysno");
        div_3.style.display="none";
        div_1.style.display = "none";
        div_2.style.display="block";
        div_4.style.display= "none";
        console.log("classes ",days)
        axios.post('http://localhost:3001/info',{"userid":named,"password":password, classes:parseInt(days, 10)})
        .then(result=> {
            console.log("succesfull!");
            var text = result.data;
            console.log("result", result.data);
            setMessage(result.data)
            // navigate('/land',{'state':{name:name,password:password}});
            // JSON.parse(result)
            // navigate('/login')
        })
        
    }

    const back_display=()=>{
        var div_1 = document.getElementById("btn");
        var div_2 = document.getElementById("Back");
        var div_3 = document.getElementById("attend");
        div_1.style.display = "block";
        div_2.style.display="none";
        div_3.style.display="none";
        navigate('/land',{'state':{name:named,password:password}});

    }


    return(

        <div className="Checking">
            <div className="header"></div>
            <a href="/land"><img src={logo} className="logo_check" alt="logo img"/></a>

            {/* <div className="behind_box"></div> */}
            <div className="mid_big_box">
            <div className="whitecircle_1"></div>
            <div className="whitecircle_2"></div>
            <div className="whitecircle_3"></div>

            <div className="w_box">
            
                <label id="Q_1">How many days do you want to take off?</label>
                <div name="checkbox_1">
                <select id="daysno" name="days" onChange={handleDropdownChange} value={days}>
                        <option value="0">No days chosen</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>

                </select>
                </div>
                

                <div id="attend">
                    <label id="attendance">{message} </label>
                    <button id="Back" onClick={back_display}>GO BACK</button>
                </div>
                <div id="btn">
                    <button id="next_btn" onClick={next_display}>Get Days!</button>
                </div>
            </div>
            

            </div>
            <div className="images">
            <img src={check_l} className="check_l" alt="logo img"/>
            <img src={check_m} className="check_m" alt="logo img"/>
            </div>
                
        </div>
        
    )
}

export default Check;