import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import styles from "./Sales.module.css";

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchAllSales = async () => {
      try {
        const res = await axios.get("http://localhost:8800/sales");
        setSales(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllSales();
  }, []);

  const formatDate = (date) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  
  const convertToDateString = (date) => {
    const dateObj = new Date(date);
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObj.getDate().toString().padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${month}/${day}/${year}`; 
  };

  const filteredSales = sales.filter((sale) => {
    const matchesSearchQuery =
      (sale.name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      convertToDateString(sale.date_purchased).includes(searchQuery);

  
    const matchesSearchDate =
      searchDate && convertToDateString(sale.date_purchased).includes(searchDate) ? true : true;

    return matchesSearchQuery && matchesSearchDate;
  });


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSales.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredSales.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.salesContainer}>
      <h1>Sales</h1>
      <Link to="/create-sales" className={styles.createLink}>Create Sales</Link>

      <div className={styles.salesFilterSection}>
          <input
            type="text"
            placeholder="Search product or date (MM/DD/YYYY)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />

      </div>

      <div>
        <table className={styles.salesTable}>
          <thead>
            <tr>
              <th>Date Purchased</th>
              <th>ProductID</th>
              <th>Name</th>
              <th>SRP</th>
              <th>Quantity</th>
              <th>Total Sales</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.map((sale) => (
              <tr key={sale.salesId}>
                <td>{formatDate(sale.date_purchased)}</td> 
                <td>{sale.idproduct}</td>
                <td>{sale.name}</td>
                <td>{sale.srp}</td>
                <td>{sale.quantity}</td>
                <td>{sale.totalprice}</td>
                <td>
                  <button>Update</button>
                </td>
                <td>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
  );
};

export default Sales;
