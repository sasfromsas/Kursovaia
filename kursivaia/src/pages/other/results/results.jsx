import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Make sure to import Link from react-router-dom
import './results.css';

const Results = () => {
  const [testResults, setTestResults] = useState({});
  const [testNames, setTestNames] = useState({
    1: 'Тест 1 - слепая печать',
    2: 'Тест 2 - набор текста',
    3: 'Название Теста 3'
    // Добавьте больше тестов и их названий здесь
  });
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  useEffect(() => {
    const userID = localStorage.getItem('userId');
    setIsUserAuthenticated(!!userID);
    if (userID) {
      fetch(`http://localhost:3002/getResultByUserId?user_id=${userID}`)
        .then(response => response.json())
        .then(data => {
          // Группировка результатов по test_id
          const groupedResults = data.reduce((acc, current) => {
            const { test_id, result } = current;
            if (!acc[test_id]) {
              acc[test_id] = [];
            }
            acc[test_id].push(result);
            return acc;
          }, {});

          setTestResults(groupedResults);
        })
        .catch(error => console.error('Ошибка при получении результатов теста:', error));
    }
  }, []);

  const renderContent = () => {
    if (isUserAuthenticated) {
      if (Object.keys(testResults).length === 0) {
        return (
          <p style={{fontSize:'30px'}}>
            Похоже, вы пока не сохранили ни одного результата. Вы можете сделать это после прохождения одного из 
            <Link to="/" style={{color:'#acacac'}}> тестов</Link>.
          </p>
        );
      } else {
        return Object.keys(testResults).map((testID) => (
          <div key={testID} className='OneTestResult'>
            <h3>{testNames[testID]}</h3>
            <ol>
              {testResults[testID].map((result, index) => (
                <li key={index}>Результат: {result}</li>
              ))}
            </ol>
          </div>
        ));
      }
    } else {
      return (
        <p style={{fontSize:'30px'}}>
          Для просмотра и сохранения результатов необходимо 
          <Link to="/registration" style={{color:'#acacac'}}> зарегистрироваться</Link> или 
          <Link to="/login" style={{color:'#acacac'}}> войти</Link> в свой профиль, однако вы всегда можете пройти любой из 
          <Link to="/" style={{color:'#acacac'}}> тестов</Link>.
        </p>
      );
    }
  };

  return (
    <div className="container">
      <h1>Ваши результаты</h1>
      {renderContent()}
    </div>
  );
};

export default Results;
