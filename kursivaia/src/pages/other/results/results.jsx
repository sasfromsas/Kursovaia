import { Form, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './results.css';

const Results = () => {
  const [results, setResults] = useState({});
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setIsUserLoggedIn(true);
      fetch(`http://localhost:3002/getResultByUserId?user_id=${userId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Сетевой ответ был не ok.');
          }
          return response.json();
        })
        .then(data => {
          setResults(data);
        })
        .catch(error => {
          console.error('Ошибка при получении результатов:', error);
        });
    } else {
      setIsUserLoggedIn(false);
    }
  }, []);

  return (
    <div className="container">
    <div className="results-container">
      {isUserLoggedIn ? (
        Object.keys(results).length > 0 ? (
          Object.keys(results).map((testId) => (
            <div key={testId} className="test-result">
              <h3>Test ID: {testId}</h3>
              <ul>
                {results[testId].map((result, index) => (
                  <li key={index}>
                    Попытка №{result.attempt}: {result.score}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
      <p style={{fontSize:'30px'}}>Похоже, вы пока не сохранили ни одного результата. Вы можете сделать это после прохождения одного из <span><Link to="/" style={{color:'#acacac'}}>тестов</Link></span>.</p>
)
      ) : (
        <p style={{fontSize:'30px'}}>Для просмотра и сохранения результатов необходимо <span><Link to="/registration" style={{color:'#acacac'}}>зарегистрироваться</Link></span> или <span><Link to="/login" style={{color:'#acacac'}}>войти</Link></span> в свой профиль, однако вы всегда можете пройти любой из <span><Link to="/" style={{color:'#acacac'}}>тестов</Link></span>.</p>
      )}
    </div>
    </div>
  );
};

export default Results;
