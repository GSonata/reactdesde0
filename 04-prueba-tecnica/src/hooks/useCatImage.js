import { useEffect, useState } from "react"

export function useCatImage ({ fact }) {
    const [imageUrl, setImageUrl] = useState()

    useEffect(()=>{
        if(!fact) return

        const firstWords = fact.split(' ',3).join(' ')

        fetch(`https://cataas.com/cat/cute/says/${firstWords}`,{
            headers : {
                "Accept" : "application/json"
            },
        })
        .then(res => res.json())
        .then (response =>{
            console.log(response)
            const { _id : imageUrl } = response
            setImageUrl(
              `https://cataas.com/cat/says/${firstWords}?fontColor=white&id=${imageUrl}`
            )
        }
    )},[fact])

    return { imageUrl } 
}