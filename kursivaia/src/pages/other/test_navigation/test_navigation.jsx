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
            <p>Выберите тест</p>
            {/* <VirtualKeyboard /> */}
            <Link to="/Test1" className='ekekek'><p>Тест1</p></Link>
            <Link to="/Test2" className='ekekek'><p>Тест2</p></Link>
            <Link to="/Test3" className='ekekek'><p>Тест3</p></Link>
            </div>
        </div>
    );
  };

export default Test_navigaton;
