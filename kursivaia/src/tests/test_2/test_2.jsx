import React, { useState, useEffect } from 'react';
import './test_2.css';

const words = ["example", "random", "words", "to", "create", "sentences", "and", "so", "on", "with", "more", "words", "for", "testing", "typing", "speed", "in", "a", "react", "component"];
const generateSentence = () => {
  return new Array(20).fill(null).map(() => words[Math.floor(Math.random() * words.length)]).join(' ');
};

const Test_2 = () => {

  const [sentence, setSentence] = useState(generateSentence());
  const [position, setPosition] = useState(0);
  const [currentChar, setCurrentChar] = useState(sentence[0]);
  const [correct, setCorrect] = useState(true);
  const [errorCount, setErrorCount] = useState(0); // Добавлено новое состояние для счётчика ошибок

  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (position === 0 && event.key === currentChar && !startTime) {
        setStartTime(Date.now());
      }
      // Проверка, является ли нажатая клавиша буквой
      if (!event.key.match(/^[A-Za-z]$/) && event.key !== ' ') {
        return; // Если не буква, то игнорируем нажатие
      }
  
      if (event.key === currentChar) {
        setCorrect(true);
        const nextPosition = position + 1;
        if (nextPosition < sentence.length) {
          setPosition(nextPosition);
          setCurrentChar(sentence[nextPosition]);
        } else {
          // Reset or end test
          alert('Test completed!');
          const newSentence = generateSentence();
          setSentence(newSentence);
          setPosition(0);
          setCurrentChar(newSentence[0]);
          setErrorCount(0); // Сброс счётчика ошибок при начале нового теста
        }
      } else {
        setCorrect(false);
        setErrorCount(prevErrorCount => prevErrorCount + 1); // Увеличение счётчика ошибок
      }
    };
  
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [position, sentence]);


  useEffect(() => {
    let interval;
  
    if (startTime) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1); // Обновление каждую миллисекунду
    }
  
    return () => {
      clearInterval(interval);
    };
  }, [startTime]);

  const formatTime = (time) => {
    const date = new Date(time);
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
    const milliseconds = date.getUTCMilliseconds();
  
    return `${minutes}:${seconds}:${milliseconds.toString().padStart(3, '0')}`;
  };

  const endTest = () => {
    // ... ваш код для завершения теста ...
    setStartTime(null); // Сброс таймера
    setElapsedTime(0); // Сброс затраченного времени
  };

  return (
    <div>
      <div>
        {sentence.split('').map((char, index) => (
          <span key={index} style={{
            backgroundColor: index === position ? (correct ? '#2afd0021' : '#fd000021') : 'transparent'
          }}>
            {char}
          </span>
        ))}
      </div>
      <div>
        Ошибки: {errorCount} 
        <div>Время: {formatTime(elapsedTime)}</div>
      </div>
    </div>
  );
};

export default Test_2;
