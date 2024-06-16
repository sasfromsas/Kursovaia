import React, { useState, useEffect } from 'react';
import './test_2.css';

const words = {
  en: ["tree", "river", "smart", "world", "heart", "music", "ocean", "faith", "dream", "light", "space", "magic", "honor", "power", "peace", "night", "score", "storm", "voice", "truth", "frame", "grass", "board", "bread", "cloud", "dance", "field", "flame", "glass", "green", "queen", "stone", "sweet", "water", "white", "young"],
  ru: ["дверь", "мир", "лес", "город", "свет", "снег", "цвет", "стих", "книга", "вода", "звук", "небо", "песок", "луна", "музыка", "птица", "рыба", "цветок", "часы", "яблоко", "земля", "ветер", "дождь", "камень", "лист", "огонь", "пламя", "солнце", "хлеб", "царь", "шум", "эхо", "юла"]
};
const generateSentence = (language) => {
  if (!words[language]) {
    console.error(`Words for language '${language}' are not defined.`);
    return ''; // Return an empty string to avoid an error
  }
  return new Array(30).fill(null).map(() => words[language][Math.floor(Math.random() * words[language].length)]).join(' ');
};

const Test_2 = () => {
  // const [sentence, setSentence] = useState(generateSentence(language));
  // const [sentence, setSentence] = useState(generateSentence());
    const [language, setLanguage] = useState('en'); // Define language state first
  const [sentence, setSentence] = useState(generateSentence(language)); // Now use language to generate the sentence
  const [testStarted, setTestStarted] = useState(false);
  const [position, setPosition] = useState(0);
  const [currentChar, setCurrentChar] = useState(sentence[0]);
  const [correct, setCorrect] = useState(true);
  const [errorCount, setErrorCount] = useState(0); // Добавлено новое состояние для счётчика ошибок
  const [testCompleted, setTestCompleted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isResultSaved, setIsResultSaved] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (!testStarted && event.key === currentChar) {
        // setErrorCount(0);
        // setElapsedTime(0)
        setTestStarted(true); // Установка флага начала теста
        setStartTime(Date.now()); // Начало нового теста при первом правильном нажатии клавиши
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
      endTest(); // Вызов функции endTest для завершения теста
    }
  } else {
    if (testStarted) { // Увеличение счётчика ошибок только если тест начался
      setCorrect(false);
      setErrorCount(prevErrorCount => prevErrorCount + 1);
      setElapsedTime(prevElapsedTime => prevElapsedTime + 1000);
    }
  }
};
  
document.addEventListener('keydown', handleKeyPress);
return () => {
  document.removeEventListener('keydown', handleKeyPress);
};
}, [position, currentChar, startTime, language, testStarted]); // Добавьте testStarted в массив зависимостей


  useEffect(() => {
    let interval;
    if (startTime) {
      interval = setInterval(() => {
        // Update elapsed time in milliseconds
        setElapsedTime(Date.now() - startTime + errorCount*10 * 100);
      }, 100); // Update every second instead of every millisecond
    }
    return () => {
      clearInterval(interval);
    };
  }, [startTime, errorCount]);

  const formatTime = (time) => {
    // Convert milliseconds to seconds for display
    const seconds = Math.floor(time/100).toFixed(1);
    return `${seconds/10}`;
  };

  const endTest = () => {
    setStartTime(null);
    setTestCompleted(true); // Установка флага завершения теста
    setTestStarted(false);
    // Не создаем новое предложение здесь
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
  
  const saveResult = () => {
    const testId = 2;
    const userId = localStorage.getItem('userId'); // Replace 'userId' with the actual key you use
    const result = (elapsedTime/1000).toFixed(1);
  
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
  

  const resetTest = () => {
    setTestCompleted(false); // Сброс флага завершения теста
    setErrorCount(0);
    setElapsedTime(0);
    const newSentence = generateSentence(language); // Создание нового предложения здесь
    setSentence(newSentence);
    setPosition(0);
    setCurrentChar(newSentence[0]);
    setTestStarted(false);
    setIsResultSaved(false);
  };

  return (
    <div>


      <div className='Test2_TopText'>
        {testStarted ? (
          <p>Печатайте текст как можно скорее</p>
        ) : (
          <p>Нажмите клавишу {currentChar} чтобы начать</p>
        )}
        <div>Время: {formatTime(elapsedTime)}</div>
        +{errorCount} секунд за ошибки 
      </div>
      <div className='TextLine'>
        {sentence.split('').map((char, index) => (
          <span className='Oneletter' key={index} style={{backgroundColor: index === position ? (correct ? '#2afd0021' : '#fd000021') : 'transparent'}} >
            {char}
          </span>
        ))}
      </div>

      {!testStarted && !testCompleted && ( 
        <button  onClick={toggleLanguage}>
          {language === 'en' ? 'Русский' : 'English'}
        </button>
      )}

      {testCompleted && ( // Рендер кнопки "Заново" только если тест завершен
      <>
        <button onClick={resetTest}>Заново</button>
        {testCompleted && !isResultSaved && (
        <button onClick={saveResult}>Сохранить результат</button>
        )}
      </>
      )}


    </div>
  );
};

export default Test_2;
