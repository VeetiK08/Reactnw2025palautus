import './App.css'
import React,{useState, useEffect} from 'react'
import UserService from './services/User'
import UserAdd from './UserAdd'


const UserList = ({setIsPositive, setShowMessage, setMessage}) => {
    
const [users, setUsers] = useState([])
const [showCustomers, setShowCustomers] = useState(false)
const [lisäystila, setLisäystila] = useState(false)
const [muokkaustila, setMuokkaustila] = useState(false)
const [reload, reloadNow]  = useState(false)
const [muokattavaUser, setMuokattavaUser] = useState(false)
const [search, setSearch] = useState("")

useEffect(() => {
   UserService.getAll()
   .then(data => {
    setUsers(data)
   })
},[lisäystila, reload, muokkaustila]
)

const handleSearchInputChange = (event) => {
    setShowCustomers(true)
    setSearch(event.target.value.toLowerCase())
}

const editUser = (user) => {
    setMuokattavaUser(user)
    setMuokkaustila(true)
}

    return (
        <div class='formWrapper'>

            <h1 ><nobr> Users</nobr>
            {lisäystila && <UserAdd setLisäystila={setLisäystila}
            setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}/>}

                
                {!lisäystila && <button className="nappiUser" onClick={() => setLisäystila(true)}>Add new</button>}</h1>

                {!lisäystila && !muokkaustila && <input placeholder='Search via Last name' value={search} onChange={handleSearchInputChange}/>}

                {!lisäystila && !muokkaustila && 
                <table id="userTable" className="userTable">
                    <thead class="userListHeader">
                        <tr>
                            <th>Username</th>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Email</th>
                            <th>Accesslevel</th>
                        </tr>
                    </thead>
                    <tbody class="userListTable">
                        {users && users.map(u =>
                            {
                                const lowerCaseName = u.lastName.toLowerCase()
                                if (lowerCaseName.indexOf(search) > -1) {
                                    return(
                                        <tr key={u.userId}>
                                            <td>{u.userName}</td>
                                            <td>{u.firstName}</td>
                                            <td>{u.lastName}</td>
                                            <td>{u.email}</td>
                                            <td>{u.accessLevelId}</td>
                                        </tr>
                                    )
                                }
                            }
                        )}
                    </tbody>
                </table>}

            
        </div>
    )
}
export default UserList