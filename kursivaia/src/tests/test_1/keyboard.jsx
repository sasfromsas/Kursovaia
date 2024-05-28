import React, { useState, useEffect } from 'react';
import './keyboard.css'

// Компонент для отображения виртуальной клавиатуры
const getKeyboardLayout = (language) => {
    const layouts = {
      ru: [
        'йцукенгшщзхъ',
        'фывапролджэ',
        'ячсмитьбю'
      ],
      en: [
        'qwertyuiop',
        'asdfghjkl',
        'zxcvbnm'
      ]
    };
    return layouts[language];
  };
  


  // Компонент клавиатуры
  const VirtualKeyboard = ({ currentLetter, onKeyPress, language, wrongLetter  }) => {
    // Получение раскладки клавиатуры для текущего языка
    const rows = getKeyboardLayout(language);
  
    return (
        <div className='VirtyalKeyboard'>
        {rows.map((row, index) => (
          <div key={index} >
            <div >
            {row.split('').map(letter => (
              <button
                className='OneButtonOnVirtyalKeyboard'
                key={letter}
                style={{ 
                  background: currentLetter === letter ? 'green' : wrongLetter === letter ? 'red' : 'initial'
                }}
                onClick={() => onKeyPress(letter)}
              >
                {letter}
              </button>
            ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

export default VirtualKeyboard;
