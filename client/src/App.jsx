
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'
import Home from './pages/Home/Home'
import Navbar from './component/Navbar/Navbar'
import Product from './pages/Product/Product'
import CreateProduct from './pages/Product/CreateProduct/CreateProduct'
import Sales from './pages/Sales/Sales'
import CreateSales from './pages/Sales/CreateSale/CreateSales'
import Footer from './component/Footer/Footer'
import UpdateProduct from './pages/Product/UpdateProduct/UpdateProduct'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/products" element={<Product/>} />
          <Route path="/create-product" element={<CreateProduct/>} />
          <Route path="/update-product/:id" element={<UpdateProduct/>} />
          <Route path="/sales" element={<Sales/>} />
          <Route path="/create-sales" element={<CreateSales/>} />
        </Routes>
       <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
