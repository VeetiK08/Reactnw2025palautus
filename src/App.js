import React,{useState} from 'react'
import './App.css'
import Laskuri from './Laskuri'
import Viesti from './Viesti'
import Posts from './Posts'
import CustomerList from './CustomerList'

const App = () => {

//const [x, setX] = useState("")
const [showLaskuri, setShowLaskuri] = useState(false)

const huomio = () => {
  alert("Huomio!")
}

/* if (showLaskuri === true)
{
  return(
   <div className="App">
      <h1>Hello from React!</h1>

      {showLaskuri && <Laskuri huomio={huomio} />}
    </div>
  )
} */

  return (
    <div className="App">
      <h1>Hello from React!</h1>

      <CustomerList/>
      
      {/* <Posts />

      {showLaskuri && <Laskuri huomio={huomio} />} */}

      {/*{showLaskuri === true? <Laskuri huomio={huomio}/> : null} */}

     {/* {showLaskuri && <button onClick={() => setShowLaskuri(!showLaskuri)}>Piilota laskuri</button>}
      
      {!showLaskuri && <button onClick={() => setShowLaskuri(!showLaskuri)}>Näytä laskuri</button>}
      
      <Laskuri />
      <Viesti teksti="tervehdys app komponentista" /> */}

    </div>
  )
}

export default App
