import './App.css'
import React, { useState } from 'react'
import ProductService from './services/Product'

const ProductEdit = ({ setMuokkaustila, setIsPositive, setMessage, setShowMessage, muokattavaProduct }) => {

  const [productId] = useState(muokattavaProduct.productId) // id ei muokattava
  const [productName, setProductName] = useState(muokattavaProduct.productName)
  const [supplierId, setSupplierId] = useState(muokattavaProduct.supplierId || "")
  const [categoryId, setCategoryId] = useState(muokattavaProduct.categoryId || "")
  const [quantityPerUnit, setQuantityPerUnit] = useState(muokattavaProduct.quantityPerUnit || "")
  const [unitPrice, setUnitPrice] = useState(muokattavaProduct.unitPrice || "")
  const [unitsInStock, setUnitsInStock] = useState(muokattavaProduct.unitsInStock || "")
  const [unitsOnOrder, setUnitsOnOrder] = useState(muokattavaProduct.unitsOnOrder || "")
  const [reorderLevel, setReorderLevel] = useState(muokattavaProduct.reorderLevel || "")
  const [discontinued, setDiscontinued] = useState(muokattavaProduct.discontinued || false)
  const [imageLink, setImageLink] = useState(muokattavaProduct.imageLink || "")
  const [imagePreview, setImagePreview] = useState(muokattavaProduct.imageLink || null)

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
    const updatedProduct = {
      productId,
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

    ProductService.update(updatedProduct)
      .then(response => {
        if (response.status === 200) {
          setMessage("Edited product " + updatedProduct.productName)
          setIsPositive(true)
          setShowMessage(true)
          setTimeout(() => setShowMessage(false), 5000)
          setMuokkaustila(false)
        }
      })
      .catch(error => {
        const errMsg = error.response?.data?.message || error.message || "Unknown error"
        setMessage(errMsg)
        setIsPositive(false)
        setShowMessage(true)
        setTimeout(() => setShowMessage(false), 6000)
      })
  }

  return (
    <div id="edit">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>

        <div class='formWrapper'>
          <label className="labelEditProduct">Type</label>
          <input type='text' className="inputEditProduct" value={productId} readOnly placeholder="Product Id" />
        </div>

        <div class='formWrapper'>
          <label className="labelEditProduct">Name</label>
          <input type='text' className="inputEditProduct" value={productName} placeholder="Product Name"
            onChange={({ target }) => setProductName(target.value)} required />
        </div>

        <div class='formWrapper'>
          <label className="labelEditProduct">Suplier Id</label>
          <input type='number' className="inputEditProduct" value={supplierId} placeholder="Supplier Id"
            onChange={({ target }) => setSupplierId(target.value)} />
        </div>

        <div class='formWrapper'>
          <label className="labelEditProduct">Category Id</label>
          <input type='number' className="inputEditProduct" value={categoryId} placeholder="Category Id"
            onChange={({ target }) => setCategoryId(target.value)} />
        </div>

        <div class='formWrapper'>
          <label className="labelEditProduct">Quanty</label>
          <input type='text' className="inputEditProduct" value={quantityPerUnit} placeholder="Quantity Per Unit"
            onChange={({ target }) => setQuantityPerUnit(target.value)} />
        </div>

        <div class='formWrapper'>
          <label className="labelEditProduct">Price</label>
          <input type='number' className="inputEditProduct" step="0.01" value={unitPrice} placeholder="Unit Price"
            onChange={({ target }) => setUnitPrice(target.value)} />
        </div>

        <div class='formWrapper'>
          <label className="labelEditProduct">Units in Stock</label>
          <input type='number' className="inputEditProduct" value={unitsInStock} placeholder="Units In Stock"
            onChange={({ target }) => setUnitsInStock(target.value)} />
        </div>

        <div class='formWrapper'>
          <label className="labelEditProduct">Units on Order</label>
          <input type='number' className="inputEditProduct" value={unitsOnOrder} placeholder="Units On Order"
            onChange={({ target }) => setUnitsOnOrder(target.value)} />
        </div>

        <div class='formWrapper'>
          <label className="labelEditProduct">Reorder Level</label>
          <input type='number' className="inputEditProduct" value={reorderLevel} placeholder="Reorder Level"
            onChange={({ target }) => setReorderLevel(target.value)} />
        </div>

        <div class='formWrapper'>
          <label className="labelEditProduct">Discontinued</label>
          <input
            type="text"
            className="inputEditProduct"
            readOnly
            placeholder="Discontinued"
            value={discontinued ? "Yes" : "No"}
            onClick={() => setDiscontinued(!discontinued)}
          />
        </div>

        <div class='formWrapper'>
          <label className="labelEditProduct">Image</label>
          <input
            type="text"
            className="inputEditProduct"
            readOnly
            placeholder="Product Image"
            value={imagePreview ? "Image selected" : ""}
            onClick={() => document.getElementById("fileInput").click()}
          />
          <input type="file" id="fileInput" style={{ display: "none" }} onChange={handleFileChange} />
        </div>

        <input type="submit" value='Save' />
        <input type="button" value='Back' onClick={() => setMuokkaustila(false)} />
      </form>
    </div>
  )
}

export default ProductEdit