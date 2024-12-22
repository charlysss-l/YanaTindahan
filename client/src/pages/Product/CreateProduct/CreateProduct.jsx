import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreateProduct.module.css";

const CreateProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: null,
    quantity: "",
    srp: "",
    color: "",
    size: "",
    category: "",
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/create-product", product);
      navigate("/products");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.createProductContainer}>
      <h1>Create Product</h1>
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

        {/* Dropdown for Category */}
        <select
          name="category"
          onChange={handleChange}
          value={product.category}
          required
        >
          <option value="" disabled>
            Select Category
          </option>
          <option value="Beverages">Beverages</option>
          <option value="Snacks">Snacks</option>
          <option value="Fruits">Canned Goods</option>
          <option value="Condiments">Condiments</option>
          <option value="Canned Goods">Canned Goods</option>
          <option value="Cleaning Supplies">Cleaning Supplies</option>
          <option value="Personal Care">Personal Care</option>
          <option value="Household Items">Household Items</option>
          <option value="Other">Other</option>
        </select>

        <button onClick={handleClick}>Add Product</button>
      </form>
    </div>
  );
};

export default CreateProduct;
