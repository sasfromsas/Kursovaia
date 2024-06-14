// import { Form, Link } from 'react-router-dom';
// import React, { useState, useEffect } from 'react';
// import './results.css';

// const Results = () => {
//   const [results, setResults] = useState({});
//   const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

//   useEffect(() => {
//     const userId = localStorage.getItem('userId');
//     if (userId) {
//       setIsUserLoggedIn(true);
//       fetch(`http://localhost:3002/getResultByUserId?user_id=${userId}`)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Сетевой ответ был не ok.');
//         }
//         return response.json();
//       })
//       .then(data => {
//         // Преобразование данных в ожидаемую структуру
//         const transformedResults = data.reduce((acc, current) => {
//           const { test_id, ...rest } = current;
//           if (!acc[test_id]) {
//             acc[test_id] = [];
//           }
//           acc[test_id].push(rest);
//           return acc;
//         }, {});
//         setResults(transformedResults);
//       })
//       .catch(error => {
//         console.error('Ошибка при получении результатов:', error);
//       });
//     } else {
//       setIsUserLoggedIn(false);
//     }
//   }, []);

//   return (
//     <div className="container">
//     <div className="results-container">
//       {isUserLoggedIn ? (
//         Object.keys(results).length > 0 ? (
//           Object.keys(results).map((testId) => (
//             <div key={testId} className="test-result">
//               <h3>Test ID: {testId}</h3>
//               <ul>
//                 {results[testId].map((result, index) => (
//                   <li key={index}>
//                     Попытка №{result.attempt}: {result.score}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))
//         ) : (
//       <p style={{fontSize:'30px'}}>Похоже, вы пока не сохранили ни одного результата. Вы можете сделать это после прохождения одного из <span><Link to="/" style={{color:'#acacac'}}>тестов</Link></span>.</p>
// )
//       ) : (
//         <p style={{fontSize:'30px'}}>Для просмотра и сохранения результатов необходимо <span><Link to="/registration" style={{color:'#acacac'}}>зарегистрироваться</Link></span> или <span><Link to="/login" style={{color:'#acacac'}}>войти</Link></span> в свой профиль, однако вы всегда можете пройти любой из <span><Link to="/" style={{color:'#acacac'}}>тестов</Link></span>.</p>
//       )}
//     </div>
//     </div>
//   );
// };

// export default Results;





import React, { useState, useEffect } from 'react';

const Results = () => {
  const [testResults, setTestResults] = useState({});
  const [testNames, setTestNames] = useState({
    1: 'Тест 1 - расположение клавишь',
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
      {Object.keys(testResults).map((testID) => (
        <div key={testID} style={{backgroundColor:'black', border:'2px solid', padding:'100px'}}>
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

