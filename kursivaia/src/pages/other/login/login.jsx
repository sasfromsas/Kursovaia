import React, { useState, useEffect } from 'react';
import './login.css'
import { Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {Navigate} from 'react-router-dom'

const Login = () => {

  const [user_email, setEmail] = useState('');
  const [user_password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {


      try {
          const response = await fetch('http://localhost:3002/user/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ user_email, user_password })
          });

          const data = await response.json();
          // console.log('user:    '+data.user.is_admin)

          if (response.ok) {
              // setIsAdmin(false)
              localStorage.clear ();
              // document.cookie = `token=${data.token} , Name= ${data.first_name}`;
              localStorage.setItem('token', data.token);
              localStorage.setItem('userName', data.user.user_name);
              localStorage.setItem('userId', data.user.user_id)
              // localStorage.setItem('userName', data.user.first_name);
              // setUserName( data.user.user_name);
              console.log("Name:  " + data.user.user_name);
              // setCurrentUser(true);
              console.log(data.user);
              console.log('token:  ' + data.token);
              navigate('/');
              
          } else {
              console.error(data.message);
          }
      } catch (error) {
          console.error('An error occurred:', error);
      }

      // if(user) {
      //     <Navigate to="/" replace />;
      //   }
      
  };

  return (
      <div className='form'>
          <p align = "center">Login</p>
          <div className='login'>
              <input type="text" placeholder="Email" value={user_email} onChange={(e) => setEmail(e.target.value)} />
              <input type="password" placeholder="Password" value={user_password} onChange={(e) => setPassword(e.target.value)} />
              <button onClick={handleLogin}>Подтвердить</button>
          </div>
          
          
      </div>
      
  );
};


export default Login;
