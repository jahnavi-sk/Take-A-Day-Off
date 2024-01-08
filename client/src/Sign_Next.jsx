import React from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './styles_next.css';
import ladyImg from './sign_up_page_lady.png'
import { useLocation } from "react-router-dom";

function Next(){

    const [AFLL,setAFLL] = useState();
    const [DSA, setDSA] = useState();
    const [WT, setWT] = useState();
    const [SDS, setSDS] = useState();
    const [DDCO, setDDCO] = useState(); 
    const navigate  = useNavigate();
    let respMessage = '' ; 

    const location = useLocation();
    console.log ("name="+location.state.name);
    let name = location.state.name;
    let email = location.state.email;
    let password = location.state.password;
    let semester = location.state.semester;
    let section = location.state.section;
    console.log ("name="+location.state.name);
    console.log ("email="+email);
    console.log ("password="+password);
    console.log ("section="+section);


    location.state.name;

    const clicked = (e) => {
        console.log("Hello");

    
        e.preventDefault()
    axios.post('http://localhost:3001/register',{"userid":name,"email":email,"password":password,"semester":semester,"section":section,"DSA":DSA,"AFLL":AFLL,"DDCO":DDCO,"WT":WT,"SDS":SDS})
        .then(result=> {
            console.log("succesfull!");
            navigate('/land',{'state':{name:name,password:password}});
            // JSON.parse(result)
            // navigate('/login')
        })
        .catch(err=> console.log(err))
    }






    return(
        <div className="SignNext">
            <div className="header"></div>
         
            <div className="Details">
            <h1><i><b>Attendance Details</b></i></h1>
            </div>

        <div className="Subjects">
            <form>
            <div className="AFLL">
                <label>
                    <strong>AFLL</strong>
                </label>
                <input 
                    type="subject"
                    autoComplete="off"
                    name="email"
                    className="form-control rounded-0"
                    onChange={(e)=> setAFLL(e.target.value)}/>
            </div> 

            <div className="DSA">
                <label>
                    <strong>DSA</strong>
                </label>
                <input 
                    type="subject"
                    autoComplete="off"
                    name="email"
                    className="form-control rounded-0"
                    onChange={(e)=> setDSA(e.target.value)}/>
            </div>  

            <div className="WT">
                <label>
                    <strong>Web Tech</strong>
                </label>
                <input 
                    type="subject"
                    autoComplete="off"
                    name="email"
                    className="form-control rounded-0"
                    onChange={(e)=> setWT(e.target.value)}/>
            </div> 
            <div className="SDS">
                <label>
                    <strong>SDS</strong>
                </label>
                <input 
                    type="subject"
                    autoComplete="off"
                    name="email"
                    className="form-control rounded-0"
                    onChange={(e)=> setSDS(e.target.value)}/>
            </div> 
            <div className="DDCO">
                <label>
                    <strong>DDCO</strong>
                </label>
                <input 
                    type="subject"
                    autoComplete="off"
                    name="email"
                    className="form-control rounded-0"
                    onChange={(e)=> setDDCO(e.target.value)}/>
            </div> 

            <button id="save" onClick={clicked}><b>SAVE</b></button>    
            </form>
            {respMessage}
        </div>
        <div className="Image">
        <img src={ladyImg} className="lady_img" alt="lady_img"/>
        </div>
        </div>
    );
}

export default Next;