import React, { useState, useEffect } from 'react';
import './test_2.css'

const words = ["example", "random", "words", "to", "create", "sentences", "and", "so", "on", "with", "more", "words", "for", "testing", "typing", "speed", "in", "a", "react", "component"];
const generateSentence = () => {
  return new Array(3).fill(null).map(() => words[Math.floor(Math.random() * words.length)]).join(' ');
};

const Test_2 = () => {

  const [sentence, setSentence] = useState(generateSentence());
  const [position, setPosition] = useState(0);
  const [currentChar, setCurrentChar] = useState(sentence[0]);
  const [correct, setCorrect] = useState(true);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === currentChar) {
        setCorrect(true);
        const nextPosition = position + 1;
        if (nextPosition < sentence.length) {
          setPosition(nextPosition);
          setCurrentChar(sentence[nextPosition]);
        } else {
          // Reset or end test
          alert('Test completed!');
          setSentence(generateSentence());
          setPosition(0);
          setCurrentChar(sentence[0]);
        }
      } else {
        setCorrect(false);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentChar, position, sentence]);

  return (
    <div>
      <div>
        {sentence.split('').map((char, index) => (
          <span key={index} style={{
            backgroundColor: index === position ? (correct ? 'green' : 'red') : 'transparent'
          }}>
            {char}
          </span>
        ))}
      </div>
    </div>
  );
};


export default Test_2;
