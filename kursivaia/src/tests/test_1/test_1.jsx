import React, { useState, useEffect } from 'react';
import VirtualKeyboard from './keyboard';
import './test_1.css'
import '../TestsStyle.css'

const Test_1 = () => {
  const [score, setScore] = useState(0);
  const [currentLetter, setCurrentLetter] = useState('');
  const [wrongLetter, setWrongLetter] = useState(null);
  const [language, setLanguage] = useState('ru');
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [firstLetterPressed, setFirstLetterPressed] = useState(false);
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const [isResultSaved, setIsResultSaved] = useState(false);


  // Генерация случайной буквы
  const generateRandomLetter = () => {
    const letters = language === 'ru' ? 'абвгдежзийклмнопрстуфхцчшщъыьэюя' : 'abcdefghijklmnopqrstuvwxyz';
    return letters[Math.floor(Math.random() * letters.length)];
  };

  // Обработка нажатия клавиши
  const handleKeyPress = (letter) => {
    if (!isActive) return;
    if (letter === currentLetter) {
      if (!firstLetterPressed) {
        setFirstLetterPressed(true);
        // Убираем setIsActive(true); отсюда, так как тест уже активен
      } else {
        setScore((prevScore) => prevScore + 1);
      }
      setWrongLetter(null);
      setCurrentLetter(generateRandomLetter());
    } else {
      if (firstLetterPressed) {
        setScore((prevScore) => prevScore - 1);
      }
      setWrongLetter(letter);
    }
  };
  
  

  // Подписка на событие нажатия клавиши
  useEffect(() => {
    if (!isActive) return;
    const handleKeyDown = (event) => {
      // Проверяем, является ли нажатая клавиша буквой
      if (event.key.length === 1 && event.key.match(/[a-zа-я]/i)) {
        handleKeyPress(event.key.toLowerCase());
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentLetter, isActive]);

  // Таймер
  useEffect(() => {
    let interval = null;
    if (isActive && firstLetterPressed && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      setFirstLetterPressed(false);
    }
    return () => clearInterval(interval);
  }, [isActive, firstLetterPressed, timeLeft]);
  
  

  // Инициализация первой буквы и сброс таймера
  useEffect(() => {
    setTimeLeft(30);
  }, [language]);

  // Начать тест
// Начать тест
const startTest = () => {
  setScore(0);
  setWrongLetter(null);
  setFirstLetterPressed(false);
  setTimeLeft(3); // Установите время, соответствующее полной длительности теста
  setIsActive(true);
  setCurrentLetter(generateRandomLetter());
  setIsTestCompleted(false); // Сброс флага завершения теста
  setIsResultSaved(false); // Сброс флага сохранения результатов
};



useEffect(() => {
  if (timeLeft === 0) {
    setIsActive(false);
    setFirstLetterPressed(false);
    setIsTestCompleted(true); // Установка флага завершения теста
  }
}, [timeLeft]);
  
const saveResult = () => {
  const testId = 1;
  const userId = localStorage.getItem('userId'); // Replace 'userId' with the actual key you use
  const result = score;

  fetch('http://localhost:3002/saveResult', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ test_id: testId, user_id: userId, result }),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Result saved:', data);
    setIsResultSaved(true);
  })
  .catch(error => {
    console.error('Error saving result:', error);
  });
};

useEffect(() => {
  if (isActive) {
    setIsResultSaved(false);
  }
}, [isActive]);

//////////////////////////////

  return (
    <div>
    <div className="Test1TExt">
      <h2>Тест скорости печати</h2>
      <p>Очки: {score}</p>
      <p>Время до окончания теста: {!isActive ? 'Нажмите старт' : timeLeft}</p>
      <p>Нажмите на букву: {currentLetter}</p>
    </div>
      <VirtualKeyboard currentLetter={currentLetter} onKeyPress={handleKeyPress} language={language} wrongLetter={wrongLetter} />
      
      <div className='BottomButtons'>
      {!isActive && (
        <>
          <button onClick={() => setLanguage('ru')}>Русский</button>
          <button onClick={() => setLanguage('en')}>English</button>
        </>
      )}
      {isActive ? null : <button onClick={startTest}>СТАРТ</button>}
      {isTestCompleted && !isResultSaved && (
        <button onClick={saveResult}>Сохранить результат</button>
      )}
      </div>

    </div>
  );
};

export default Test_1;
