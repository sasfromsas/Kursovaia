import React, { useState, useEffect } from 'react';
import './registration.css'
import { Routes, Route, Link } from 'react-router-dom';

const Registration = () => {

  const [formData, setFormData] = useState({
    
    user_name: '',
    user_email: '',
    user_password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3002/users/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log(data);
      // Handle success or display any error messages
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <h1>Регистрация неовых пользователей</h1>
        <input type="text" name="user_name" value={formData.firstName} onChange={handleChange} placeholder="Имя" required />
        <input type="email" name="user_email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <input type="password" name="user_password" value={formData.password} onChange={handleChange} placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
      <Link to="/login"><p>уже зарегестрированы?</p></Link>
    </div>
  );
};


export default Registration;
