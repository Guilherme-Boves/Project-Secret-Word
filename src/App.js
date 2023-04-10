//React
import {useCallback, useEffect, useState} from 'react'

//Data
import {wordsList} from "./data/word"

//Components
import StartScreen from './components/StartScreen';

//CSS
import './App.css';

const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"}
]

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name)

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen />}
      {gameStage === 'game' && <StartScreen />}
      {gameStage === 'end' && <StartScreen />}
    </div>
  );
}

export default App;
