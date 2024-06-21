import React, { useState, useEffect } from 'react';
import './registration.css'
import { Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const navigate = useNavigate();

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
      navigate('/login');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='form'>
      <form onSubmit={handleSubmit} className='registerForm'>
        <h1 style={{textAlign:'center'}}>Регистрация</h1>
        <input type="text" name="user_name" value={formData.firstName} onChange={handleChange} placeholder="Имя" required />
        <input type="email" name="user_email" value={formData.email} onChange={handleChange} placeholder="Почта" required />
        <input type="password" name="user_password" value={formData.password} onChange={handleChange} placeholder="Пароль" required />
        <button type="submit">Зарегистрироваться</button>
      </form>
      <Link to="/login"><p style={{fontSize:'16px', textAlign:'end'}}>уже зарегестрированы?</p></Link>
    </div>
  );
};


export default Registration;
