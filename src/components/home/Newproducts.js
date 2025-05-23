
import React from 'react'
import { NavLink } from 'react-router-dom'
import Database from '../Database'


const Newproducts = () => {

    
  return (
    <div className='px-[20px] py-[50px] flex flex-col items-center justify-center sm:px-[20px] sm:py-[50px] md:px-[40px] lg:px-[100px] lg:py-[80px] '>
   <h2 className="  pb-2 text-[20px] md:text-[23px]  lg:text-[26px] font-montserratBold lg:pb-3"> New Products</h2>
   <p className=' pb-5  text-sm md:text-[16px] lg:text-[18px] text-gray-500 text-center  lg:pb-8'>Discover our newest smartphone collection featuring sleek designs, powerful cameras, and 
    top models like iPhone, Samsung Galaxy, and Nokia. Enjoy cutting-edge performance and innovative
     features that fit your lifestyle.Stay connected and ahead of the curve — shop now!</p>
      
      <div className="flex justify-between flex-wrap">
        {
        Database.map((card,index)=> (
            <div className= "mb-[20px] w-full   md:w-[48%]   lg:w-[30%] xl:w-[23%] relative gap-[4px] h-[400px] lg:mb-8 group ">
               <div className="relative w-full h-[300px] overflow-hidden">
                <img loading='lazy'  src={require("../Images/" + card.img) } alt="" className="hover:scale-105 transition-transform duration-500  w-full object-cover h-full  " />
                 
                  {/* Icons Container */}
                                  <div className="absolute top-0 right-4 h-full flex items-center gap-4 flex-col justify-center opacity-0 translate-y-5 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                                    <NavLink className="p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform hover:text-buttons">
                                      <card.like size={18} />
                                    </NavLink>
                                    <NavLink className="p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform hover:text-buttons">
                                      <card.search size={18} />
                                    </NavLink>
                                    <NavLink className="p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform hover:text-buttons">
                                      <card.shop size={18} />
                                    </NavLink>
                                  </div>
                                   

                </div>
                <p className='text-sm       lg:text-[16px] font-montserrat pt-[10px] text-gray-500'>{card.name}</p>
                <p className='text-[16px]    font-montserratBold pt-[10px] lg:text-[18px] group-hover:text-buttons duration-500 '>{card.type}</p>
                <p className='text-sm    font-montserrat pt-[10px] text-gray-500 text-[16px]'>{card.price}</p>

               
            </div>
         ))   
        }
      </div>
{/* {Button View more} */}
      <div className=" flex justify-center  items-center">
  <button className=" p-2 w-[110px] relative lg:w-[180px] lg:p-3 border-2 border-buttons overflow-hidden group">
    {/* Background overlay elements */}
    <div className="absolute top-0 left-0 w-0 h-full bg-buttons -skew-x-[45deg] transform transition-all duration-500 ease-out group-hover:w-[calc(100%)] group-hover:-left-[30px]"></div>
    <div className="absolute top-0 right-0 w-0 h-full bg-buttons -skew-x-[45deg] transform transition-all duration-500 ease-out group-hover:w-[calc(100%)] group-hover:-right-[30px]"></div>
    
    {/* Text */}
    <span className="text-[12px]   lg:text:[16px] relative z-10 font-montserratBold text-buttons transition-all duration-500 ease-out group-hover:text-white group-hover:scale-110">
      View More
    </span>
  </button>
</div>



        </div>
  )
}

export default Newproducts