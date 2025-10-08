import './App.css'
import React,{useState} from 'react'
import CustomerService from './services/Customer'
import Customer from './Customer'
import { eventWrapper } from '@testing-library/user-event/dist/utils'


const CustomerAdd = ({setLisäystila, setIsPositive, setMessage, setShowMessage}) => {
    

const [newCustomerId, setNewCustomerId] = useState('')
const [newCompanyName, setNewCompanyName] = useState('')
const [newContactName, setNewContactName] = useState('')
const [newContactTitle, setNewContactTitle] = useState('')

const [newCountry, setNewCountry] = useState('')
const [newAddress, setNewAddress] = useState('')
const [newCity, setNewCity] = useState('')

const [newPostalCode, setNewPostalCode] = useState('')
const [newPhone, setNewPhone] = useState('')
const [newFax, setNewFax] = useState('')
// const [newRegion, setNewRegion] = useState('')

const handleSubmit = (event) => {
    event.preventDefault()
    var newCustomer = {
        customerId: newCustomerId.toUpperCase(),
        companyName : newCompanyName,
        contactName : newContactName,
        contactTitle : newContactTitle,
        country : newCountry,
        address: newAddress,
        city : newCity,
        postalCode : newPostalCode,
        phone : newPhone,
        fax: newFax
    }

    CustomerService.create(newCustomer)
    .then(response => {
        if (response.status === 200) {
            setMessage("Added new customer " + newCustomer.companyName)
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
        setMessage(error)
        setIsPositive(false)
        setShowMessage(true)
        setTimeout(() => {
        setShowMessage(false)
        }, 6000)
    })

    // setTimeout(() => {
    //     setLisäystila(false)
    // }, 500)
}

    return (
        <div id="addNewCust">
            <h2>Customer Add</h2>

            <form onSubmit={(event) => handleSubmit(event)}> 

                <div>
                    <input type='text' value={newCustomerId} placeholder='ID WITH 5 CAPITAL LETTERS' maxLength="5" minLength={"5"} onChange={({target}) => setNewCustomerId(target.value)} required/>    
                </div>
                <div>
                    <input type='text' value={newCompanyName} placeholder='Company Name' onChange={({target}) => setNewCompanyName(target.value)} required/>
                </div>
                <div>
                    <input type='text' value={newContactName} placeholder='Contact Person' onChange={({target}) => setNewContactName(target.value)}/>
                </div>
                {/* <div>
                     <input type='text' value={newContactTitle} placeholder='Contact Person' onChange={({target}) => setNewContactTitle(target.value)}/>
                </div> */}
                <div>
                    <input type='text' value={newContactTitle} placeholder='Contact Title' onChange={({target}) => setNewContactTitle(target.value)}/>
                </div>
                <div>
                    <input type='text' value={newAddress} placeholder='Address' onChange={({target}) => setNewAddress(target.value)}/> 
                </div>
                <div> 
                    <input type='text' value={newCity} placeholder='City' onChange={({target}) => setNewCity(target.value)}/>
                </div>
                {/* <div>
                     <input type='text' value={newRegion} onChange={({target}) => setNewRegion(target.value)} placeholder='Region'/>
                </div> */} 
                <div>
                     <input type='text' value={newPhone} placeholder='Phone' onChange={({target}) => setNewPhone(target.value)}/>
                </div>  
                <div>
                     <input type='text' value={newPostalCode} placeholder='Postal Code' onChange={({target}) => setNewPostalCode(target.value)}/>
                </div>
                <div>
                     <input type='text' value={newCountry} placeholder='Country' onChange={({target}) => setNewCountry(target.value)}/>
                </div>
                <div>
                    <input type='text' value={newFax} placeholder='Fax' onChange={({target}) => setNewFax(target.value)}/>
                </div>

                <input type="submit" value='save'/>
                <input type="button" value='back' onClick={() => setLisäystila(false)}/>
            </form>
            
        </div>
    )
}
export default CustomerAdd