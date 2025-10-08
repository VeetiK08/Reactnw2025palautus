import './App.css'
import React,{useState} from 'react'
import EmployeeService from './services/Employee'
import Employee from './Employee'
import { eventWrapper } from '@testing-library/user-event/dist/utils'


const EmployeeAdd = ({setLisäystila, setIsPositive, setMessage, setShowMessage}) => {
    

const [lastName, setLastName] = useState('')
const [firstName, setFirstName] = useState('')
const [title, setTitle] = useState('')
const [titleOfCourtesy, setTitleOfCourtesy] = useState('')
const [birthDate, setBirthDate] = useState('')
const [hireDate, setHireDate] = useState('')
const [address, setAddress] = useState('')
const [city, setCity] = useState('')
const [region, setRegion] = useState('')
const [postalCode, setPostalCode] = useState('')
const [country, setCountry] = useState('')
const [homePhone, setHomePhone] = useState('')
const [extension, setExtension] = useState('')
const [notes, setNotes] = useState('')
const [imageLink, setImageLink] = useState('')
const [imagePreview, setImagePreview] = useState(null) 

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
    const newEmployee = {
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

    EmployeeService.create(newEmployee)
    .then(response => {
        if (response.status === 200) {
            setMessage("Added new Employee " + newEmployee.lastName + " " + newEmployee.firstName)
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
        <div id="addNewEmployee">
        <h2>Customer Add</h2>

        <form onSubmit={(event) => handleSubmit(event)}> 
            <div><input type="text" value={lastName} placeholder="Last Name" onChange={({ target }) => setLastName(target.value)} required /></div>

            <div><input type="text" value={firstName} placeholder="First Name" onChange={({ target }) => setFirstName(target.value)} required /></div>

            <div><input type="text" value={title} placeholder="Title" onChange={({ target }) => setTitle(target.value)} /></div>

            <div><input type="text" value={titleOfCourtesy} placeholder="Title of Courtesy" onChange={({ target }) => setTitleOfCourtesy(target.value)} /></div>

            <div>
            <input
            type="date"
            value={birthDate}
            onChange={({ target }) => setBirthDate(target.value)}
            style={{
            width: "190px",
            height: "40px",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "14px",
            fontFamily: "inherit",
            boxSizing: "border-box",
            }}/>
            </div>

            <div>
            <input
            type="date"
            value={hireDate}
            onChange={({ target }) => setHireDate(target.value)}
            style={{
            width: "190px",
            height: "40px",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "14px",
            fontFamily: "inherit",
            boxSizing: "border-box",
            }}/>
            </div>

            <div><input type="text" value={address} placeholder="Address" onChange={({ target }) => setAddress(target.value)} /></div>

            <div><input type="text" value={city} placeholder="City" onChange={({ target }) => setCity(target.value)} /></div>

            <div><input type="text" value={region} placeholder="Region" onChange={({ target }) => setRegion(target.value)} /></div>

            <div><input type="text" value={postalCode} placeholder="Postal Code" onChange={({ target }) => setPostalCode(target.value)} /></div>

            <div><input type="text" value={country} placeholder="Country" onChange={({ target }) => setCountry(target.value)} /></div>

            <div><input type="text" value={homePhone} placeholder="Home Phone" onChange={({ target }) => setHomePhone(target.value)} /></div>

            <div><input type="text" value={extension} placeholder="Extension" onChange={({ target }) => setExtension(target.value)} /></div>

            <div>
            <textarea
            placeholder="Notes"
            value={notes}
            onChange={({ target }) => setNotes(target.value)}
            style={{
            width: "190px",
            height: "40px",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "14px",
            fontFamily: "inherit",
            boxSizing: "border-box",
            }}/>
            </div>

            <div> 
            <input
            type="text"
            readOnly
            placeholder="Employee Image"
            value={imagePreview ? "Image selected" : ""}
            onClick={() => document.getElementById("fileInput").click()}
            />
            <input type="file" id="fileInput" style={{ display: "none" }} onChange={handleFileChange} />
            </div>

            <input type="submit" value="Save" />
            <input type="button" value="Back" onClick={() => setLisäystila(false)} />
        </form>
        </div>
    )
}
export default EmployeeAdd