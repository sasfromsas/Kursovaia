import React, { useState, useEffect } from 'react';
import VirtualKeyboard from './keyboard'



const Test_1 = () => {
  const [score, setScore] = useState(0);
  const [currentLetter, setCurrentLetter] = useState('');
  const [wrongLetter, setWrongLetter] = useState(null);
  const [language, setLanguage] = useState('ru');

  // Генерация случайной буквы
  const generateRandomLetter = () => {
    const letters = language === 'ru' ? 'абвгдежзийклмнопрстуфхцчшщъыьэюя' : 'abcdefghijklmnopqrstuvwxyz';
    return letters[Math.floor(Math.random() * letters.length)];
  };

  // Обработка нажатия клавиши
  const handleKeyPress = (letter) => {
    if (letter === currentLetter) {
      setScore(score + 1);
      setWrongLetter(null);
      setCurrentLetter(generateRandomLetter());

    } else {
      setScore(score - 1);
      setWrongLetter(letter);
    }
  };



  // Подписка на событие нажатия клавиши
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Проверяем, соответствует ли нажатая клавиша текущей букве
      if (event.key.toLowerCase() === currentLetter) {
        setScore(score + 1);
        setCurrentLetter(generateRandomLetter());
        setWrongLetter(null)
      } else {
        // Если нажата неправильная клавиша, уменьшаем счет
        setScore(score - 1);
        setWrongLetter(event.key.toLowerCase());
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
  
    // Отписка от события
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentLetter, score]); // Добавляем score в массив зависимостей

  // Инициализация первой буквы
  useEffect(() => {
    setCurrentLetter(generateRandomLetter());
  }, [language]);

  return (
    <div>
      <h2>Тест скорости печати</h2>
      <p>Очки: {score}</p>
      <p>Нажмите на букву: {currentLetter}</p>
      <VirtualKeyboard currentLetter={currentLetter} onKeyPress={handleKeyPress} language={language} wrongLetter={wrongLetter} />
      <button onClick={() => setLanguage('ru')}>Русский</button>
      <button onClick={() => setLanguage('en')}>English</button>
      {wrongLetter}
    </div>
  );
};


export default Test_1;
