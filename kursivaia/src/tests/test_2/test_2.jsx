import React, { useState, useEffect } from 'react';
import './test_2.css';

const words = {
  en: ["example", "random", "words", "to", "create", "sentences", "and", "so", "on", "with", "more", "words", "for", "testing", "typing", "speed", "in", "a", "react", "component"],
  ru: ["пример", "случайный", "слова", "для", "создания", "предложений", "и", "так", "далее", "с", "больше", "слов", "для", "тестирования", "скорости", "печати", "в", "реакт", "компоненте"]
};
const generateSentence = (language) => {
  if (!words[language]) {
    console.error(`Words for language '${language}' are not defined.`);
    return ''; // Return an empty string to avoid an error
  }
  return new Array(2).fill(null).map(() => words[language][Math.floor(Math.random() * words[language].length)]).join(' ');
};

const Test_2 = () => {
  // const [sentence, setSentence] = useState(generateSentence(language));
  // const [sentence, setSentence] = useState(generateSentence());
    const [language, setLanguage] = useState('en'); // Define language state first
  const [sentence, setSentence] = useState(generateSentence(language)); // Now use language to generate the sentence

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
      if (language === 'en' && !event.key.match(/^[A-Za-z]$/) && event.key !== ' ' ||
      language === 'ru' && !event.key.match(/^[А-Яа-яёЁ]$/) && event.key !== ' ') {
    return; // Если символ не допустим, то игнорируем нажатие
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
          const newSentence = generateSentence(language);
          setSentence(newSentence);
          setPosition(0);
          setCurrentChar(newSentence[0]);
          setErrorCount(0); // Сброс счётчика ошибок при начале нового теста
        }
      } else {
        setCorrect(false);
        setErrorCount(prevErrorCount => prevErrorCount + 1); // Увеличение счётчика ошибок
        setElapsedTime(prevElapsedTime => prevElapsedTime + 1000);
      }
    };
  
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [position, currentChar, startTime, language]); // Добавьте language в массив зависимостей


  useEffect(() => {
    let interval;
    if (startTime) {
      interval = setInterval(() => {
        // Update elapsed time in milliseconds
        setElapsedTime(Date.now() - startTime + errorCount * 1000);
      }, 1000); // Update every second instead of every millisecond
    }
    return () => {
      clearInterval(interval);
    };
  }, [startTime, errorCount]);

  const formatTime = (time) => {
    // Convert milliseconds to seconds for display
    const seconds = Math.floor(time / 1000);
    return `${seconds}`;
  };

  const endTest = () => {
    // ... ваш код для завершения теста ...
    setStartTime(null); // Сброс таймера
    setElapsedTime(0); // Сброс затраченного времени
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ru' : 'en';
    setLanguage(newLanguage);
    const newSentence = generateSentence(newLanguage);
    setSentence(newSentence);
    setPosition(0);
    setCurrentChar(newSentence[0]);
    // Сброс других состояний, если это необходимо
  };
  

  return (
    <div>
      <div className='TextLine'>
        {sentence.split('').map((char, index) => (
          <span className='Oneletter' key={index} style={{backgroundColor: index === position ? (correct ? '#2afd0021' : '#fd000021') : 'transparent'}} >
            {char}
          </span>
        ))}
      </div>
      <button onClick={toggleLanguage}>
        {language === 'en' ? 'Переключить на русский' : 'Switch to English'}
      </button>
      <div>
        <div>Время: {formatTime(elapsedTime)}</div>

        +{errorCount} секунд за ошибки 
        {currentChar}
      </div>
    </div>
  );
};

export default Test_2;
