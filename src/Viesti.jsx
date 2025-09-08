import './App.css'
import React,{useState} from 'react'

const Laskuri = (props) => {
    
const [luku, setLuku] = useState(0)

    return (
        <>
            <h3>{luku}</h3>

            <button onClick={(props) => setLuku(luku + 1)}>+</button>


            <button onClick={props.huomio}>huomio</button>

        </>
    )
}
export default Laskuri