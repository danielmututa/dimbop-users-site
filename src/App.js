// import { Route, Routes } from "react-router-dom"
// import { CartProvider } from "./components/shop/CartContext"
// import Navbar from "./components/Navbar"
// import MediaNavbar from "./components/SMNavbar"
// import Home from "./components/home/Home"
// import Aboutus from "./components/pages/Aboutus"
// import Aboutteam from "./components/pages/Aboutteam"
// import Services from "./components/pages/Services"
// import Contactpage from "./components/pages/Contactpage"
// import Footer from "./components/footer/Footer"
// import FQA from "./components/pages/FQA"
// import Whilelist from "./components/pages/Whilelist"
// import Login from "./components/pages/Login"
// import Shop from "./components/shop/Shop"
// import Categories from "./components/shop/Categories"
// import Account from "./components/shop/Account"
// import Blog from "./components/blogs/Blog"
// import Blogarticle from "./components/blogs/Blogarticle"
// import Cartitems from "./components/shop/Cartitems"
// import PaymentForm from "./components/payments/PaymentForm"

// function App() {
//   return (
//     <CartProvider>
//       <div className="App">
//         <Navbar />
//         <MediaNavbar />

//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="about" element={<Aboutus />} />
//           <Route path="team" element={<Aboutteam />} />
//           <Route path="services" element={<Services />} />
//           <Route path="contact" element={<Contactpage />} />
//           <Route path="faq" element={<FQA />} />
//           <Route path="whilelist" element={<Whilelist />} />
//           <Route path="login" element={<Login />} />
//           <Route path="shop" element={<Shop />} />
//           <Route path="categories" element={<Categories />} />
//           <Route path="account" element={<Account />} />
//           <Route path="blog" element={<Blog />} />
//           <Route path="blogarticle" element={<Blogarticle />} />
//           <Route path="cart" element={<Cartitems />} />
//           <Route path="bill" element={<PaymentForm />} />
//         </Routes>
//         <Footer />
//       </div>
//     </CartProvider>
//   )
// }

// export default App









import { Route, Routes } from "react-router-dom"
import { useEffect } from "react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

// Context
import { CartProvider } from "./components/shop/CartContext"
import { useAuthStore } from "./context/userContext"

// Components
import Navbar from "./components/Navbar"
import MediaNavbar from "./components/SMNavbar"
import Footer from "./components/footer/Footer"

// Pages
import Home from "./components/home/Home"
import Aboutus from "./components/pages/Aboutus"
import Aboutteam from "./components/pages/Aboutteam"
import Services from "./components/pages/Services"
import Contactpage from "./components/pages/Contactpage"
import FQA from "./components/pages/FQA"
import Whilelist from "./components/pages/Whilelist"
import Shop from "./components/shop/Shop"
import Categories from "./components/shop/Categories"
import Account from "./components/shop/Account"
import Blog from "./components/blogs/Blog"
import Blogarticle from "./components/blogs/Blogarticle"
import Cartitems from "./components/shop/Cartitems"
import PaymentForm from "./components/payments/PaymentForm"

// Auth Components
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import { ProtectedRoute } from "./components/auth/ProtectedRoutes"
import { AuthRoute } from "./components/auth/AuthRoute"

function App() {
  const { initializeAuth } = useAuthStore()

  useEffect(() => {
    initializeAuth()
  }, [initializeAuth])

  return (
    <CartProvider>
      <div className="App">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        <Routes>
          {/* Auth Routes - Only show when NOT logged in */}
          <Route element={<AuthRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Public Routes - Always accessible */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <MediaNavbar />
                <Home />
                <Footer />
              </>
            }
          />

          <Route
            path="/about"
            element={
              <>
                <Navbar />
                <MediaNavbar />
                <Aboutus />
                <Footer />
              </>
            }
          />

          <Route
            path="/team"
            element={
              <>
                <Navbar />
                <MediaNavbar />
                <Aboutteam />
                <Footer />
              </>
            }
          />

          <Route
            path="/services"
            element={
              <>
                <Navbar />
                <MediaNavbar />
                <Services />
                <Footer />
              </>
            }
          />

          <Route
            path="/contact"
            element={
              <>
                <Navbar />
                <MediaNavbar />
                <Contactpage />
                <Footer />
              </>
            }
          />

          <Route
            path="/faq"
            element={
              <>
                <Navbar />
                <MediaNavbar />
                <FQA />
                <Footer />
              </>
            }
          />

          <Route
            path="/blog"
            element={
              <>
                <Navbar />
                <MediaNavbar />
                <Blog />
                <Footer />
              </>
            }
          />

          <Route
            path="/blogarticle"
            element={
              <>
                <Navbar />
                <MediaNavbar />
                <Blogarticle />
                <Footer />
              </>
            }
          />

          {/* Protected Routes - Only accessible when logged in */}
          <Route element={<ProtectedRoute />}>
            <Route
              path="/whilelist"
              element={
                <>
                  <Navbar />
                  <MediaNavbar />
                  <Whilelist />
                  <Footer />
                </>
              }
            />

            <Route
              path="/shop"
              element={
                <>
                  <Navbar />
                  <MediaNavbar />
                  <Shop />
                  <Footer />
                </>
              }
            />

            <Route
              path="/categories"
              element={
                <>
                  <Navbar />
                  <MediaNavbar />
                  <Categories />
                  <Footer />
                </>
              }
            />

            <Route
              path="/account"
              element={
                <>
                  <Navbar />
                  <MediaNavbar />
                  <Account />
                  <Footer />
                </>
              }
            />

            <Route
              path="/cart"
              element={
                <>
                  <Navbar />
                  <MediaNavbar />
                  <Cartitems />
                  <Footer />
                </>
              }
            />

            <Route
              path="/bill"
              element={
                <>
                  <Navbar />
                  <MediaNavbar />
                  <PaymentForm />
                  <Footer />
                </>
              }
            />
          </Route>
        </Routes>
      </div>
    </CartProvider>
  )
}

export default App
