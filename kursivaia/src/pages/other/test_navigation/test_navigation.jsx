import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes, Route, Link } from 'react-router-dom';
import './test_navigation.css'
import '../../MainPage.css'
import VirtualKeyboard from '../../../tests/test_1/keyboard';
  // Компонент клавиатуры
  const Test_navigaton = () => {

  
    return (
        <div>
          <div className="container">
            <p style={{marginLeft:'auto', marginRight:'auto'}}>Выберите тест</p>
              <div className="TestsSelect">
                <Link to="/Test1" className='ekekek'>
                  <div className="TestSelectContainer">
                    <p style={{marginLeft:'30px'}}>Расположение кнопок</p>
                  </div>
                </Link>
                <Link to="/Test2" className='ekekek'>
                  <div className="TestSelectContainer">
                    <p style={{marginLeft:'30px'}}>Скоропечатание</p>
                  </div>
                </Link>
                <Link to="/Test3" className='ekekek'>
                  <div className="TestSelectContainer">
                    <p style={{marginLeft:'30px'}}>Владение мышью</p>
                  </div>
                </Link>
              </div>
            </div>
        </div>
    );
  };

export default Test_navigaton;
