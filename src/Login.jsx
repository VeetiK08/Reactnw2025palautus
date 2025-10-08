import './App.css'
import React, {useState} from 'react'
import LoginService from './services/Auth'
import md5 from 'md5'

const Login = ({setIsPositive, setMessage, setShowMessage, setLoggedInUser, setAccessLevelId}) => {

    // Määritetään komponentin tila
    // Id arvo määritellään tietokannassa suoraan
    // ei anneta itse sitä
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('') // Salasanan tupla checkaus
    const [passwordsMatch, setPasswordsMatch] = useState(true) // Onko salasanat samat

  // Salannan käsittely funktio
  const handlePasswordChange = (value) => {
    setPassword(value)
    setPasswordsMatch(value === confirmPassword)
  }

  // salasanan inputin muutoksen hyväksyminen
  const handleConfirmPasswordChange= (value) => {
    setConfirmPassword(value)
    setPasswordsMatch(password === value)
  }

    // onSubmit käsittely funktio
    const handleSubmit = (event) => {
        event.preventDefault()

        if (!passwordsMatch) {
          setMessage("Passwords do not match!")
          setIsPositive(false)
          setShowMessage(true)
          return
        }
        
        const userForAuth = {
            username : userName,
            password : md5(password) // salasanan salaus md5 kirjaston metodilla
        }

        // console.log(userForAuth) 

        LoginService.authenticate(userForAuth)
        .then(response => {
        if (response.status === 200) {

        localStorage.setItem("userName", response.data.username)
        localStorage.setItem("accessLevelId", response.data.accesslevelId)
        localStorage.setItem("token", response.data.token)
        
        // Asetetaan app komponentissa olevaan stateen
        setLoggedInUser(response.data.username)
        setAccessLevelId(response.data.accesslevelId)

       setMessage(`Logged in as: ${userForAuth.username}`)
       setIsPositive(true)
       setShowMessage(true)
      
       setTimeout(() => {
        setShowMessage(false)
       }, 5000)

    }
      })
      .catch(error => {
         const errorMessage =
        error.response?.data?.message || error.message || 'Tapahtui virhe';
        setMessage(errorMessage);
        setIsPositive(false)
        setShowMessage(true)

        setTimeout(() => {
          setShowMessage(false)
         }, 6000)
      })
    }

    // Kenttien tyhjennys
    const emptyFields = () => {
        setUserName("")
        setPassword("")
        setConfirmPassword("")
        setPasswordsMatch(true)
    } 


  return (
    <div id="loginWindow">
       <h2>Login</h2>

       <form onSubmit={handleSubmit}>
            <div>
                <input type="text" value={userName} placeholder="UserName"
                    onChange={({ target }) => setUserName(target.value)} />
            </div>
            <div>
                <input type="password" value={password} placeholder="Password"
                    onChange={({ target }) => handlePasswordChange(target.value)} />
            </div>
            <div>
                <input type="password" value={confirmPassword} placeholder="Confirm Password"
                    onChange={({ target }) => handleConfirmPasswordChange(target.value)} />
            </div>
            {!passwordsMatch && <div style={{color: 'red'}}>Passwords do not match!</div>}
         <input type='submit' value='Login' />
         <input type='button' value='Empty' onClick={() => emptyFields()} />
       </form>

    </div>
  )
}

export default Login