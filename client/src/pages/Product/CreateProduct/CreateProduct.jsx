import axios from "axios"
import { useState} from "react"
import { useNavigate } from "react-router-dom"

const CreateProduct = () => {
  const [product, setProduct] = useState({
    name:"",
    price:null,
    quantity:"",
    srp:"",
    color:"",
    size:"",
    category:""
  })
  console.log({product})
  const handleChange = (e) =>{
    setProduct(prev =>({...prev, [e.target.name]: e.target.value}))
  }

  const navigate = useNavigate()

  const handleClick = async e=>{
    e.preventDefault()
    try {
      await axios.post("http://localhost:8800/create-product",product )
      navigate("/products")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <h1>Create product</h1>
      <form>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="srp"
          placeholder="SRP"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="color"
          placeholder="Color"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="size"
          placeholder="Size"
          onChange={handleChange}
          required
        />
        <input
        type="text"
        name="category"
        placeholder="category"
        onChange={handleChange}
        required
        />
        <button onClick={handleClick}>Create Product</button>
      </form>
    </div>
  )
}

export default CreateProduct