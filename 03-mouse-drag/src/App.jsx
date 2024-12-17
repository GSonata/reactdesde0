import './App.css'
import { useEffect, useState } from 'react'

const FollowMouse = () => {
  const [enabled, changeState] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const changeButton = () => {
    const newState = enabled ? false : true
    changeState(newState)
  }
  useEffect(() => {
    console.log("efecto")

    const handleMove = (event) => {
      const { clientX, clientY } = event
      console.log('handlemove: ', { clientX, clientY })
      setPosition({ x: clientX, y: clientY })
    }
    if (enabled) {
      window.addEventListener("pointermove", handleMove)
    }

    //limpieza cuando el componente se desmonta
    return () => {
      console.log("cleanUp")
      window.removeEventListener("pointermove", handleMove)
    }
  }, [enabled])

  useEffect(() => {
    document.body.classList.toggle("no-cursor", enabled)

    return () => {
      document.body.classList.remove("no-cursor", !enabled)
    }
  }, [enabled])

  return (
    <>
      <div style={{
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        border: '1px solid #fff',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -25,
        top: -25,
        width: 50,
        height: 50,
        transform: `translate(${position.x}px, ${position.y}px)`
      }} />

      <button onClick={changeButton}> {enabled ? "Desactivar" : "Activar"}</button>
    </>)
}

function App() {
  return (
    <main>
      <FollowMouse />
    </main>
  )
}

export default App
