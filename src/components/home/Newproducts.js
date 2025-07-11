import { useState } from "react"
import { ChevronRight, Star, X, Plus, Minus, Check, ShoppingCart } from "lucide-react"
import Database from "../Database"
import { useCart } from "../shop/CartContext" // Import useCart hook
import { useNavigate } from "react-router-dom" // Add this import

const Newproducts = () => {
  const { addToCart } = useCart() // Use the cart context
  const navigate = useNavigate() // Add this line

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [toasts, setToasts] = useState([])
  const [toastIdCounter, setToastIdCounter] = useState(0)
  const [wishlist, setWishlist] = useState([]) // Client-side wishlist

  const openDialog = (product) => {
    setSelectedProduct(product)
    setIsDialogOpen(true)
    setQuantity(1)
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
    setSelectedProduct(null)
  }

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
  }

  const formatTimestamp = () => {
    const now = new Date()
    const day = now.getDate().toString().padStart(2, "0")
    const month = (now.getMonth() + 1).toString().padStart(2, "0")
    const year = now.getFullYear()
    const hours = now.getHours().toString().padStart(2, "0")
    const minutes = now.getMinutes().toString().padStart(2, "0")
    const seconds = now.getSeconds().toString().padStart(2, "0")
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
  }

  const showToast = (message, type = "success") => {
    console.log("showToast called with message:", message)
    const id = toastIdCounter
    setToastIdCounter((prev) => prev + 1)
    const timestamp = formatTimestamp()
    const newToast = { id, message, type, timestamp }
    setToasts((prev) => [...prev, newToast])
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, 5000)
  }

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  const handleAddToWishlist = (product, e) => {
    e.preventDefault()
    e.stopPropagation()
    if (wishlist.find((item) => item.id === product.id)) {
      showToast(`${product.type} is already in your wishlist`, "success")
    } else {
      setWishlist((prev) => [...prev, product])
      showToast(`${product.type} successfully added to your wishlist`, "success")
    }
  }

  const handleAddToCart = (product, e) => {
    e.preventDefault()
    e.stopPropagation()
    if (product.availability === "Out of Stock") {
      showToast(product.message || "This product is currently out of stock.", "error")
    } else {
      addToCart(product, 1) // Use the cart context
      showToast(`${product.type} successfully added to cart`, "success")
    }
  }

  const handleAddToCartFromDialog = () => {
    if (selectedProduct.availability === "Out of Stock") {
      showToast(selectedProduct.message || "This product is currently out of stock.", "error")
    } else {
      addToCart(selectedProduct, quantity) // Use the cart context
      showToast(`${selectedProduct.type} successfully added to cart`, "success")
      closeDialog()
    }
  }

  // Add function to go to cart
  const goToCart = () => {
    navigate("/cart")
  }

  const goToShop = () =>{
    navigate("/shop")
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />)
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star size={16} className="text-gray-300" />
          <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
          </div>
        </div>,
      )
    }

    const remainingStars = 5 - Math.ceil(rating)
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={16} className="text-gray-300" />)
    }

    return stars
  }

  return (
    <div className="px-[20px] py-[50px] flex flex-col items-center justify-center sm:px-[20px] sm:py-[50px] md:px-[40px] lg:px-[100px] lg:py-[80px]">
      <h2 className="pb-2 text-[20px] md:text-[23px] lg:text-[26px] font-montserratBold lg:pb-3">New Products</h2>
      <p className="pb-5 text-sm md:text-[16px] lg:text-[18px] text-gray-500 text-center lg:pb-8">
        Discover our newest smartphone collection featuring sleek designs, powerful cameras, and top models like iPhone,
        Samsung Galaxy, and Nokia. Enjoy cutting-edge performance and innovative features that fit your lifestyle. Stay
        connected and ahead of the curve — shop now!
      </p>

      <div className="flex justify-between flex-wrap">
        {Database.map((card) => {
          return (
            <div
              key={card.id}
              className="mb-[20px] w-full md:w-[48%] lg:w-[30%] xl:w-[23%] relative gap-[4px] h-[400px] lg:mb-8 group"
            >
              <div className="relative w-full h-[300px] overflow-hidden">
                <img
                  loading="lazy"
                  src={(() => {
                    try {
                      return require("../Images/" + card.img) || "/placeholder.svg"
                    } catch (e) {
                      console.error("Image load error for", card.img, ":", e)
                      return "/placeholder.svg"
                    }
                  })()}
                  alt={card.type}
                  className="hover:scale-105 transition-transform duration-500 w-full object-cover h-full"
                />

                <div className="absolute top-0 right-4 h-full flex items-center gap-4 flex-col justify-center transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 opacity-0 translate-y-5">
                  <button
                    onClick={(e) => handleAddToWishlist(card, e)}
                    className="p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform hover:text-buttons"

//                   ></div>                    
                  >
                    <card.like size={16} />
                  </button>
                  <button
                    onClick={() => openDialog(card)}
                    className="p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform hover:text-buttons"
                  >
                    <card.search size={16} />
                  </button>
                  <button
                    onClick={(e) => handleAddToCart(card, e)}
                    className={`p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform hover:text-buttons ${
                      card.availability === "Out of Stock" ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={card.availability === "Out of Stock"}
                  >
                    {card.shop ? <card.shop size={16} /> : <ShoppingCart size={16} />}
                  </button>
                </div>
              </div>

              <p className="text-sm lg:text-[15px] font-montserrat pt-[10px] text-gray-600">{card.name}</p>
              <p className="text-[16px] font-montserratBold pt-[14px] leading-[1.1] lg:text-[18px] group-hover:text-buttons transition-colors duration-500">
                {card.type}
              </p>
              <p className="text-sm font-montserrat pt-[10px] text-gray-600 text-[16px]">${card.price}</p>
            </div>
          )
        })}
      </div>

      {/* <div className="flex justify-center items-center">
        <button className="p-2 w-[110px] relative lg:w-[180px] lg:p-3 xl:w-[120px] xl:p-[10px] border border-blue-600 overflow-hidden group">
          <div className="absolute top-0 left-0 w-0 h-full bg-blue-600 -skew-x-[45deg] transform transition-all duration-500 ease-out group-hover:w-[calc(100%+30px)] group-hover:-left-[30px]"></div>
          <div className="absolute top-0 right-0 w-0 h-full bg-blue-600 -skew-x-[45deg] transform transition-all duration-500 ease-out group-hover:w-[calc(100%+30px)] group-hover:-right-[30px]"></div>
          <span className="text-[12px] lg:text-[16px] xl:text-[14px] relative z-10 font-montserratBold text-blue-600 transition-all duration-500 ease-out group-hover:text-white group-hover:scale-110">
            View More
          </span>
        </button>
      </div> */}



{/* Button View more */}
      <div className="flex justify-center items-center">
        <button onClick={goToShop} className="p-2 w-[110px] relative lg:w-[180px] lg:p-3 border-2 border-buttons overflow-hidden group">
          {/* Background overlay elements */}
          <div className="absolute top-0 left-0 w-0 h-full bg-buttons -skew-x-[45deg] transform transition-all duration-500 ease-out group-hover:w-[calc(100%)] group-hover:-left-[30px]"></div>
          <div className="absolute top-0 right-0 w-0 h-full bg-buttons -skew-x-[45deg] transform transition-all duration-500 ease-out group-hover:w-[calc(100%)] group-hover:-right-[30px]"></div>

           {/* Text */}
           <span className="text-[12px] lg:text-[16px] relative z-10 font-montserratBold text-buttons transition-all duration-500 ease-out group-hover:text-white group-hover:scale-110">
             View More
           </span>
         </button>
       </div>

      {isDialogOpen && selectedProduct && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={closeDialog}
        >
          <div
            className="bg-white rounded-lg w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl max-h-[90vh] overflow-y-auto xl:overflow-hidden mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col lg:flex-row">
              <div className="flex-1 p-6 lg:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg lg:text-xl font-montserratBold text-gray-800">More about the product</h3>
                    <ChevronRight size={20} className="text-gray-600" />
                  </div>
                  <button onClick={closeDialog} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  <p className="text-sm lg:text-base font-montserrat text-gray-600">{selectedProduct.name}</p>
                  <h4 className="text-xl lg:text-2xl font-montserratBold text-gray-800">{selectedProduct.type}</h4>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">{renderStars(selectedProduct.rating || 4.5)}</div>
                    <span className="text-sm text-gray-600">({selectedProduct.rating || 4.5}/5)</span>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-montserratBold text-gray-800">Description</h5>
                    <p className="text-sm lg:text-base text-gray-600 leading-relaxed">{selectedProduct.description}</p>
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center gap-4">
                      <span className="font-montserratBold text-gray-800">Quantity:</span>
                      <div className="flex items-center border rounded-lg border-gray-200">
                        <button onClick={decrementQuantity} className="p-3 hover:bg-gray-100 transition-colors">
                          <Minus size={16} />
                        </button>
                        <span className="px-4 py-2 border-x border-gray-200 min-w-[50px] text-center text-sm">
                          {quantity}
                        </span>
                        <button onClick={incrementQuantity} className="p-3 hover:bg-gray-100 transition-colors">
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xl lg:text-2xl font-montserratBold text-blue-500">
                        ${selectedProduct.price}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 pt-6">
                    <button
                      onClick={handleAddToCartFromDialog}
                      className={`flex-1 bg-blue-500 text-white py-3 px-6 rounded-lg font-montserratBold hover:bg-blue-600 transition-colors ${
                        selectedProduct.availability === "Out of Stock" ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      disabled={selectedProduct.availability === "Out of Stock"}
                    >
                      Add to Cart
                    </button>
                    <button className="flex-1 bg-gray-800 text-white py-3 px-6 rounded-lg font-montserratBold hover:bg-gray-700 transition-colors">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 p-6 lg:p-8">
                <div className="w-full h-[300px] lg:h-[500px] rounded-lg overflow-hidden">
                  <img
                    src={(() => {
                      try {
                        return require("../Images/" + selectedProduct.img) || "/placeholder.svg"
                      } catch (e) {
                        console.error("Image load error for", selectedProduct.img, ":", e)
                        return "/placeholder.svg"
                      }
                    })()}
                    alt={selectedProduct.type}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast notifications with "Go to Cart" button */}
      <div className="fixed top-4 right-4 z-[1000] space-y-4 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-w-[300px] max-w-[400px] pointer-events-auto transform transition-all duration-300 ease-out opacity-100 translate-x-0 toast"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Check size={16} className="text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-montserratBold text-gray-900 mb-1">{toast.message}</p>
                <p className="text-xs text-gray-500 font-montserrat">{toast.timestamp}</p>
                {toast.message.includes("added to cart") && (
                  <button
                    onClick={goToCart}
                    className="text-xs text-blue-600 hover:text-blue-800 font-montserratBold mt-1"
                  >
                    Go to Cart →
                  </button>
                )}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="flex-shrink-0 p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X size={14} className="text-gray-400" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <style>
        {`
          @keyframes slideInFromRight {
            from {
              opacity: 0;
              transform: translateX(100%);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          .toast {
            animation: slideInFromRight 0.3s ease-out;
          }
          .font-montserrat {
            font-family: 'Montserrat', sans-serif;
            font-weight: 400;
          }
          .font-montserratBold {
            font-family: 'Montserrat', sans-serif;
            font-weight: 700;
          }
        `}
      </style>
    </div>
  )
}

export default Newproducts















// import { BASE_URL } from "./../config";
// import { useState } from "react"
// import { ChevronRight, Star, X, Plus, Minus, Check, ShoppingCart } from "lucide-react"
// import useFetch from "../lib/UseFetch"
// import { useCart } from "../components/shop/CartContext"
// import { useNavigate } from "react-router-dom"

// const Newproducts = () => {
//   const { addToCart } = useCart()
//   const navigate = useNavigate()


  
// const url = `${BASE_URL}/api/products`;
//   // Fetch products from your API
//   const { data: products, loading, error, refetch } = useFetch(url)

//   const [isDialogOpen, setIsDialogOpen] = useState(false)
//   const [selectedProduct, setSelectedProduct] = useState(null)
//   const [quantity, setQuantity] = useState(1)
//   const [toasts, setToasts] = useState([])
//   const [toastIdCounter, setToastIdCounter] = useState(0)
//   const [wishlist, setWishlist] = useState([])

//   const openDialog = (product) => {
//     setSelectedProduct(product)
//     setIsDialogOpen(true)
//     setQuantity(1)
//   }


  

//   const closeDialog = () => {
//     setIsDialogOpen(false)
//     setSelectedProduct(null)
//   }

//   const incrementQuantity = () => {
//     setQuantity((prev) => prev + 1)
//   }

//   const decrementQuantity = () => {
//     setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
//   }

//   const formatTimestamp = () => {
//     const now = new Date()
//     const day = now.getDate().toString().padStart(2, "0")
//     const month = (now.getMonth() + 1).toString().padStart(2, "0")
//     const year = now.getFullYear()
//     const hours = now.getHours().toString().padStart(2, "0")
//     const minutes = now.getMinutes().toString().padStart(2, "0")
//     const seconds = now.getSeconds().toString().padStart(2, "0")
//     return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
//   }

//   const showToast = (message, type = "success") => {
//     console.log("showToast called with message:", message)
//     const id = toastIdCounter
//     setToastIdCounter((prev) => prev + 1)
//     const timestamp = formatTimestamp()
//     const newToast = { id, message, type, timestamp }
//     setToasts((prev) => [...prev, newToast])
//     setTimeout(() => {
//       setToasts((prev) => prev.filter((toast) => toast.id !== id))
//     }, 5000)
//   }

//   const removeToast = (id) => {
//     setToasts((prev) => prev.filter((toast) => toast.id !== id))
//   }

//   const handleAddToWishlist = (product, e) => {
//     e.preventDefault()
//     e.stopPropagation()
//     if (wishlist.find((item) => item.id === product.id)) {
//       showToast(`${product.name || product.type} is already in your wishlist`, "success")
//     } else {
//       setWishlist((prev) => [...prev, product])
//       showToast(`${product.name || product.type} successfully added to your wishlist`, "success")
//     }
//   }

//   const handleAddToCart = (product, e) => {
//     e.preventDefault()
//     e.stopPropagation()
//     if (product.availability === "Out of Stock" || product.stock === 0) {
//       showToast(product.message || "This product is currently out of stock.", "error")
//     } else {
//       addToCart(product, 1)
//       showToast(`${product.name || product.type} successfully added to cart`, "success")
//     }
//   }

//   const handleAddToCartFromDialog = () => {
//     if (selectedProduct.availability === "Out of Stock" || selectedProduct.stock === 0) {
//       showToast(selectedProduct.message || "This product is currently out of stock.", "error")
//     } else {
//       addToCart(selectedProduct, quantity)
//       showToast(`${selectedProduct.name || selectedProduct.type} successfully added to cart`, "success")
//       closeDialog()
//     }
//   }

//   const goToCart = () => {
//     navigate("/cart")
//   }

//   const goToShop = () => {
//     navigate("/shop")
//   }

//   const renderStars = (rating) => {
//     const stars = []
//     const fullStars = Math.floor(rating)
//     const hasHalfStar = rating % 1 !== 0

//     for (let i = 0; i < fullStars; i++) {
//       stars.push(<Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />)
//     }

//     if (hasHalfStar) {
//       stars.push(
//         <div key="half" className="relative">
//           <Star size={16} className="text-gray-300" />
//           <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
//             <Star size={16} className="fill-yellow-400 text-yellow-400" />
//           </div>
//         </div>,
//       )
//     }

//     const remainingStars = 5 - Math.ceil(rating)
//     for (let i = 0; i < remainingStars; i++) {
//       stars.push(<Star key={`empty-${i}`} size={16} className="text-gray-300" />)
//     }

//     return stars
//   }

//   // Loading state
//   if (loading) {
//     return (
//       <div className="px-[20px] py-[50px] flex flex-col items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//         <p className="mt-4 text-gray-600">Loading products...</p>
//       </div>
//     )
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="px-[20px] py-[50px] flex flex-col items-center justify-center">
//         <div className="text-red-600 text-center">
//           <p className="text-lg font-semibold mb-2">Error loading products</p>
//           <p className="text-sm mb-4">{error}</p>
//           <button
//             onClick={refetch}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     )
//   }

//   // No products state
//   if (!products || products.length === 0) {
//     return (
//       <div className="px-[20px] py-[50px] flex flex-col items-center justify-center">
//         <p className="text-gray-600 text-center">No products available at the moment.</p>
//         <button
//           onClick={refetch}
//           className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//         >
//           Refresh
//         </button>
//       </div>
//     )
//   }

//   return (
//     <div className="px-[20px] py-[50px] flex flex-col items-center justify-center sm:px-[20px] sm:py-[50px] md:px-[40px] lg:px-[100px] lg:py-[80px]">
//       <h2 className="pb-2 text-[20px] md:text-[23px] lg:text-[26px] font-montserratBold lg:pb-3">New Products</h2>
//       <p className="pb-5 text-sm md:text-[16px] lg:text-[18px] text-gray-500 text-center lg:pb-8">
//         Discover our newest smartphone collection featuring sleek designs, powerful cameras, and top models like iPhone,
//         Samsung Galaxy, and Nokia. Enjoy cutting-edge performance and innovative features that fit your lifestyle. Stay
//         connected and ahead of the curve — shop now!
//       </p>

//       <div className="flex justify-between flex-wrap">
//         {products.map((card) => {
//           return (
//             <div
//               key={card.id}
//               className="mb-[20px] w-full md:w-[48%] lg:w-[30%] xl:w-[23%] relative gap-[4px] h-[400px] lg:mb-8 group"
//             >
//               <div className="relative w-full h-[300px] overflow-hidden">
//                 <img
//                   loading="lazy"
//                   src={card.imageUrl || card.img || "/placeholder.svg?height=300&width=300"}
//                   alt={card.name || card.type}
//                   className="hover:scale-105 transition-transform duration-500 w-full object-cover h-full"
//                   onError={(e) => {
//                     e.target.src = "/placeholder.svg?height=300&width=300"
//                   }}
//                 />

//                 <div className="absolute top-0 right-4 h-full flex items-center gap-4 flex-col justify-center transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 opacity-0 translate-y-5">
//                   <button
//                     onClick={(e) => handleAddToWishlist(card, e)}
//                     className="p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform hover:text-buttons"
//                   >
//                     <Star size={16} />
//                   </button>
//                   <button
//                     onClick={() => openDialog(card)}
//                     className="p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform hover:text-buttons"
//                   >
//                     <ChevronRight size={16} />
//                   </button>
//                   <button
//                     onClick={(e) => handleAddToCart(card, e)}
//                     className={`p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform hover:text-buttons ${
//                       card.availability === "Out of Stock" || card.stock === 0 ? "opacity-50 cursor-not-allowed" : ""
//                     }`}
//                     disabled={card.availability === "Out of Stock" || card.stock === 0}
//                   >
//                     <ShoppingCart size={16} />
//                   </button>
//                 </div>
//               </div>

//               <p className="text-sm lg:text-[15px] font-montserrat pt-[10px] text-gray-600">{card.name}</p>
//               <p className="text-[16px] font-montserratBold pt-[14px] leading-[1.1] lg:text-[18px] group-hover:text-buttons transition-colors duration-500">
//                 {card.type || card.name}
//               </p>
//               <p className="text-sm font-montserrat pt-[10px] text-gray-600 text-[16px]">${card.price}</p>
//               {(card.availability === "Out of Stock" || card.stock === 0) && (
//                 <p className="text-sm text-red-500 font-semibold">Out of Stock</p>
//               )}
//             </div>
//           )
//         })}
//       </div>

//       {/* View More Button */}
//       <div className="flex justify-center items-center">
//         <button
//           onClick={goToShop}
//           className="p-2 w-[110px] relative lg:w-[180px] lg:p-3 border-2 border-buttons overflow-hidden group"
//         >
//           <div className="absolute top-0 left-0 w-0 h-full bg-buttons -skew-x-[45deg] transform transition-all duration-500 ease-out group-hover:w-[calc(100%)] group-hover:-left-[30px]"></div>
//           <div className="absolute top-0 right-0 w-0 h-full bg-buttons -skew-x-[45deg] transform transition-all duration-500 ease-out group-hover:w-[calc(100%)] group-hover:-right-[30px]"></div>
//           <span className="text-[12px] lg:text-[16px] relative z-10 font-montserratBold text-buttons transition-all duration-500 ease-out group-hover:text-white group-hover:scale-110">
//             View More
//           </span>
//         </button>
//       </div>

//       {/* Product Dialog */}
//       {isDialogOpen && selectedProduct && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
//           onClick={closeDialog}
//         >
//           <div
//             className="bg-white rounded-lg w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl max-h-[90vh] overflow-y-auto xl:overflow-hidden mx-4"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="flex flex-col lg:flex-row">
//               <div className="flex-1 p-6 lg:p-8">
//                 <div className="flex items-center justify-between mb-6">
//                   <div className="flex items-center gap-2">
//                     <h3 className="text-lg lg:text-xl font-montserratBold text-gray-800">More about the product</h3>
//                     <ChevronRight size={20} className="text-gray-600" />
//                   </div>
//                   <button onClick={closeDialog} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
//                     <X size={20} />
//                   </button>
//                 </div>

//                 <div className="space-y-4">
//                   <p className="text-sm lg:text-base font-montserrat text-gray-600">{selectedProduct.name}</p>
//                   <h4 className="text-xl lg:text-2xl font-montserratBold text-gray-800">
//                     {selectedProduct.type || selectedProduct.name}
//                   </h4>
//                   <div className="flex items-center gap-2">
//                     <div className="flex items-center gap-1">{renderStars(selectedProduct.rating || 4.5)}</div>
//                     <span className="text-sm text-gray-600">({selectedProduct.rating || 4.5}/5)</span>
//                   </div>
//                   <div className="space-y-2">
//                     <h5 className="font-montserratBold text-gray-800">Description</h5>
//                     <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
//                       {selectedProduct.description || "High-quality product with excellent features and performance."}
//                     </p>
//                   </div>
//                   <div className="flex items-center justify-between pt-4">
//                     <div className="flex items-center gap-4">
//                       <span className="font-montserratBold text-gray-800">Quantity:</span>
//                       <div className="flex items-center border rounded-lg border-gray-200">
//                         <button onClick={decrementQuantity} className="p-3 hover:bg-gray-100 transition-colors">
//                           <Minus size={16} />
//                         </button>
//                         <span className="px-4 py-2 border-x border-gray-200 min-w-[50px] text-center text-sm">
//                           {quantity}
//                         </span>
//                         <button onClick={incrementQuantity} className="p-3 hover:bg-gray-100 transition-colors">
//                           <Plus size={16} />
//                         </button>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <span className="text-xl lg:text-2xl font-montserratBold text-blue-500">
//                         ${selectedProduct.price}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="flex flex-col sm:flex-row gap-3 pt-6">
//                     <button
//                       onClick={handleAddToCartFromDialog}
//                       className={`flex-1 bg-blue-500 text-white py-3 px-6 rounded-lg font-montserratBold hover:bg-blue-600 transition-colors ${
//                         selectedProduct.availability === "Out of Stock" || selectedProduct.stock === 0
//                           ? "opacity-50 cursor-not-allowed"
//                           : ""
//                       }`}
//                       disabled={selectedProduct.availability === "Out of Stock" || selectedProduct.stock === 0}
//                     >
//                       Add to Cart
//                     </button>
//                     <button className="flex-1 bg-gray-800 text-white py-3 px-6 rounded-lg font-montserratBold hover:bg-gray-700 transition-colors">
//                       Buy Now
//                     </button>
//                   </div>
//                 </div>
//               </div>
//               <div className="lg:w-1/2 p-6 lg:p-8">
//                 <div className="w-full h-[300px] lg:h-[500px] rounded-lg overflow-hidden">
//                   <img
//                     src={selectedProduct.imageUrl || selectedProduct.img || "/placeholder.svg?height=500&width=500"}
//                     alt={selectedProduct.name || selectedProduct.type}
//                     className="w-full h-full object-cover"
//                     onError={(e) => {
//                       e.target.src = "/placeholder.svg?height=500&width=500"
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Toast notifications */}
//       <div className="fixed top-4 right-4 z-[1000] space-y-4 pointer-events-none">
//         {toasts.map((toast) => (
//           <div
//             key={toast.id}
//             className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-w-[300px] max-w-[400px] pointer-events-auto transform transition-all duration-300 ease-out opacity-100 translate-x-0 toast"
//           >
//             <div className="flex items-start gap-3">
//               <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
//                 <Check size={16} className="text-green-600" />
//               </div>
//               <div className="flex-1 min-w-0">
//                 <p className="text-sm font-montserratBold text-gray-900 mb-1">{toast.message}</p>
//                 <p className="text-xs text-gray-500 font-montserrat">{toast.timestamp}</p>
//                 {toast.message.includes("added to cart") && (
//                   <button
//                     onClick={goToCart}
//                     className="text-xs text-blue-600 hover:text-blue-800 font-montserratBold mt-1"
//                   >
//                     Go to Cart →
//                   </button>
//                 )}
//               </div>
//               <button
//                 onClick={() => removeToast(toast.id)}
//                 className="flex-shrink-0 p-1 hover:bg-gray-100 rounded transition-colors"
//               >
//                 <X size={14} className="text-gray-400" />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       <style>
//         {`
//           @keyframes slideInFromRight {
//             from {
//               opacity: 0;
//               transform: translateX(100%);
//             }
//             to {
//               opacity: 1;
//               transform: translateX(0);
//             }
//           }
//           .toast {
//             animation: slideInFromRight 0.3s ease-out;
//           }
//           .font-montserrat {
//             font-family: 'Montserrat', sans-serif;
//             font-weight: 400;
//           }
//           .font-montserratBold {
//             font-family: 'Montserrat', sans-serif;
//             font-weight: 700;
//           }
//         `}
//       </style>
//     </div>
//   )
// }

// export default Newproducts
