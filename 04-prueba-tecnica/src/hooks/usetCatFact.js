import { useState, useEffect } from "react"
import { getRandomFact } from "../services/facts"

export function useCatFact() {
    const [fact, setFact] = useState()

    const getFactAndUpdate = () => {
        getRandomFact().then(newFact => setFact(newFact))
    }

    useEffect(getFactAndUpdate, [])

    return { fact, getFactAndUpdate }
}