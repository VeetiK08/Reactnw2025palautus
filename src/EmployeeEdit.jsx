import './App.css'
import React,{useState} from 'react'
import EmployeeService from './services/Employee'
import Employee from './Employee'
import { eventWrapper } from '@testing-library/user-event/dist/utils'


const EmployeeEdit = ({setMuokkaustila, setIsPositive, setMessage, setShowMessage, muokattavaEmployee}) => {
    

const [lastName, setLastName] = useState(muokattavaEmployee.lastName)
const [firstName, setFirstName] = useState(muokattavaEmployee.firstName)
const [title, setTitle] = useState(muokattavaEmployee.title || '')
const [titleOfCourtesy, setTitleOfCourtesy] = useState(muokattavaEmployee.titleOfCourtesy || '')
const [birthDate, setBirthDate] = useState(muokattavaEmployee.birthDate ? muokattavaEmployee.birthDate.slice(0,10) : '')
const [hireDate, setHireDate] = useState(muokattavaEmployee.hireDate ? muokattavaEmployee.hireDate.slice(0,10) : '')
const [address, setAddress] = useState(muokattavaEmployee.address || '')
const [city, setCity] = useState(muokattavaEmployee.city || '')
const [region, setRegion] = useState(muokattavaEmployee.region || '')
const [postalCode, setPostalCode] = useState(muokattavaEmployee.postalCode || '')
const [country, setCountry] = useState(muokattavaEmployee.country || '')
const [homePhone, setHomePhone] = useState(muokattavaEmployee.homePhone || '')
const [extension, setExtension] = useState(muokattavaEmployee.extension || '')
const [notes, setNotes] = useState(muokattavaEmployee.notes || '')
const [imageLink, setImageLink] = useState(muokattavaEmployee.imageLink || "")
const [imagePreview, setImagePreview] = useState(muokattavaEmployee.imageLink || null)

const handleFileChange = (event) => {
const file = event.target.files[0]
if (!file) return
if (file.type !== "image/png") {
setMessage("Vain PNG-kuvat sallittu")
setIsPositive(false)
setShowMessage(true)
return
}

const reader = new FileReader()
reader.onloadend = () => {
setImageLink(reader.result)
setImagePreview(reader.result)
}
reader.readAsDataURL(file)
}

const handleSubmit = (event) => {
    event.preventDefault()
    var newEmployee = {
        employeeId: muokattavaEmployee.employeeId,
        lastName,
        firstName,
        title,
        titleOfCourtesy,
        birthDate: birthDate ? new Date(birthDate) : null,
        hireDate: hireDate ? new Date(hireDate) : null,
        address,
        city,
        region,
        postalCode,
        country,
        homePhone,
        extension,
        notes,
        imageLink
}

EmployeeService.update(newEmployee)
.then(response => {
    if (response.status === 200) {
        setMessage("Edited customer " + newEmployee.lastName + " " + newEmployee.firstName)
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
})}

    return (
        <div id="edit">
            <h2>Employee Edit</h2>

            <form onSubmit={(event) => handleSubmit(event)}> 
        <div className="formWrapper">
            <label className="labelEditEmployee">Employee Id</label>
            <input className="inputEditEmployee" type="text" value={muokattavaEmployee.employeeId} disabled />
        </div>

        <div className="formWrapper">
            <label className="labelEditEmployee">Last Name</label>
            <input className="inputEditEmployee" type="text" value={lastName} onChange={({ target }) => setLastName(target.value)} required />
        </div>

        <div className="formWrapper">
            <label className="labelEditEmployee">First Name</label>
            <input className="inputEditEmployee" type="text" value={firstName} onChange={({ target }) => setFirstName(target.value)} required />
        </div>

        <div className="formWrapper">
            <label className="labelEditEmployee">Title</label>
            <input className="inputEditEmployee" type="text" value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>

        <div className="formWrapper">
            <label className="labelEditEmployee">Title of Courtesy</label>
            <input className="inputEditEmployee" type="text" value={titleOfCourtesy} onChange={({ target }) => setTitleOfCourtesy(target.value)} />
        </div>

        <div className="formWrapper">
            <label className="labelEditEmployee">Birth Date</label>
            <input className="inputEditEmployee" type="date" value={birthDate} onChange={({ target }) => setBirthDate(target.value)} />
        </div>

        <div className="formWrapper">
            <label className="labelEditEmployee">Hire Date</label>
            <input className="inputEditEmployee" type="date" value={hireDate} onChange={({ target }) => setHireDate(target.value)} />
        </div>

        <div className="formWrapper">
            <label className="labelEditEmployee">Address</label>
            <input className="inputEditEmployee" type="text" value={address} onChange={({ target }) => setAddress(target.value)} />
        </div>

        <div className="formWrapper">
            <label className="labelEditEmployee">City</label>
            <input className="inputEditEmployee" type="text" value={city} onChange={({ target }) => setCity(target.value)} />
        </div>

        <div className="formWrapper">
            <label className="labelEditEmployee">Region</label>
            <input className="inputEditEmployee" type="text" value={region} onChange={({ target }) => setRegion(target.value)} />
        </div>

        <div className="formWrapper">
            <label className="labelEditEmployee">Postal Code</label>
            <input className="inputEditEmployee" type="text" value={postalCode} onChange={({ target }) => setPostalCode(target.value)} />
        </div>

        <div className="formWrapper">
            <label className="labelEditEmployee">Country</label>
            <input className="inputEditEmployee" type="text" value={country} onChange={({ target }) => setCountry(target.value)} />
        </div>

        <div className="formWrapper">
            <label className="labelEditEmployee">Home Phone</label>
            <input className="inputEditEmployee" type="text" value={homePhone} onChange={({ target }) => setHomePhone(target.value)} />
        </div>

        <div className="formWrapper">
            <label className="labelEditEmployee">Extension</label>
            <input className="inputEditEmployee" type="text" value={extension} onChange={({ target }) => setExtension(target.value)} />
        </div>

        <div className="formWrapper">
            <label className="labelEditEmployee">Notes</label>
            <textarea className="inputEditEmployee" value={notes} onChange={({ target }) => setNotes(target.value)} />
        </div>

        <div class='formWrapper'>
        <label className="labelEditEmployee">Image</label>
        <input
            className="inputEditEmployee"
            type="text"
            readOnly
            placeholder="Select Image file"
            value={imagePreview ? "Image selected" : ""}
            onClick={() => document.getElementById("fileInput").click()}
        />
        <input type="file" id="fileInput" style={{ display: "none" }} onChange={handleFileChange} />
        </div>

        <input type="submit" value="Save" />
        <input type="button" value="Back" onClick={() => setMuokkaustila(false)} />
        </form>
            
        </div>
    )
}
export default EmployeeEdit