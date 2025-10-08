import './App.css'
import React,{useState} from 'react'
import UserService from './services/User'
import md5 from 'md5'



const UserAdd = ({setLisäystila, setIsPositive, setMessage, setShowMessage}) => {
    

const [newFirstname, setNewFirstname] = useState('')
const [newLastname, setNewLastname] = useState('')
const [newEmail, setNewEmail] = useState('')
const [newAccessLevelId, setNewAccessLevelId] = useState(2)
const [newUsername, setNewUsername] = useState('')
const [newPassword, setNewPassword] = useState('')
const [confirmPassword, setConfirmPassword] = useState('') // salasanan varmistus
const [passwordsMatch, setPasswordsMatch] = useState(true)

const handlePasswordChange = (value) => {
    setNewPassword(value)
    setPasswordsMatch(value === confirmPassword)
}

const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value)
    setPasswordsMatch(newPassword === value)
}

const handleSubmit = (event) => {
    event.preventDefault()

    if (!passwordsMatch) {
        setMessage("Passwords do not match!")
        setIsPositive(false)
        setShowMessage(true)
        return
    }

    const newUser = {
        firstName: newFirstname,
        lastName : newLastname,
        userName : newUsername,
        email : newEmail,
        accessLevelId : parseInt(newAccessLevelId),
        password: md5(newPassword)
    }

    console.log(newUser)

    UserService.create(newUser)
    .then(response => {
        if (response.status === 200) {
            setMessage(`Added new user: ${newUser.firstName} ${newUser.lastName}`)
            setIsPositive(true)
            setShowMessage(true)

            //ppilottaa ilmoituksen
            setTimeout(() => {
                setShowMessage(false)
            }, 5000)

            setLisäystila(false)
        }
    })
   .catch(error => {
    const errMsg = error.response?.data?.message || error.message || 'Unknown error';
    setMessage(errMsg);
    setIsPositive(false);
    setShowMessage(true);
    setTimeout(() => {
        setShowMessage(false);
    }, 6000);
})

    
}

    return (
        <div id="addNew">
            <h2>User Add</h2>

            <form onSubmit={(event) => handleSubmit(event)}> 

                <div>
                    <input type='text' value={newFirstname} placeholder='First name' onChange={({target}) => setNewFirstname(target.value)} required/>    
                </div>
                <div>
                    <input type='text' value={newLastname} placeholder='Last name' onChange={({target}) => setNewLastname(target.value)} required/>  
                </div>
                <div>
                    <input type='text' value={newEmail} placeholder='Email' onChange={({target}) => setNewEmail(target.value)} />
                </div>
                <div>
                    <input type='text' value={newAccessLevelId} placeholder='Access level' onChange={({target}) => setNewAccessLevelId(target.value)} required/>
                </div>
                <div>
                    <input type='text' value={newUsername} placeholder='Username' onChange={({target}) => setNewUsername(target.value)} required/> 
                </div>
                <div> 
                    <input type='password' value={newPassword} placeholder='Password' onChange={({target}) => handlePasswordChange(target.value)} required/>
                </div>
                <div> 
                    <input type='password' value={confirmPassword} placeholder='Confirm Password' onChange={({target}) => handleConfirmPasswordChange(target.value)} required/>
                </div>
                {!passwordsMatch && <div style={{ color: 'red'}}>Passwords do not match!</div>} {/*tein <p>:n sijaan <div>*/}
                <input type="submit" value='save'/>
                <input type="button" value='back' onClick={() => setLisäystila(false)}/>
            </form>
            
        </div>
    )
}
export default UserAdd