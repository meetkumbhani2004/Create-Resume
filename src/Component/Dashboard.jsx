import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';


const Homepaze = () => {
    const navigate = useNavigate();
  return (
    <div>
        <div
              className='Hero'
              
            >
            <form  className='Homepage-form'>
                <h1 className='home-head'>Welcome to M K Developer</h1>
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