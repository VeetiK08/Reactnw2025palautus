import React,{useState, useEffect} from 'react'
import './App.css'
import Laskuri from './Laskuri'
import Viesti from './Viesti'
import Posts from './Posts'
import CustomerList from './CustomerList'
import UserList from './UserList'
import ProductList from './ProductList'
import EmployeeList from './EmployeeList'
import Message from './Message'
import Login from './Login'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

const App = () => {

//const [x, setX] = useState("")
const [showLaskuri, setShowLaskuri] = useState(false)
//Messagen useStatet
const [showMessage, setShowMessage] = useState(false)
const [message, setMessage] = useState('')
const [isPositive, setIsPositive] = useState(true)
const [loggedInUser, setLoggedInUser] = useState('')
const [accessLevelId, setAccessLevelId] = useState(null)  // userin näyttöä varten

// const huomio = () => {
//   alert("Huomio!")
// }

/* if (showLaskuri === true)
{
  return(
   <div className="App">
      <h1>Hello from React!</h1>

      {showLaskuri && <Laskuri huomio={huomio} />}
    </div>
  )
} */

useEffect(() => {
let storedUser = localStorage.getItem("userName")
let storedAccessId = localStorage.getItem("accessLevelId") // userin näyttöä varten
if (storedUser !== null) {
  setLoggedInUser(storedUser)
}
 if (storedAccessId !== null) {
    setAccessLevelId(parseInt(storedAccessId))
}},[])


// Logout napin tapahtumankäsittelijä
const logout = () => {
  localStorage.clear()
  setLoggedInUser('')
  setAccessLevelId(null)
}

  return (
    <div className="App">
  {!loggedInUser &&  <Login setMessage={setMessage} setIsPositive={setIsPositive} 
                setShowMessage={setShowMessage} setLoggedInUser={setLoggedInUser} setAccessLevelId={setAccessLevelId}/>}

     {loggedInUser && 
      <Router>        
          <Navbar bg="dark" variant="dark">
            <Nav className="mr-auto">
              <Link to={'/'} className='nav-link'>Home</Link>
              <Link to={'/Customers'} className='nav-link'>Customers</Link>
              <Link to={'/Employees'} className='nav-link'>Employees</Link>
              {accessLevelId === 2 && (<Link to={'/Users'} className='nav-link'>Users</Link>)}
              <Link to={'/Products'} className='nav-link'>Products</Link>
              <Link to={'/Laskuri'} className='nav-link'>Laskuri</Link>
              <Link to={'/Posts'} className='nav-link'>Typicode posts</Link>
              <button onClick={() => logout()}>Logout</button>
            </Nav>
          </Navbar>
          
          <h2>Northwind Traders</h2>

          {showMessage && <Message message={message} isPositive={isPositive} />}

          <Routes>
                <Route path="/Customers" element={ <CustomerList setMessage={setMessage} setIsPositive={setIsPositive} 
                setShowMessage={setShowMessage} />}/>

                <Route path="/Employees" element={ <EmployeeList setMessage={setMessage} setIsPositive={setIsPositive} 
                setShowMessage={setShowMessage} />}/>
                {accessLevelId === 2 && (
                  <Route path="/Users" element={ <UserList setMessage={setMessage} setIsPositive={setIsPositive} 
                  setShowMessage={setShowMessage} />}/>
                )}
                <Route path="/Products" element={ <ProductList setMessage={setMessage} setIsPositive={setIsPositive} 
                setShowMessage={setShowMessage} />}/>

                <Route path="/Laskuri" element={ <Laskuri />}/>
                <Route path="/Posts" element={ <Posts />}/>

          </Routes>
      </Router>
    }
    </div>
  )
}

export default App
