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

//FETCH
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

  
//CREATE
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

//DELETE
app.delete("/product/:id", (req,res) =>{
    const productId = req.params.id;
    const q = "DELETE FROM product WHERE idproduct = ?"

    db.query(q, [productId], (err,data) =>{
        if (err) return res.status(500).json(err);
        return res.status(201).json({message: "Product deleted successfully"})
    })
})

//UPDATE
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
app.listen(8800, () =>{
    console.log("Connected to Backend!")
})
