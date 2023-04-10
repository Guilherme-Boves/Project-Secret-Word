//React
import {useCallback, useEffect, useState} from 'react'

//Data
import {wordsList} from "./data/word"

//CSS
import './App.css';

//Components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"}
]

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  const [pickedWord, setePickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([])

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(3)
  const [score, setScore] = useState(0)

  const pickWordAndCategory = () => {
    //Pick a random category
    const categories = Object.keys(words)
    //const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    const category = categories[Math.floor(Math.random() * categories.length)] 
    
    //Pick a random word
    const word = words[category][Math.floor(Math.random() * words[category].length)]
    
    return { word, category }
  }

  //Start Secret Word Game
  const startGame = () => {
    //Pick word and pick category
    const {word, category } = pickWordAndCategory()

    //Create an array of letters
    let wordLetters = word.split("")

    wordLetters = wordLetters.map((letter) => letter.toLowerCase())
    
    console.log(word, category)
    console.log(wordLetters)

    //fill states
    setPickedCategory(category)
    setePickedWord(word)
    setLetters(wordLetters)

    setGameStage(stages[1].name)
  }

  // Process the letter input
  const verifyLetter = (letter) => {
    
    const normalizedLetter = letter.toLowerCase();

    // check if letter has already been utilized
    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)){
      return;
    }

    //Push guessed letter or remove a guess
    if(letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters, normalizedLetter
      ]);
    }

    console.log(guessedLetters)
    console.log(wrongLetters)
  }

  // Retry
  const retry = () => {
    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame}/>}
      {gameStage === 'game' && (
        <Game 
          verifyLetter={verifyLetter} 
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === 'end' && <GameOver retry={retry} />}
    </div>
  );
}

export default App;
