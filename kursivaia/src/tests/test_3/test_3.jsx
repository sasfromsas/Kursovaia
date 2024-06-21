import React, { useState, useEffect } from 'react';
import './test_3.css';

const getRandomPosition = (size) => {
  const position = Math.floor(Math.random() * (600 - size));
  return position;
};

const Circle = ({ onClick, text, isActive }) => {
  const size = 50; // Размер круга
  const [position, setPosition] = useState({
    top: 275, // Центрируем круг
    left: 275,
  });

  useEffect(() => {
    if (text !== 'Старт' && isActive) {
      setPosition({
        top: getRandomPosition(size),
        left: getRandomPosition(size),
      });
    }
  }, [text, isActive]);

  const handleClick = (e) => {
    e.stopPropagation(); // Предотвращаем всплытие события
    if (text !== 'Старт' && isActive) {
      setPosition({
        top: getRandomPosition(size),
        left: getRandomPosition(size),
      });
    }
    onClick();
  };

  return (
    <div
      className={`circle ${text === 'Старт' ? 'start-circle' : ''}`}
      onClick={handleClick}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        lineHeight: `${size}px`,
        textAlign: 'center'
      }}
    >
      {text}
    </div>
  );
};


const Test_3 = () => {
  const [clickCount, setClickCount] = useState(0);
  const [missCount, setMissCount] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isResultSaved, setIsResultSaved] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && !isActive) {
      // Убираем setIsActive(false) отсюда
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleCircleClick = () => {
    if (isActive && timeLeft > 0) { // Добавляем проверку timeLeft
      setClickCount(clickCount + 1);
    }
  };

  const handleMissClick = () => {
    if (isActive && timeLeft > 0) { // Добавляем проверку timeLeft
      setMissCount(missCount + 1);
    }
  };

  const handleStartClick = () => {
    if (!isActive) { // Добавляем проверку isActive
      setIsActive(true);
      setTimeLeft(30); // Сбрасываем время до начального значения
      setClickCount(0); // Сбрасываем количество кликов
      setMissCount(0); // Сбрасываем количество промахов
    }
  };

  const handleRestartClick = () => {
    setIsActive(false);
    setClickCount(0);
    setMissCount(0);
    setIsResultSaved(false);
    // setTimeLeft(30);
    // Также нужно сбросить позиции кругов, если это требуется
  };


  const saveResult = () => {
    const testId = 3;
    const userId = localStorage.getItem('userId'); // Replace 'userId' with the actual key you use
    const result = clickCount;
  
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





  return (
    <div className='Test3Body'>
      <div className='Test3TopText'>
        <div>Очки: {clickCount - missCount}</div>
        <div>-{missCount} очков за ошибки</div>
        <div>Осталось {timeLeft} секунд</div>
      </div>
      <div className="test-container" onClick={handleMissClick}>
        {isActive
          ? Array.from({ length: 3 }).map((_, index) => (
            <Circle key={index} onClick={handleCircleClick} isActive={isActive} />
            )) : <Circle onClick={handleStartClick} text='Старт' isActive={isActive} />
        }
      </div>
      {timeLeft === 0 && (
        <div className='Test3Buttons'>
        <button onClick={handleRestartClick} className="restart-button">Рестарт</button>
        <button onClick={saveResult}>Сохранить результат</button>
        </div>
      )}
    </div>
  );
};

export default Test_3;
