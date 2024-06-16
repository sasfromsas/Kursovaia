import React, { useState, useEffect } from 'react';
import './results.css'

const Results = () => {
  const [testResults, setTestResults] = useState({});
  const [testNames, setTestNames] = useState({
    1: 'Тест 1 - слепая печать',
    2: 'Тест 2 - набор текста',
    3: 'Название Теста 3'
    // Добавьте больше тестов и их названий здесь
  });

  useEffect(() => {
    const userID = localStorage.getItem('userId');
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

  return (
    <div>
      <div className="container">
      <h1>Ваши результаты</h1>
      {Object.keys(testResults).map((testID) => (
        <div key={testID} className='OneTestResult'>
          <h3>{testNames[testID]}</h3>
          <ol>
            {testResults[testID].map((result, index) => (
              <li key={index}>Результат: {result}</li>
            ))}
          </ol>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Results;

