import './App.css'
import React, { useState } from 'react'
import ProductService from './services/Product'

const Product = ({ product, editProduct, setIsPositive, setMessage, setShowMessage, reload, reloadNow }) => {
  const [showDetails, setShowDetails] = useState(false)

  const deleteProduct = (product) => {
    let vastaus = window.confirm(`Remove Product: ${product.productName}`)

    if (vastaus === true) {
      ProductService.remove(product.productId)
        .then(res => {
          if (res.status === 200) {
            setMessage(`Removed Product: ${product.productName}`)
            setIsPositive(true)
            setShowMessage(true)
            window.scrollBy(0, -10000)

            setTimeout(() => {
              setShowMessage(false)
            }, 5000)
            reloadNow(!reload)
          }
        })
        .catch(error => {
          setMessage(error.message || "Error deleting product")
          setIsPositive(false)
          setShowMessage(true)
          window.scrollBy(0, -10000)

          setTimeout(() => {
            setShowMessage(false)
          }, 6000)
        })
    } else {
      setMessage('Poisto peruttu onnistuneesti')
      setIsPositive(true)
      setShowMessage(true)
      window.scrollBy(0, -10000)

      setTimeout(() => {
        setShowMessage(false)
      }, 5000)
    }
  }

  return (
    <div className='productDiv'>
      <h4 onClick={() => setShowDetails(!showDetails)}>
        {product.productName}, {product.unitPrice} €
      </h4>

      {showDetails && (
        <div className='productDetails'>
          <div className='detailButtonsAndNameProduct'>
            <h3>{product.productName}</h3>

            <button onClick={() => deleteProduct(product)}>Delete</button>
            <button onClick={() => editProduct(product)}>Edit</button>
          </div>

          <table>
            <thead>
              <tr>
                <th>Supplier Id</th>
                <th>Category Id</th>
                <th>Quantity Per Unit</th>
                <th>Units In Stock</th>
                <th>Units On Order</th>
                <th>Reorder Level</th>
                <th>Discontinued</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{product.supplierId}</td>
                <td>{product.categoryId}</td>
                <td>{product.quantityPerUnit}</td>
                <td>{product.unitsInStock}</td>
                <td>{product.unitsOnOrder}</td>
                <td>{product.reorderLevel}</td>
                <td>{product.discontinued ? "Yes" : "No"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Product
// import './App.css'
// import React,{useState} from 'react'
// import ProductService from './services/Product'

// const Product = ({product, editProduct, setIsPositive, setMessage, setShowMessage, reload, reloadNow}) => {
    
// const [showDetails, setShowDetails] = useState(false)

// const deleteProduct = (product) => {
//     let vastaus = window.confirm(`Remove Product: ${product.productName}`)

//     if (vastaus === true) {
//     ProductService.remove(product.productId)
//     .then(res => {
//         if (res.status === 200) {
//             setMessage(`Removed Product: ${product.productName}`)
//             setIsPositive(true)
//             setShowMessage(true)
//             window.scrollBy(0, -10000) 

//             setTimeout(() => {
//                 setShowMessage(false)
//             }, 5000
//         )
//             reloadNow(!reload)
//         }
//     }
//     )
//     .catch(error => {
//         setMessage(error)
//         setIsPositive(false)
//         setShowMessage(true)
//         window.scrollBy(0, -10000)

//         setTimeout(() => {
//         setShowMessage(false)
//         }, 6000)
//     })

    
//     }
//     else{
//         setMessage('Poisto peruttu onsituneesti')
//         setIsPositive(true)
//         setShowMessage(true)
//         window.scrollBy(0, -10000) 

//         setTimeout(() => {
//                 setShowMessage(false)
//             }, 5000
//         )
//     }
// }

// return (
//         <div className='customerDiv'>
//             <h4 onClick={() => setShowDetails(!showDetails)}>
//                     {product.productName}, {product.unitPrice}
//                 </h4>

//             {showDetails && <div className='customerDetails'>
//                 <div class='detailbButtonsAndName'>
//                 <h3>{product.productName}</h3>

//                 <button onClick={() => deleteProduct(product)}>Delete</button>
//                 <button onClick={() => editProduct(product)}>Edit</button>
//                 </div>

//                 <table>
//                 <thead>
//                     <tr>
//                         <th>Contact person</th>
//                         <th>Phone</th>
//                         <th>Adress</th>
//                         <th>City</th>
//                         <th>Country</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                         <td>{customer.contactName}</td>
//                         <td>{customer.phone}</td>
//                         <td>{customer.address}</td>
//                         <td>{customer.city}</td>
//                         <td>{customer.country}</td>
//                     </tr>
//                 </tbody>
            
//         </table></div>}
        
//     </div>
//     )
// }
// export default Product