import './App.css'
import React,{useState} from 'react'
import CustomerService from './services/Customer'

// Customer on propsin nimi
const Customer = ({customer, editCustomer, setIsPositive, setMessage, setShowMessage, reload, reloadNow}) => {
    
// Tilan määritys
const [showDetails, setShowDetails] = useState(false)

//Poisto funktio
const deleteCustomer = (customer) => {
    let vastaus = window.confirm(`Remove Customer: ${customer.companyName}`)

    if (vastaus === true) {
    /* alert("Remove Request was verified") */
    CustomerService.remove(customer.customerId)
    .then(res => {
        if (res.status === 200) {
            setMessage(`Removed Customer: ${customer.companyName}`)
            setIsPositive(true)
            setShowMessage(true)
            window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert

            setTimeout(() => {
                setShowMessage(false)
            }, 5000
        )
            reloadNow(!reload)
        }
    }
    )
    .catch(error => {
        setMessage(error)
        setIsPositive(false)
        setShowMessage(true)
        window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert

        setTimeout(() => {
        setShowMessage(false)
        }, 6000)
    })

    
    }
    else{
        setMessage('Poisto peruttu onsituneesti')
        setIsPositive(true)
        setShowMessage(true)
        window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert

        setTimeout(() => {
                setShowMessage(false)
            }, 5000
        )
    }
}

return (
        <div className='customerDiv'>
            <h4 onClick={() => setShowDetails(!showDetails)}>
                    {customer.companyName}, {customer.country}
                </h4>

            {showDetails && <div className='customerDetails'>
                <div class='detailbButtonsAndName'>
                <h3>{customer.companyName}</h3>

                <button onClick={() => deleteCustomer(customer)}>Delete</button>
                <button onClick={() => editCustomer(customer)}>Edit</button>
                </div>

                <table>
                <thead>
                    <tr>
                        <th>Contact person</th>
                        <th>Phone</th>
                        <th>Adress</th>
                        <th>City</th>
                        <th>Country</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{customer.contactName}</td>
                        <td>{customer.phone}</td>
                        <td>{customer.address}</td>
                        <td>{customer.city}</td>
                        <td>{customer.country}</td>
                    </tr>
                </tbody>
            
        </table></div>}
        
    </div>
    )
}
export default Customer