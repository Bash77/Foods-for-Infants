import React, { useState } from 'react';
import foods from './foods';
import './App.css';

function shuffle(array) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

export default function App() {
  const [foodItems, setFoodItems] = useState(shuffle(foods));
  const [wordItems, setWordItems] = useState(shuffle(foods));
  const [matches, setMatches] = useState([]); // [{food, word}]
  const [selectedFood, setSelectedFood] = useState(null);
  const [selectedWord, setSelectedWord] = useState(null);
  const [wrongPair, setWrongPair] = useState(null);
  const [showVideo, setShowVideo] = useState(true);

  const total = foods.length;
  const correct = matches.length;
  const percent = Math.round((correct / total) * 100);

  function handleFoodClick(food) {
    if (matches.find((m) => m.food === food.name)) return;
    setSelectedFood(food);
    if (selectedWord) {
      checkMatch(food, selectedWord);
    }
  }

  function handleWordClick(word) {
    if (matches.find((m) => m.word === word.name)) return;
    setSelectedWord(word);
    if (selectedFood) {
      checkMatch(selectedFood, word);
    }
  }

  function checkMatch(food, word) {
    if (food.name === word.name) {
      setMatches([...matches, { food: food.name, word: word.name }]);
      setSelectedFood(null);
      setSelectedWord(null);
      setWrongPair(null);
    } else {
      setWrongPair({ food, word });
      setTimeout(() => {
        setSelectedFood(null);
        setSelectedWord(null);
        setWrongPair(null);
      }, 1000);
    }
  }

  function handleVideoClick() {
    window.open('https://www.youtube.com/watch?v=qh-H7c1VSgw', '_blank');
  }

  return (
    <div className="app-container">
      {showVideo && (
        <div className="video-thumbnail" onClick={handleVideoClick}>
          <img 
            src="https://img.youtube.com/vi/qh-H7c1VSgw/maxresdefault.jpg" 
            alt="Learn Fruits Video"
            className="thumbnail-image"
          />
          <div className="play-button">
            <svg viewBox="0 0 24 24" width="48" height="48">
              <path fill="red" d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      )}
      <div className="points-panel">
        Progress: {percent}%
      </div>
      <div className="game-board">
        <div className="food-list">
          {foodItems.map((food) => {
            const matched = matches.find((m) => m.food === food.name);
            return (
              <div
                key={food.name}
                className={`food-item${selectedFood === food ? ' selected' : ''}${matched ? ' matched' : ''}${wrongPair && wrongPair.food === food ? ' wrong' : ''}`}
                onClick={() => handleFoodClick(food)}
              >
                <img src={food.img} alt={food.name} />
              </div>
            );
          })}
        </div>
        <div className="word-list">
          {wordItems.map((word) => {
            const matched = matches.find((m) => m.word === word.name);
            return (
              <div
                key={word.name}
                className={`word-item${selectedWord === word ? ' selected' : ''}${matched ? ' matched' : ''}${wrongPair && wrongPair.word === word ? ' wrong' : ''}`}
                onClick={() => handleWordClick(word)}
              >
                {word.name}
              </div>
            );
          })}
        </div>
      </div>
      {percent === 100 && <div className="congrats">Congratulations! All matched!</div>}
    </div>
  );
} 