import "./index.css"
import { useState } from "react";
import confetti from "canvas-confetti";
import { Square } from "./compontents/square";
import { TURNS} from "./constant/Constants";
import { checkWinner, checkEndGame } from "./logic/board";
import { WinnerModal } from "./compontents/WinnerModal"

function App() {

  const [board, setBoard] = useState(()=>{
    const boardFromStorage = window.localStorage.getItem("board")
    return boardFromStorage != null 
    ? JSON.parse(boardFromStorage) 
    : Array(9).fill(null)
  })

  const [turn, setTurn] = useState(()=>{
    const turnFromStorage = window.localStorage.getItem("turn")
    return turnFromStorage != null 
    ? JSON.parse(turnFromStorage) 
    : Array(9).fill(null)
  })

  const [winner, setWinner] = useState(null)


  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    window.localStorage.removeItem("board")
    window.localStorage.removeItem("turn")
  }


  const updateBoard = (index) => {
    //primero checkeamos si el tablero esta vacio o no
    if(board[index] || winner ) return 

    //actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    //cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn);

    //guardar partida
    window.localStorage.setItem("board", JSON.stringify(newBoard))
    window.localStorage.setItem("turn", JSON.stringify(newTurn))


    //revisar si hay ganador
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)        
    } else if (checkEndGame(newBoard)){
      setWinner(false)
    }
  }

  return (
    <main className='board'>
    <h1>Tic Tac Toe</h1>
    <button onClick={resetGame}>Volver a empezar</button>
    <section className="game">
      {
        board.map((_,index)=>{
          return(
            <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
          )
        })
      }
    </section>
    <section className="turn">
      <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
      <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
    </section>

    <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
)}

export default App
