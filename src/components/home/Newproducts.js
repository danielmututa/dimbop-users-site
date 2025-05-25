
// import React from 'react'
// import { NavLink } from 'react-router-dom'
// import Database from '../Database'


// const Newproducts = () => {

    
//   return (
//     <div className='px-[20px] py-[50px] flex flex-col items-center justify-center sm:px-[20px] sm:py-[50px] md:px-[40px] lg:px-[100px] lg:py-[80px] '>
//    <h2 className="  pb-2 text-[20px] md:text-[23px]  lg:text-[26px] font-montserratBold lg:pb-3"> New Products</h2>
//    <p className=' pb-5  text-sm md:text-[16px] lg:text-[18px] text-gray-500 text-center  lg:pb-8'>Discover our newest smartphone collection featuring sleek designs, powerful cameras, and 
//     top models like iPhone, Samsung Galaxy, and Nokia. Enjoy cutting-edge performance and innovative
//      features that fit your lifestyle.Stay connected and ahead of the curve — shop now!</p>
      
//       <div className="flex justify-between flex-wrap">
//         {
//         Database.map((card,index)=> (
//             <div className= "mb-[20px] w-full   md:w-[48%]   lg:w-[30%] xl:w-[23%] relative gap-[4px] h-[400px] lg:mb-8 group ">
//                <div className="relative w-full h-[300px] overflow-hidden">
//                 <img loading='lazy'  src={require("../Images/" + card.img) } alt="" className="hover:scale-105 transition-transform duration-500  w-full object-cover h-full  " />
                 
//                   {/* Icons Container */}
//                                   <div className="absolute top-0 right-4 h-full flex items-center gap-4 flex-col justify-center opacity-0 translate-y-5 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
//                                     <NavLink className="p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform hover:text-buttons">
//                                       <card.like size={18} />
//                                     </NavLink>
//                                     <NavLink className="p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform hover:text-buttons">
//                                       <card.search size={18} />
//                                     </NavLink>
//                                     <NavLink className="p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform hover:text-buttons">
//                                       <card.shop size={18} />
//                                     </NavLink>
//                                   </div>
                                   

//                 </div>
//                 <p className='text-sm       lg:text-[16px] font-montserrat pt-[10px] text-gray-500'>{card.name}</p>
//                 <p className='text-[16px]    font-montserratBold pt-[10px] lg:text-[18px] group-hover:text-buttons duration-500 '>{card.type}</p>
//                 <p className='text-sm    font-montserrat pt-[10px] text-gray-500 text-[16px]'>{card.price}</p>

               
//             </div>
//          ))   
//         }
//       </div>
// {/* {Button View more} */}
//       <div className=" flex justify-center  items-center">
//   <button className=" p-2 w-[110px] relative lg:w-[180px] lg:p-3 border-2 border-buttons overflow-hidden group">
//     {/* Background overlay elements */}
//     <div className="absolute top-0 left-0 w-0 h-full bg-buttons -skew-x-[45deg] transform transition-all duration-500 ease-out group-hover:w-[calc(100%)] group-hover:-left-[30px]"></div>
//     <div className="absolute top-0 right-0 w-0 h-full bg-buttons -skew-x-[45deg] transform transition-all duration-500 ease-out group-hover:w-[calc(100%)] group-hover:-right-[30px]"></div>
    
//     {/* Text */}
//     <span className="text-[12px]   lg:text:[16px] relative z-10 font-montserratBold text-buttons transition-all duration-500 ease-out group-hover:text-white group-hover:scale-110">
//       View More
//     </span>
//   </button>
// </div>



//         </div>
//   )
// }

// export default Newproducts





import { useState } from "react"
import { NavLink } from "react-router-dom"
import { ChevronRight, Star, X, Plus, Minus } from "lucide-react"
import Database from "../Database"

const Newproducts = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)

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
        {Database.map((card, index) => (
          <div
            key={index}
            className="mb-[20px] w-full md:w-[48%] lg:w-[30%] xl:w-[23%] relative gap-[4px] h-[400px] lg:mb-8 group"
          >
            <div className="relative w-full h-[300px] overflow-hidden">
              <img
                loading="lazy"
                src={require("../Images/" + card.img) || "/placeholder.svg"}
                alt=""
                className="hover:scale-105 transition-transform duration-500 w-full object-cover h-full"
              />

              {/* Icons Container */}
              <div className="absolute top-0 right-4 h-full flex items-center gap-4 flex-col justify-center opacity-0 translate-y-5 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                <NavLink className="p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform hover:text-buttons">
                  <card.like size={18} />
                </NavLink>
                <button
                  onClick={() => openDialog(card)}
                  className="p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform hover:text-buttons"
                >
                  <card.search size={18} />
                </button>
                <NavLink className="p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform hover:text-buttons">
                  <card.shop size={18} />
                </NavLink>
              </div>
            </div>

            <p className="text-sm lg:text-[16px] font-montserrat pt-[10px] text-gray-500">{card.name}</p>
            <p className="text-[16px] font-montserratBold pt-[10px] lg:text-[18px] group-hover:text-buttons duration-500">
              {card.type}
            </p>
            <p className="text-sm font-montserrat pt-[10px] text-gray-500 text-[16px]">{card.price}</p>
          </div>
        ))}
      </div>

      {/* Button View more */}
      <div className="flex justify-center items-center">
        <button className="p-2 w-[110px] relative lg:w-[180px] lg:p-3 border-2 border-buttons overflow-hidden group">
          {/* Background overlay elements */}
          <div className="absolute top-0 left-0 w-0 h-full bg-buttons -skew-x-[45deg] transform transition-all duration-500 ease-out group-hover:w-[calc(100%)] group-hover:-left-[30px]"></div>
          <div className="absolute top-0 right-0 w-0 h-full bg-buttons -skew-x-[45deg] transform transition-all duration-500 ease-out group-hover:w-[calc(100%)] group-hover:-right-[30px]"></div>

          {/* Text */}
          <span className="text-[12px] lg:text-[16px] relative z-10 font-montserratBold text-buttons transition-all duration-500 ease-out group-hover:text-white group-hover:scale-110">
            View More
          </span>
        </button>
      </div>

      {/* Dialog */}
     {isDialogOpen && selectedProduct && (
  <div 
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    onClick={closeDialog}
  >
    <div 
      className="bg-white rounded-lg w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl max-h-[90vh] overflow-y-auto  xl:overflow-hidden mx-4"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col lg:flex-row">
        {/* Left Side - Product Details */}
        <div className="flex-1 p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <h3 className="text-lg lg:text-xl font-montserratBold text-gray-800">More about the product</h3>
              <ChevronRight size={20} className="text-gray-600" />
            </div>
            <button onClick={closeDialog} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            <p className="text-sm lg:text-base font-montserrat text-gray-500">{selectedProduct.name}</p>

            <h4 className="text-xl lg:text-2xl font-montserratBold text-gray-800">{selectedProduct.type}</h4>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">{renderStars(4.5)}</div>
              <span className="text-sm text-gray-600">(4.5/5)</span>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h5 className="font-montserratBold text-gray-800">Description</h5>
              <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                Experience cutting-edge technology with this premium smartphone. Featuring advanced camera
                capabilities, lightning-fast performance, and sleek design that fits perfectly in your hand. Built
                with premium materials and innovative features that enhance your daily digital experience.
              </p>
            </div>

            {/* Quantity and Price */}
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-3">
                <span className="font-montserratBold text-gray-800">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button onClick={decrementQuantity} className="p-2 hover:bg-gray-100 transition-colors">
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300 min-w-[50px] text-center">{quantity}</span>
                  <button onClick={incrementQuantity} className="p-2 hover:bg-gray-100 transition-colors">
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xl lg:text-2xl font-montserratBold text-buttons">
                  {selectedProduct.price}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6">
              <button className="flex-1 bg-buttons text-white py-3 px-6 rounded-lg font-montserratBold hover:bg-opacity-90 transition-colors">
                Add to Cart
              </button>
              <button className="flex-1 bg-gray-800 text-white py-3 px-6 rounded-lg font-montserratBold hover:bg-gray-700 transition-colors">
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Product Image */}
        <div className="lg:w-1/2 p-6 lg:p-8">
          <div className="w-full h-[300px] lg:h-[500px] rounded-lg overflow-hidden">
            <img
              src={require("../Images/" + selectedProduct.img) || "/placeholder.svg"}
              alt={selectedProduct.type}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  )
}

export default Newproducts
