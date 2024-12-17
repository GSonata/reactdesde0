import { useCatImage } from "../hooks/useCatImage";

export function Otro (){
    const {imageUrl} = useCatImage({fact: 'Random Fact of the Day'})
    return(
        <>
        {imageUrl && <img src={imageUrl}/>}
        </>
    )
}