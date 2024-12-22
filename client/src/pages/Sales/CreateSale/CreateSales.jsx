import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreateSale.module.css";

const CreateSales = () => {
  const [sales, setSales] = useState({
    date_purchased: new Date().toISOString().split("T")[0], // Default to today's date
    idproduct: "",
    name: "",
    srp: 0,
    quantity: 1,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [products, setProducts] = useState([]); // List of added products
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSales((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      try {
        const response = await axios.get(
          `http://localhost:8800/search-product/${query}`
        );
        setSearchResults(response.data);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleProductSelect = (product) => {
    setSales({
      ...sales,
      idproduct: product.idproduct,
      name: product.name,
      srp: product.srp,
    });
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleQuantityChange = (e) => {
    const quantity = e.target.value;
    setSales((prev) => ({
      ...prev,
      quantity,
    }));
  };

  const handleAddProduct = () => {
    if (sales.name) {
      const totalprice = sales.srp * sales.quantity; // Calculate total price for the product
      setProducts((prev) => [
        ...prev,
        { ...sales, totalprice },
      ]);
      setSales((prev) => ({
        ...prev,
        idproduct: "",
        name: "",
        srp: 0,
        quantity: 1,
      }));
    }
  };

  const calculateTotalPrice = () => {
    return products.reduce((total, product) => total + product.totalprice, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const finalSales = {
        date_purchased: sales.date_purchased,
        products,
        totalprice: calculateTotalPrice(), // Save final total price
      };
      await axios.post("http://localhost:8800/create-sales", finalSales);
      setSubmitted(true);
      setTimeout(() => navigate("/sales"), 3000); // Redirect after 3 seconds
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.createSalesContainer}>
      <h1 className={styles.pageTitle}>Create Sales</h1>
      {!submitted ? (
        <form className={styles.formContainer}>
          <div className={styles.dateContainer}>
            <label htmlFor="date_purchased">Date Purchased:</label>
            <input
              type="date"
              name="date_purchased"
              value={sales.date_purchased}
              onChange={handleChange}
              required
              className={styles.textField}
              disabled
            />
          </div>

          <div className={styles.searchContainer}>
            <input
              type="text"
              name="search"
              value={searchQuery}
              placeholder="Search Product by Name"
              onChange={handleSearchChange}
              className={styles.searchInput}
            />
            {searchResults.length > 0 && (
              <ul className={styles.searchResults}>
                {searchResults.map((product) => (
                  <li
                    key={product.idproduct}
                    onClick={() => handleProductSelect(product)}
                    className={styles.searchResultItem}
                  >
                    {product.name} - ₱{product.srp}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={styles.productInfo}>
            <div>
              <label>Name:</label>
              <span>{sales.name}</span>
            </div>
            <div>
              <label>SRP:</label>
              <span>₱{sales.srp}</span>
            </div>
            <div>
              <label>Quantity:</label>
              <input
                type="number"
                name="quantity"
                value={sales.quantity}
                onChange={handleQuantityChange}
                required
                className={styles.inputField}
              />
            </div>
          </div>

          <button type="button" onClick={handleAddProduct} className={styles.addButton}>
            Add Product
          </button>

          <div className={styles.productsList}>
            <h2>Products List</h2>
            <ul>
              {products.map((product, index) => (
                <li key={index}>
                  {product.name} - ₱{product.srp} x {product.quantity} = ₱
                  {product.totalprice}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.finalTotalPrice}>
            <strong>Total:</strong> ₱{calculateTotalPrice()}
          </div>

          <button onClick={handleSubmit} className={styles.submitButton}>
            Submit Sales
          </button>
        </form>
      ) : (
        <div className={styles.receipt}>
          <h2>Receipt</h2>
          {products.map((product, index) => (
            <p key={index}>
              <strong>{product.name}:</strong> ₱{product.srp} x{" "}
              {product.quantity} = ₱{product.totalprice}
            </p>
          ))}
          <hr />
          <p>
            <strong>Total:</strong> ₱{calculateTotalPrice()}
          </p>
          <p className={styles.thankYou}>Thank you for your purchase!</p>
        </div>
      )}
    </div>
  );
};

export default CreateSales;
