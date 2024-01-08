import { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
// import './Signup.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles_sign.css';
import logo from './logo.png'
import manImg from './sign_up_page.png'

function SignUp(){
    const [name,setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [section, setSection] = useState();
    const [semester, setSemester] = useState(); 
    const navigate  = useNavigate();



    
    const next_pg = (e) =>{
        navigate('/sign_next', {'state':{name:name, email:email, password:password,section:section,semester:semester}})
        
    }
    return(
        <div className="SignUp">
            <div className="header"></div>
            <div className="AboutYou">
            <img src={logo} className="logo_sign" alt="logo img"/>
            <img src={manImg} alt="man_img" className="man_img"></img> 
            <h1 className="about">A Bit About You</h1>
            </div>
            <div className="container">
            
                <form className="sign-form" >
                    <table>

                    <tr>
                            <th><br></br><br></br></th>
                        </tr>
                        <tr>
                            <td>
                            <label htmlFor="name">
                            <strong>Name</strong>
                            </label>
                            </td>
                            <td>
                            <input 
                                type="text"
                                placeholder="Enter Name"
                                autoComplete="off"
                                name="email"
                                className="form-control rounded-0"
                                onChange={(e)=> setName(e.target.value)}
                                />
                            </td>
                        </tr>


                        <tr>
                            <th><br></br></th>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="email">
                                <strong>Email</strong>
                                </label>
                            </td>
                            <td>
                            <input
                                type="email"
                                placeholder="Enter Email"
                                autoComplete="off"
                                name="email"
                                className="form-control rounded-0"
                                onChange={(e) => setEmail(e.target.value)}
                                />
                            </td>
                        </tr>

                        <tr>
                            <th><br></br></th>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="email">
                                <strong>Password</strong>
                                </label>
                            </td>
                            <td>
                            <input 
                                type="password"
                                placeholder="Enter password"
                                name="password"
                                className="register_pwd"
                                // className="form-control rounded-0"
                                onChange={(e) => setPassword(e.target.value)}
                                />
                            </td>
                        </tr>

                        <tr>
                            <th><br></br></th>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="email">
                                <strong>Semester</strong>
                                </label>
                            </td>
                            <td>
                            <input 
                                type="semester"
                                placeholder="Enter Semester"
                                name="email"
                                className="form-control rounded-0"
                                onChange={(e) => setSemester(e.target.value)}
                            />
                            </td>
                        </tr>

                        <tr>
                            <th><br></br></th>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="email">
                                <strong>Section</strong>
                                </label>
                            </td>
                            <td>
                                <input 
                                    type="section"
                                    placeholder="Enter Section"
                                    name="email"
                                    className="form-control rounded-0"
                                    onChange={(e) => setSection(e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th><br></br><br></br></th>
                        </tr>
                    </table>
                        <button id="next" onClick={next_pg}><b>NEXT</b></button>
                         {/* <p>Already Have an Account</p> */}
                         
                </form>
            </div>
        </div>
        
    );
}

export default SignUp;