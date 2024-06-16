import React, { useState, useEffect } from 'react';
import './header.css';
import { Form, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Header = () => {
  // Состояние для хранения имени пользователя
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  // Функция для получения данных пользователя из localStorage
  useEffect(() => {
    // Предполагается, что вы сохраняете имя пользователя в localStorage после входа
    const name = localStorage.getItem('userName');
    if (name) {
      setUserName(name);
    }
  }, [localStorage.getItem('userName')]);

  const clearStorage=()=>{
    localStorage.clear();
    navigate('/login')
    setUserName(null)
  }

  return (
    <div className="header">
      <div className="headerLogo">
        <div className="Logo">
          {/* <img src="" alt="" /> */}
        </div>
        <p className='LogoText'>Dimka's Test</p>
      </div>
      <div className="HeaderButtons">
        <Link to="/"><p className='HeaderButtonText'>Тесты</p></Link>
        <Link to="/results"><p className='HeaderButtonText'>Результаты</p></Link>
        {userName ? (
          <>
            <span className='HeaderButtonText'>{userName}</span>
            {/* <Link to="/login">Выйти</Link> */}
            <p onClick={clearStorage}><p className='HeaderButtonText'>Выйти</p></p>
          </>
        ) : (
          <>
            <Link to="/login"><p className='HeaderButtonText'>Войти</p></Link>
            <Link to="/registration"><p className='HeaderButtonText'>Регистрация</p></Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
