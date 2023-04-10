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
  const verifyLetter = () => {
    setGameStage(stages[2].name)
  }

  // Retry
  const retry = () => {
    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame}/>}
      {gameStage === 'game' && <Game verifyLetter={verifyLetter} />}
      {gameStage === 'end' && <GameOver retry={retry} />}
    </div>
  );
}

export default App;
