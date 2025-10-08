import './App.css'
import React,{useState, useEffect} from 'react'
import CustomerService from './services/Customer'
import Customer from './Customer'
import CustomerAdd from './CustomerAdd'
import CustomerEdit from './CustomerEdit'


const CustomerList = ({setIsPositive, setShowMessage, setMessage}) => {
    
const [customers, setCustomers] = useState([])
const [showCustomers, setShowCustomers] = useState(false)
const [lisäystila, setLisäystila] = useState(false)
const [muokkaustila, setMuokkaustila] = useState(false)
const [reload, reloadNow]  = useState(false)
const [muokattavaCustomer, setMuokattavaCustomer] = useState(false)
const [search, setSearch] = useState("")

useEffect(() => {
    const token = localStorage.getItem('token')
    CustomerService.setToken(token)
    
    CustomerService.getAll()
        .then(data => setCustomers(data))
}, [lisäystila, reload, muokkaustila])

const handleSearchInputChange = (event) => {
    setShowCustomers(true)
    setSearch(event.target.value.toLowerCase())
}

const editCustomer = (customer) => {
    setMuokattavaCustomer(customer)
    setMuokkaustila(true)
}

    return (
        <>

            <h1><nobr style={{ cursor: 'pointer'}}
                onClick={() => setShowCustomers(!showCustomers)}> Customers</nobr>

                
                {!lisäystila && <button className="nappi" onClick={() => setLisäystila(true)}>Add new</button>}</h1>

                {!lisäystila && !muokkaustila && <input placeholder='Search via Compsny name' value={search} onChange={handleSearchInputChange}/>}
                {lisäystila && <CustomerAdd setLisäystila={setLisäystila} setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}/>}

                {!lisäystila && muokkaustila && <CustomerEdit setMuokkaustila={setMuokkaustila}
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                muokattavaCustomer={muokattavaCustomer}
                />}

            {/* <h2 onClick={() => setShowCustomers(!showCustomers)}>Customers</h2> */}


                {
                    !lisäystila && !muokkaustila && showCustomers && customers && customers.map(c =>
                    {
                        const lowerCaseName = c.companyName.toLowerCase()
                        if (lowerCaseName.indexOf(search) > -1) {
                            return(
                     <Customer key={c.customerId} customer={c} reloadNow={reloadNow} reload={reload}
                     setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                     editCustomer={editCustomer}
                     />  
                    )
                    }
                    }
                )
            }
            
        </>
    )
}
export default CustomerList