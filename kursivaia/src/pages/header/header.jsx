import React, { useState, useEffect } from 'react';
import './header.css'


const Header = () => {

  return (
    <div>
        <div className="header">
            <div className="Logo"></div>
            <div className="HeaderButtons">
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
