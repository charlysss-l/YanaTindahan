import express from "express"
import mysql from "mysql2"
import cors from "cors"

const app= express()

const db = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"0070nadz",
    database:"yanatindahan"
})

app.use(express.json())
app.use(cors())

app.get("/", (req,res) =>{
    res.json("hello this is the backend")
})

app.listen(8800, () =>{
    console.log("Connected to Backend!")
})


//FETCH ALL PRODUCTS
app.get("/product", (req,res) =>{
    const q = "SELECT * FROM yanatindahan.product"
    db.query(q, (err, data) =>{
        if(err) return res.json(err)
            return  res.json(data)
    })
})

// Fetch Product by ID
app.get("/product/:id", (req, res) => {
    const productId = req.params.id;
    const q = "SELECT * FROM product WHERE idproduct = ?";
    
    db.query(q, [productId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data[0]); // Send back the first product from the database
    });
  });

  
//CREATE PRODUCT
app.post("/create-product", (req, res) => {
    const q = "INSERT INTO product( `name`, `price`, `quantity`, `srp`, `color`, `size`, `category`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.price,
        req.body.quantity,
        req.body.srp,
        req.body.color,
        req.body.size,
        req.body.category,
    ];
    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(201).json({ message: "Product created successfully", data });
    });
});

//DELETE PRODUCT
app.delete("/product/:id", (req,res) =>{
    const productId = req.params.id;
    const q = "DELETE FROM product WHERE idproduct = ?"

    db.query(q, [productId], (err,data) =>{
        if (err) return res.status(500).json(err);
        return res.status(201).json({message: "Product deleted successfully"})
    })
})

//UPDATE PRODUCT
app.put("/update-product/:id", (req,res) =>{
    const productId = req.params.id;
    const q =" UPDATE product  SET `name` = ?, `price` = ?, `quantity` = ?, `srp` = ?, `color` = ?, `size` = ?, `category` = ? WHERE idproduct = ?"

    const values = [
        req.body.name,
        req.body.price,
        req.body.quantity,
        req.body.srp,
        req.body.color,
        req.body.size,
        req.body.category,
    ]

    
    db.query(q, [...values, productId], (err,data) =>{
        if(err) return res.status(500).json(err);
        return res.status(201).json({message: "Product updated successfully."})
    })
})

// Search product by name
app.get("/search-product/:name", (req, res) => {
    const { name } = req.params;
    const query = "SELECT idproduct, name, srp FROM product WHERE name LIKE ?";
    
    db.query(query, [`%${name}%`], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
});


//FETCH ALL SALES
app.get("/sales", (req, res) =>{
    const q = "SELECT * FROM yanatindahan.sales"
    db.query(q, (err, data) =>{
        if(err) return res.json(err)
            return res.json(data)
    })
})

//CREATE SALE
app.post("/create-sales", (req, res) => {
    const { date_purchased, products, totalprice } = req.body;

    // Validate request data
    if (!date_purchased || !Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ message: "Invalid request data" });
    }

    // Check each product's existence and then insert sales
    const checkProductQuery = "SELECT * FROM product WHERE idproduct = ?";
    const insertSalesQuery =
        "INSERT INTO sales(`date_purchased`, `idproduct`, `name`, `srp`, `quantity`, `totalprice`) VALUES ?";

    const productIds = products.map((product) => product.idproduct);
    const salesValues = products.map((product) => [
        date_purchased,
        product.idproduct,
        product.name,
        product.srp,
        product.quantity,
        product.totalprice,
    ]);

    // Check if all products exist
    const checkAllProductsQuery = `SELECT idproduct FROM product WHERE idproduct IN (${productIds.map(() => "?").join(",")})`;

    db.query(checkAllProductsQuery, productIds, (err, result) => {
        if (err) {
            console.error("Error checking products:", err);
            return res.status(500).json({ message: "Internal Server Error", error: err });
        }

        const existingProductIds = result.map((row) => row.idproduct);
        const missingProducts = productIds.filter((id) => !existingProductIds.includes(id));

        if (missingProducts.length > 0) {
            return res.status(400).json({
                message: "Some products do not exist",
                missingProducts,
            });
        }

        // Insert sales data for all products
        db.query(insertSalesQuery, [salesValues], (err, data) => {
            if (err) {
                console.error("Error inserting sales:", err);
                return res.status(500).json({ message: "Internal Server Error", error: err });
            }
            return res.status(201).json({ message: "Sales saved successfully.", data });
        });
    });
});













