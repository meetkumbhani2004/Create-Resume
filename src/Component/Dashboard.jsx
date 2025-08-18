import React from 'react'
import bgImage from "../bgm2.jpg";
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';


const Homepaze = () => {
    const navigate = useNavigate();
  return (
    <div>
        <div
              className='Hero'
              style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
                textAlign:"center",
                justifyContent: "center",
                borderRadius:"20px",
              }}
            >
            <form  className='Homepage-form'>
                <h1 className='home-head'>Welcome to RBH</h1>
                <button className='home-btn' onClick={() => {  navigate('/login'); }}   style={{ cursor: 'pointer' }}>Login</button>
                <button className='home-btn' onClick={() => {  navigate('/register'); }}   style={{ cursor: 'pointer' }}>Sign Up</button>
                <div>
                    <button className='home-btn' onClick={() => {  navigate('/resume'); }}   style={{ cursor: 'pointer' }}>Build your free Resume</button>
                </div>
            </form>
        
            </div>
    </div>
  )
}

export default Homepaze;