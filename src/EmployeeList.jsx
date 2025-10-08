import './App.css'
import React, { useState, useEffect } from 'react'
import EmployeeService from './services/Employee'
import Employee from './Employee'
import EmployeeAdd from './EmployeeAdd'
import EmployeeEdit from './EmployeeEdit'

const EmployeeList = ({ setIsPositive, setShowMessage, setMessage }) => {
const [employees, setEmployees] = useState([])
const [showEmployees, setShowEmployees] = useState(false)
const [lisäystila, setLisäystila] = useState(false)
const [muokkaustila, setMuokkaustila] = useState(false)
const [reload, reloadNow] = useState(false)
const [muokattavaEmployee, setMuokattavaEmployee] = useState(null)
const [search, setSearch] = useState("")

useEffect(() => {
const token = localStorage.getItem('token')
if (token) {
    EmployeeService.setToken(token)
}

EmployeeService.getAll()
    .then(data => setEmployees(data))
    .catch(error => {
        if (error.response && error.response.status === 401) {
            setMessage("Session expired. Please log in again.")
            setIsPositive(false)
            setShowMessage(true)
            window.location.href = "/"
        }
    })
}, [lisäystila, reload, muokkaustila])

const handleSearchInputChange = (event) => {
setShowEmployees(true)
setSearch(event.target.value.toLowerCase())
}

const editEmployee = (employee) => {
setMuokattavaEmployee(employee)
setMuokkaustila(true)
}

return (
    <>
    <h1>
        <nobr style={{ cursor: 'pointer' }}onClick={() => setShowEmployees(!showEmployees)}>Employees</nobr>

        {!lisäystila && (
          <button className="nappiEmployee" onClick={() => setLisäystila(true)}>Add new</button>
        )}
    </h1>

    {!lisäystila && !muokkaustila && (
        <input
            placeholder="Search via Last or First Name"
            value={search}
            onChange={handleSearchInputChange}
        />
      )}

      {lisäystila && (
        <EmployeeAdd
            setLisäystila={setLisäystila}
            setIsPositive={setIsPositive}
            setMessage={setMessage}
            setShowMessage={setShowMessage}
        />
      )}

      {!lisäystila && muokkaustila && muokattavaEmployee && (
        <EmployeeEdit
            setMuokkaustila={setMuokkaustila}
            setIsPositive={setIsPositive}
            setMessage={setMessage}
            setShowMessage={setShowMessage}
            muokattavaEmployee={muokattavaEmployee}
        />
      )}

      {!lisäystila && !muokkaustila && showEmployees && employees && employees.map(emp => {
        const lowerCaseName = (emp.firstName + " " + emp.lastName).toLowerCase()
        if (lowerCaseName.indexOf(search) > -1) {
          return (
            <Employee
                key={emp.employeeId}
                employee={emp}
                reloadNow={reloadNow}
                reload={reload}
                setIsPositive={setIsPositive}
                setMessage={setMessage}
                setShowMessage={setShowMessage}
                editEmployee={editEmployee}
            />
          )
        }
        return null
      })}
    </>
  )
}

export default EmployeeList