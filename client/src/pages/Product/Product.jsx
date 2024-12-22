import { Link } from "react-router-dom"
import axios from "axios"
import { useState, useEffect } from "react"

const Product = () => {
  const [product, setProduct] = useState([])

  useEffect(() => {
    const fetchAllProduct = async()=>{
      try {
        const res = await axios.get("http://localhost:8800/product")
        setProduct(res.data);
      } catch (err) {
        console.log(err)
      }
    }
      fetchAllProduct()
  }, [])

  const handleDelete = async (id) =>{
    try {
     await axios.delete("http://localhost:8800/product/"+id)
     window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>Product
        <Link to="/create-product">Create Product</Link>
        <div>
          <h1>List of Products</h1>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>SRP</th>
                <th>Color</th>
                <th>Size</th>
                <th>Category</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
            {product.map(product =>(
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.quantity}</td>
                      <td>{product.srp}</td>
                      <td>{product.color}</td>
                      <td>{product.size}</td>
                      <td>{product.category}</td> 
                      <td>
                          <button>
                            <Link to={`/update-product/${product.idproduct}`}>Update</Link>
                            </button>
                      </td>
                      <td>
                          <button onClick={() => handleDelete(product.idproduct)}>Delete</button>
                      </td>
                    </tr>
                ))}

            </tbody>
          </table>
        </div>
    </div>
  )
}

export default Product