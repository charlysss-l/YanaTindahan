import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import styles from './Product.module.css'; // Importing the CSS module

const Product = () => {
  const [product, setProduct] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const itemsPerPage = 5; // Number of items per page

  useEffect(() => {
    const fetchAllProduct = async () => {
      try {
        const res = await axios.get("http://localhost:8800/product");
        setProduct(res.data);
        // Extract unique categories
        const uniqueCategories = [...new Set(res.data.map((prod) => prod.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllProduct();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/product/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // Filter products based on the search query and category filter
  const filteredProducts = product.filter((prod) => {
    const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prod.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter ? prod.category === categoryFilter : true;
    return matchesSearch && matchesCategory;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.productContainer}>
      <div className={styles.content}>
        <h1>List of Products</h1>
        <Link to="/create-product" className={styles.createLink}>Create Product</Link>

        {/* Search input */}
        <input
          type="text"
          placeholder="Search products by name or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />

        {/* Category filter */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className={styles.categoryFilter}
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>

        <table className={styles.productTable}>
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
            {currentItems.map((product) => (
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

        {/* Pagination */}
        <div className={styles.pagination}>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? styles.activePage : ""}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
