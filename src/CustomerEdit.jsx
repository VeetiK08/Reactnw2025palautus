import './App.css'
import React,{useState} from 'react'
import CustomerService from './services/Customer'
import Customer from './Customer'
import { eventWrapper } from '@testing-library/user-event/dist/utils'


const CustomerEdit = ({setMuokkaustila, setIsPositive, setMessage, setShowMessage, muokattavaCustomer}) => {
    

const [newCustomerId, setNewCustomerId] = useState(muokattavaCustomer.customerId)
const [newCompanyName, setNewCompanyName] = useState(muokattavaCustomer.companyName)
const [newContactName, setNewContactName] = useState(muokattavaCustomer.contactName)
const [newContactTitle, setNewContactTitle] = useState(muokattavaCustomer.contactTitle)

const [newCountry, setNewCountry] = useState(muokattavaCustomer.country)
const [newAddress, setNewAdress] = useState(muokattavaCustomer.address)
const [newCity, setNewCity] = useState(muokattavaCustomer.city)

const [newPostalCode, setNewPostalCode] = useState(muokattavaCustomer.postalCode)
const [newPhone, setNewPhone] = useState(muokattavaCustomer.phone)
const [newFax, setNewFax] = useState(muokattavaCustomer.fax)
// const [newRegion, setNewRegion] = useState(muokattavaCustomer.region)

const handleSubmit = (event) => {
    event.preventDefault()
    var newCustomer = {
        customerId: newCustomerId,
        companyName : newCompanyName,
        contactName : newContactName,
        contactTitle : newContactTitle,
        country : newCountry,
        address : newAddress,
        city : newCity,
        postalCode : newPostalCode,
        phone : newPhone,
        fax: newFax
    }

    CustomerService.update(newCustomer)
    .then(response => {
        if (response.status === 200) {
            setMessage("Edited customer " + newCustomer.companyName)
            setIsPositive(true)
            setShowMessage(true)

            //piilottaa ilmoituksen
            setTimeout(() => {
                setShowMessage(false)
            }, 5000)

            setMuokkaustila(false)
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
        <div id="edit">
            <h2>Customer Edit</h2>

            <form onSubmit={(event) => handleSubmit(event)}> 

                <div class='formWrapper'> 
                    <label class='labelEdit'>Customer Id</label>
                    <input class='inputEdit' type='text' value={newCustomerId} disabled/>    
                </div>
                <div class='formWrapper'>
                    <label class='labelEdit'>Company Name</label>
                    <input class='inputEdit' type='text' value={newCompanyName} onChange={({target}) => setNewCompanyName(target.value)} required/>
                </div>
                <div class='formWrapper'>
                    <label class='labelEdit'>Contact Person</label>
                    <input class='inputEdit' type='text' value={newContactName} onChange={({target}) => setNewContactName(target.value)}/>
                </div>
                {/* <div>
                     <input type='text' value={newContactTitle} placeholder='Contact Person' onChange={({target}) => setNewContactTitle(target.value)}/>
                </div> */}
                <div class='formWrapper'>
                    <label class='labelEdit'>Contact Title</label>
                    <input class='inputEdit' type='text' value={newContactTitle} onChange={({target}) => setNewContactTitle(target.value)}/>
                </div>
                <div class='formWrapper'>
                    <label class='labelEdit'>Address</label>
                    <input class='inputEdit' type='text' value={newAddress} onChange={({target}) => setNewAdress(target.value)}/> 
                </div>
                <div class='formWrapper'> 
                    <label class='labelEdit'>City</label>
                    <input class='inputEdit' type='text' value={newCity} onChange={({target}) => setNewCity(target.value)}/>
                </div>
                {/* <div>
                     <input type='text' value={newRegion} onChange={({target}) => setNewRegion(target.value)} placeholder='Region'/>
                </div> */} 
                <div class='formWrapper'>
                    <label class='labelEdit'>Phone</label>
                     <input class='inputEdit' type='text' value={newPhone} onChange={({target}) => setNewPhone(target.value)}/>
                </div>  
                <div class='formWrapper'>
                    <label class='labelEdit'>Postal Code</label>
                     <input class='inputEdit' type='text' value={newPostalCode} onChange={({target}) => setNewPostalCode(target.value)}/>
                </div>
                <div class='formWrapper'>
                    <label class='labelEdit'>Country</label>
                     <input class='inputEdit' type='text' value={newCountry} onChange={({target}) => setNewCountry(target.value)}/>
                </div>
                <div class='formWrapper'>
                    <label class='labelEdit'>Fax</label>
                    <input class='inputEdit' type='text' value={newFax} onChange={({target}) => setNewFax(target.value)}/>
                </div>

                <input type="submit" value='save'/>
                <input type="button" value='back' onClick={() => setMuokkaustila(false)}/>
            </form>
            
        </div>
    )
}
export default CustomerEdit