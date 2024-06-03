import React, { useState, useEffect } from 'react';
import './header.css'
import { Routes, Route, Link } from 'react-router-dom';

const Header = () => {

  return (
    <div>
        <div className="header">
            <div className="Logo"></div>
            <div className="HeaderButtons">
                <Link to="/selectTest">тесты</Link>
                <p>Тесты</p>
                <p>Ваши результаты</p>
                <p>Войти</p>
                <p>Зарегистрироваться</p>
            </div>

        </div>
    </div>
  );
};


export default Header;
