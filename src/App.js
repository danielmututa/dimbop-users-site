import { Route, Routes } from "react-router-dom"
import { CartProvider } from "./components/shop/CartContext"
import Navbar from "./components/Navbar"
import MediaNavbar from "./components/SMNavbar"
import Home from "./components/home/Home"
import Aboutus from "./components/pages/Aboutus"
import Aboutteam from "./components/pages/Aboutteam"
import Services from "./components/pages/Services"
import Contactpage from "./components/pages/Contactpage"
import Footer from "./components/footer/Footer"
import FQA from "./components/pages/FQA"
import Whilelist from "./components/pages/Whilelist"
import Login from "./components/pages/Login"
import Shop from "./components/shop/Shop"
import Categories from "./components/shop/Categories"
import Account from "./components/shop/Account"
import Blog from "./components/blogs/Blog"
import Blogarticle from "./components/blogs/Blogarticle"
import Cartitems from "./components/shop/Cartitems"
import PaymentForm from "./components/payments/PaymentForm"

function App() {
  return (
    <CartProvider>
      <div className="App">
        <Navbar />
        <MediaNavbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<Aboutus />} />
          <Route path="team" element={<Aboutteam />} />
          <Route path="services" element={<Services />} />
          <Route path="contact" element={<Contactpage />} />
          <Route path="faq" element={<FQA />} />
          <Route path="whilelist" element={<Whilelist />} />
          <Route path="login" element={<Login />} />
          <Route path="shop" element={<Shop />} />
          <Route path="categories" element={<Categories />} />
          <Route path="account" element={<Account />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blogarticle" element={<Blogarticle />} />
          <Route path="cart" element={<Cartitems />} />
          <Route path="bill" element={<PaymentForm />} />
        </Routes>
        <Footer />
      </div>
    </CartProvider>
  )
}

export default App
