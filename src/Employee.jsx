import './App.css'
import React, { useState } from 'react'
import EmployeeService from './services/Employee'

const Employee = ({ employee, editEmployee, setIsPositive, setMessage, setShowMessage, reload, reloadNow }) => {
  const [showDetails, setShowDetails] = useState(false)

  const deleteEmployee = (employee) => {
    let confirmDelete = window.confirm(`Remove Employee: ${employee.firstName} ${employee.lastName}`)

    if (confirmDelete) {
      EmployeeService.remove(employee.employeeId)
        .then(res => {
          if (res.status === 200) {
            setMessage(`Removed Employee: ${employee.firstName} ${employee.lastName}`)
            setIsPositive(true)
            setShowMessage(true)
            window.scrollBy(0, -10000)

            setTimeout(() => setShowMessage(false), 5000)
            reloadNow(!reload)
          }
        })
        .catch(error => {
          setMessage(error.message || "Error removing employee")
          setIsPositive(false)
          setShowMessage(true)
          window.scrollBy(0, -10000)
          setTimeout(() => setShowMessage(false), 6000)
        })
    } else {
      setMessage('Deletion cancelled successfully')
      setIsPositive(true)
      setShowMessage(true)
      window.scrollBy(0, -10000)
      setTimeout(() => setShowMessage(false), 5000)
    }
  }

  return (
    <div className='employeeDiv'>
    <h4 onClick={() => setShowDetails(!showDetails)}>
        {employee.firstName} {employee.lastName}
    </h4>

        {showDetails && (
        <div className='employeeDetails'>
        <div className='detailButtonsAndName'>
        <h3>{employee.firstName} {employee.lastName}</h3>
        <button onClick={() => deleteEmployee(employee)}>Delete</button>
        <button onClick={() => editEmployee(employee)}>Edit</button>
    </div>

        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Title of Courtesy</th>
                    <th>Phone</th>
                    <th>Extension</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>Region</th>
                    <th>Postal Code</th>
                    <th>Country</th>
                </tr>
        </thead>
        <tbody>
            <tr>
                <td>{employee.title}</td>
                <td>{employee.titleOfCourtesy}</td>
                <td>{employee.homePhone}</td>
                <td>{employee.extension}</td>
                <td>{employee.address}</td>
                <td>{employee.city}</td>
                <td>{employee.region}</td>
                <td>{employee.postalCode}</td>
                <td>{employee.country}</td>
            </tr>
        </tbody>
        </table>
        </div>
    )}
</div>
)
}

export default Employee