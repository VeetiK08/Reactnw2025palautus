import './App.css'
import React,{useState} from 'react'
import ProductService from './services/Product'



const ProductAdd = ({setLisäystila, setIsPositive, setMessage, setShowMessage}) => {
    

const [productName, setProductName] = useState('')
const [supplierId, setSupplierId] = useState('')
const [categoryId, setCategoryId] = useState('')
const [quantityPerUnit, setQuantityPerUnit] = useState('')
const [unitPrice, setUnitPrice] = useState('')
const [unitsInStock, setUnitsInStock] = useState('')
const [unitsOnOrder, setUnitsOnOrder] = useState('')
const [reorderLevel, setReorderLevel] = useState('')
const [discontinued, setDiscontinued] = useState(false)
const [imageLink, setImageLink] = useState('')
//aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
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
//aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
const handleSubmit = (event) => {
  event.preventDefault()
  const newProduct = {
    productName,
    supplierId: supplierId ? parseInt(supplierId) : null,
    categoryId: categoryId ? parseInt(categoryId) : null,
    quantityPerUnit,
    unitPrice: unitPrice ? parseFloat(unitPrice) : null,
    unitsInStock: unitsInStock ? parseInt(unitsInStock) : null,
    unitsOnOrder: unitsOnOrder ? parseInt(unitsOnOrder) : null,
    reorderLevel: reorderLevel ? parseInt(reorderLevel) : null,
    discontinued,
    imageLink
}
    console.log("Posting product:", newProduct)

    ProductService.create(newProduct)
      .then(response => {
        if (response.status === 200 || response.status === 201) {
          setMessage(`Added new product: ${newProduct.productName}`)
          setIsPositive(true)
          setShowMessage(true)

          setTimeout(() => {
            setShowMessage(false)
          }, 5000)

          setLisäystila(false)
        }
      })
      .catch(error => {
        const errMsg = error.response?.data?.message || error.message || 'Unknown error'
        setMessage(errMsg)
        setIsPositive(false)
        setShowMessage(true)
        setTimeout(() => {
          setShowMessage(false)
        }, 6000)
      })
  }

    return (
         <div id="addNew">
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" value={productName} placeholder="Product Name"
                 onChange={({ target }) => setProductName(target.value)} required />
        </div>
        <div>
          <input type="number" value={supplierId} placeholder="Supplier Id"
                 onChange={({ target }) => setSupplierId(target.value)} />
        </div>
        <div>
          <input type="number" value={categoryId} placeholder="Category Id"
                 onChange={({ target }) => setCategoryId(target.value)} />
        </div>
        <div>
          <input type="text" value={quantityPerUnit} placeholder="Quantity Per Unit"
                 onChange={({ target }) => setQuantityPerUnit(target.value)} />
        </div>
        <div>
          <input type="number" step="0.01" value={unitPrice} placeholder="Unit Price"
                 onChange={({ target }) => setUnitPrice(target.value)} />
        </div>
        <div>
          <input type="number" value={unitsInStock} placeholder="Units In Stock"
                 onChange={({ target }) => setUnitsInStock(target.value)} />
        </div>
        <div>
          <input type="number" value={unitsOnOrder} placeholder="Units On Order"
                 onChange={({ target }) => setUnitsOnOrder(target.value)} />
        </div>
        <div>
          <input type="number" value={reorderLevel} placeholder="Reorder Level"
                 onChange={({ target }) => setReorderLevel(target.value)} />
        </div>


        <div>
          <label>
            <div>
            <input
                type="text"
                readOnly
                placeholder="Discontinued"
                value={discontinued ? "Yes" : "No"}
                onClick={() => setDiscontinued(!discontinued)}
            />
            </div>
          </label>
        </div>


        <div> {/*Versio jossa imagen voi dropata*/}
          <input
            type="text"
            readOnly
            placeholder="Product Image"
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
export default ProductAdd