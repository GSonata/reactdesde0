import { useState, useEffect } from "react"
import './App.css'
import { useCatImage } from "./hooks/useCatImage"
import { useCatFact } from "./hooks/usetCatFact"
import { Otro } from "./components/otro"

export function App() {
    const {fact, getFactAndUpdate} = useCatFact()
    const {imageUrl} = useCatImage({fact})

    const handleClick = async () => {
        getFactAndUpdate()
    }

    return (
        <main>
            <h1>App de gatitos</h1>
            <button onClick={handleClick}>NEW FACT!</button>
            <section>
            {fact && <p>{fact}</p>}
            {imageUrl && <img width="500" height="500" src={imageUrl} alt={`Image extratected using the first three words of ${fact}`}/>}
            </section>
        </main>

    )
}