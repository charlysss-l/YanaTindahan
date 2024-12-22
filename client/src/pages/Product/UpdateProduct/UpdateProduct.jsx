import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../CreateProduct/CreateProduct.module.css";

const UpdateProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: null,
    quantity: "",
    srp: "",
    color: "",
    size: "",
    category: ""
  });

  const navigate = useNavigate();
  const location = useLocation();
  const idproduct = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/product/${idproduct}`);
        setProduct(res.data); // Set the existing product data into state
      } catch (err) {
        console.log(err);
      }
    };
    
    fetchProduct();
  }, [idproduct]);

  const handleChange = (e) => {
    setProduct(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8800/update-product/${idproduct}`, product);
      navigate("/products");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.createProductContainer}>
      <h1>Update Product</h1>
      <form>
        <input
          type="text"
          name="name"
          value={product.name}
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          value={product.price}
          placeholder="Price"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="quantity"
          value={product.quantity}
          placeholder="Quantity"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="srp"
          value={product.srp}
          placeholder="SRP"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="color"
          value={product.color}
          placeholder="Color"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="size"
          value={product.size}
          placeholder="Size"
          onChange={handleChange}
          required
        />

        {/* Dropdown for Category */}
        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select Category
          </option>
          <option value="Beverages">Beverages</option>
          <option value="Snacks">Snacks</option>
          <option value="Canned Goods">Canned Goods</option>
          <option value="Condiments">Condiments</option>
          <option value="Cleaning Supplies">Cleaning Supplies</option>
          <option value="Personal Care">Personal Care</option>
          <option value="Household Items">Household Items</option>
          <option value="Other">Other</option>
        </select>

        <button onClick={handleClick}>Update Product</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
