import React, { useState } from 'react';
import { GroupBox, Button } from '../Win95Components';

const GamesWindow = () => {
  const [clickCount, setClickCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameActive, setGameActive] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState('');
  const [guessResult, setGuessResult] = useState('');
  const [guessCount, setGuessCount] = useState(0);

  const startClickGame = () => {
    setClickCount(0);
    setTimeLeft(10);
    setGameActive(true);
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameActive(false);
          if (clickCount > highScore) {
            setHighScore(clickCount);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleClick = () => {
    if (gameActive) {
      setClickCount(clickCount + 1);
    }
  };

  const handleGuess = () => {
    const userGuess = parseInt(guess);
    setGuessCount(guessCount + 1);
    
    if (userGuess === randomNumber) {
      setGuessResult(`🎉 Correct! You got it in ${guessCount + 1} tries!`);
    } else if (userGuess < randomNumber) {
      setGuessResult('📈 Too low! Try higher.');
    } else {
      setGuessResult('📉 Too high! Try lower.');
    }
  };

  const resetGuessGame = () => {
    setRandomNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setGuessResult('');
    setGuessCount(0);
  };

  return (
    <div style={{ height: '100%', overflow: 'auto' }}>
      <h3 style={{ marginTop: 0, marginBottom: 16, color: '#000080' }}>
        🎮 Mini Games
      </h3>
      
      <GroupBox label="Click Speed Test" style={{ marginBottom: 16 }}>
        <div style={{ padding: 16, textAlign: 'center' }}>
          <p>How many times can you click in 10 seconds?</p>
          
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>
              Clicks: <span style={{ color: '#000080', fontWeight: 'bold' }}>{clickCount}</span>
            </div>
            <div style={{ fontSize: 18 }}>
              Time: <span style={{ color: gameActive ? '#FF0000' : '#008000' }}>{timeLeft}s</span>
            </div>
          </div>

          <Button 
            onClick={gameActive ? handleClick : startClickGame}
            style={{ 
              fontSize: 16, 
              padding: '12px 24px',
              backgroundColor: gameActive ? '#FFD700' : undefined
            }}
          >
            {gameActive ? '🖱️ CLICK ME!' : '🎯 Start Game'}
          </Button>

          {highScore > 0 && (
            <div style={{ 
              marginTop: 12, 
              padding: 8, 
              background: '#f0f0f0', 
              border: '1px inset #c0c0c0' 
            }}>
              🏆 High Score: {highScore} clicks
            </div>
          )}
        </div>
      </GroupBox>

      <GroupBox label="Number Guessing Game" style={{ marginBottom: 16 }}>
        <div style={{ padding: 16 }}>
          <p>I'm thinking of a number between 1 and 100. Can you guess it?</p>
          
          <div style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
              <input
                type="number"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                placeholder="Enter your guess"
                min="1"
                max="100"
                style={{
                  padding: 4,
                  border: '1px inset #c0c0c0',
                  fontFamily: 'MS Sans Serif',
                  fontSize: 11
                }}
              />
              <Button onClick={handleGuess} disabled={!guess}>
                🎯 Guess
              </Button>
            </div>
            
            <Button onClick={resetGuessGame} size="sm">
              🔄 New Game
            </Button>
          </div>

          {guessResult && (
            <div style={{ 
              padding: 8, 
              background: guessResult.includes('Correct') ? '#90EE90' : '#FFE4B5',
              border: '1px inset #c0c0c0',
              marginBottom: 8
            }}>
              {guessResult}
            </div>
          )}

          <div style={{ fontSize: 10, color: '#666' }}>
            Attempts: {guessCount}
          </div>
        </div>
      </GroupBox>

      <GroupBox label="Memory Pattern" style={{ marginBottom: 16 }}>
        <div style={{ padding: 16, textAlign: 'center' }}>
          <p>Coming soon! A memory pattern game where you repeat sequences.</p>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: 8, 
            maxWidth: 150, 
            margin: '0 auto' 
          }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
              <Button 
                key={num}
                style={{ 
                  width: 40, 
                  height: 40, 
                  fontSize: 12,
                  opacity: 0.5
                }}
                disabled
              >
                {num}
              </Button>
            ))}
          </div>
          <p style={{ fontSize: 10, color: '#666', marginTop: 12 }}>
            🚧 Under construction
          </p>
        </div>
      </GroupBox>

      <div style={{ 
        marginTop: 20, 
        padding: 12, 
        background: '#f0f0f0', 
        border: '1px inset #c0c0c0',
        textAlign: 'center'
      }}>
        <p style={{ margin: 0, fontSize: 10, color: '#666' }}>
          🎮 These mini-games showcase interactive React components and state management!
        </p>
      </div>
    </div>
  );
};

export default GamesWindow; 