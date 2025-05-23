import {   Phone  } from 'lucide-react'
import React from 'react'
import {HiLocationMarker} from "react-icons/hi"
import { FaRegEnvelopeOpen} from 'react-icons/fa6';
import { FiFacebook } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";



const Footer = () => {
     
    // const links = [
    //     {type:"Navigation", des1:"Home", des2:"Pages" , des3:"Shop" , des4:"Blogs"},
    //     {type:"Quick Link", des1:"Contact Us", des2:"FAQS" , des3:"Bookings" , des4:"Pages"},
    //     {type:"Services", des1:"Home", des2:"Contact" , des3:"Blog" , des4:"404"},
    // ]

    // const blinks = [
    //     {  icon:HiLocationMarker,type:"Lucky Street"},
    //     {icon:Phone,type:"+263-774006306"},
    //     {icon: FaRegEnvelopeOpen,type:"type@gmail.com"}
    // ]
  
    // const icons = [
    //     {icon: FiFacebook},
    //     {icon:FaInstagram},
    //     {icon:FaXTwitter}
    // ]


  return (
    <div className= "flex flex-col justify-between items-center bg-navbar px-5 py-[50px] md:px-[40px] lg:px-[80px] xl:px-[100px]  md:py-[60px] lg:py-[60px] xl:py-[80px]">
        {/* <div className="flex w-full flex-wrap md:flex-nowrap justify-between">

            <div className="flex  w-[45%] flex-col">
                <h3 className='font-montserratBold pb-3 text-[18px] text-white'>TechRevive</h3>
                <p className='sm:text-sm md:text-[15px] lg:text-[16px]  text-white font-montserrat text-[16px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis esse non volupt!</p>
            </div>

       <div className="flex w-[68%] justify-between">
          {
            links.map((types,index) =>(
                <div key={index} className=" w-[30%]">
                 <h3 className='font-montserratBold pb-3 text-[18px text-white '>  {types.type}</h3>
                 <p className='font-montserrat text-white text-[16px]'>{types.des1}</p>
                 <p className='font-montserrat text-white text-[16px]'>{types.des2}</p>
                 <p className='font-montserrat text-white text-[16px]'>{types.des3}</p>
                 <p className='font-montserrat text-white text-[16px]'>{types.des4}</p>
                </div>
            ))
          }
       </div>
            
        </div> */}

<div className="flex w-full flex-wrap md:flex-nowrap  justify-between md:flex-row ">
    {/* First section - 25% */}
    <div className=" w-[45%] pb-8 md:pb-0 md:w-[23%]  flex flex-col">
        <h3 className='font-montserratBold pb-2 md:pb-3 text-[18px] text-white'>TechRevive</h3>
        <p className='sm:text-sm md:text-[15px] lg:text-[16px] text-white font-montserrat text-[16px]'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis esse non volupt!
        </p>
    </div>
    
    {/* Remaining 75% divided into 3 equal parts (25% each) */}
    <div className="w-[45%] md:w-[23%]  flex flex-wrap flex-col  gap-2">
        
           
                <h3 className='font-montserratBold pb-2 md:pb-3 text-[18px] text-white'>Navigation</h3>
                <p className='font-montserrat text-white text-sm md:text-[16px]'>Home</p>
                <p className='font-montserrat text-white text-sm md:text-[16px]'>Pages</p>
                <p className='font-montserrat text-white text-sm md:text-[16px]'>Shop</p>
                <p className='font-montserrat text-white text-sm md:text-[16px]'>Blogs</p>
           
     
    </div>

    <div className="w-[45%] md:w-[23%]   flex flex-wrap flex-col  gap-2">
        
           
                <h3 className='font-montserratBold pb-2 md:pb-3 text-[18px] text-white'>Quick Link</h3>
                <p className='font-montserrat text-white text-sm md:text-[16px]'>Contact Us</p>
                <p className='font-montserrat text-white text-sm md:text-[16px]'>FAQS</p>
                <p className='font-montserrat text-white text-sm md:text-[16px]'>Bookings </p>
                <p className='font-montserrat text-white text-sm md:text-[16px]'>Pages</p>
           
     
    </div>

    <div className="w-[45%] md:w-[23%]   flex flex-wrap flex-col gap-2">
        
           
                <h3 className='font-montserratBold pb-2 md:pb-3 text-[18px] text-white'>Services</h3>
                <p className='font-montserrat text-white text-sm md:text-[16px]'>Home</p>
                <p className='font-montserrat text-white text-sm md:text-[16px]'>Contact</p>
                <p className='font-montserrat text-white text-sm md:text-[16px]'>Blog</p>
                <p className='font-montserrat text-white text-sm md:text-[16px]'>404</p>
           
     
    </div>
</div>
       


{/* Second section stays the same but with equal spacing */}
<div className="flex w-full flex-wrap md:flex-nowrap  md:flex-row justify-between  pt-6">
   
       
            <div className="flex pt-3 pb-6 md:pb-0   w-[45%] md:w-[23%] items-center gap-2">
                <HiLocationMarker className='h-[25px] w-[25px] text-white font-montserrat'/>
                <p className='font-montserrat text-white text-sm md:text-sm lg:text-[16px]'>Lucky Street</p>
            </div>

            <div className="flex pt-3 pb-6 md:pb-0  w-[45%] md:w-[23%] items-center gap-2">
                <Phone className='h-[25px] w-[25px] text-white font-montserrat'/>
                <p className='font-montserrat text-white text-sm md:text-sm lg:text-[16px]'>+263-774006306</p>
            </div>

            <div className="flex  w-[45%] md:w-[23%] items-center gap-2">
                <FaRegEnvelopeOpen className='h-[25px] w-[25px] text-white font-montserrat'/>
                <p className='font-montserrat text-white text-sm md:text-sm lg:text-[16px]'>type@gmail.com</p>
            </div>
      
  

    <div className=" w-[45%] md:w-[23%]  flex items-center justify-end gap-11">
        
            <div  className="flex gap-5">
                <FiFacebook className='w-[25px] h-[25px] text-white font-montserrat'/>
                <FaInstagram className='w-[25px] h-[25px] text-white font-montserrat'/>
                <FaXTwitter className='w-[25px] h-[25px] text-white font-montserrat'/>
            </div>
     
    </div>
</div>


        <div className='w-full mt-8 border'><span></span></div>
         
         <p className='text-sm text-white pt-3 md:pt-4 lg:pt-5 xl:pt-6 md:text-[16px] lg:text-[16px] font-montserrat '>@2025 CreativeTech. All Rights Reserved </p>
    </div>
  )
}

export default Footer