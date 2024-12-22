import express from "express"
import mysql from "mysql2"
const app= express()

app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"0070nadz",
    database:"yanatindahan"
})

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

//CREATE
app.post("/product", (req, res) => {
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


app.listen(8800, () =>{
    console.log("Connected to Backend!")
})
