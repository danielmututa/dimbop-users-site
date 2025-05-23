import { Check, X } from 'lucide-react'
import React from 'react'
import Fastdelivary from '../home/Fastdelivary'

const Whilelist = () => {

    const whilist = [
         {
            img:"IphonBxed.jpg",type:"Iphone",name:"iPhone 13 Pro Max",price:"$200", stockstatus:"out of stock", icon:X
         },
         {
            img:"IphoneSiv.jpg",type:"Iphone",name:"iPhone 15 Pro Max",price:"$450", stockstatus:"Availale", icon:Check
         }
    ]

  return (
    <div className="pb-[50px] md:pb-[60px]  xl:pb-20">
   <div className=' pt-[80px] md:pt-[80px] lg:pt-[90px] xl:pt-[100px]  px-5 md:px-10 lg:px-[80px] xl:px-[100px] pb-[50px] md:pb-[60px] xl:pb-[80px]'> 
      <h2 className='font-montserratBold text-[20px] md:text-[23px] xl:text-[26px]'>Whilelist</h2>
      <div className="w-full mt-4 md:mt-6 lg:mt-8 xl:mt-10 items-center flex justify-between ">
        <div className="w-[33%] xl:w-[44%] font-montserrat text-sm  md:text-[16px] text-[18px] "><p>PRODUCT</p></div>
        <div className="w-[60%] md:w-[44%] xl:w-[44%] font-montserrat  flex gap-5 md:gap-10 lg:gap-14 xl:gap-20">
            <p className=" font-montserrat text-sm  md:text-[16px] text-[18px] ">PRICE</p>
            <p  className=" font-montserrat text-sm  md:text-[16px] text-[18px] ">STOCK STATUS</p>
        </div>
      </div>
      <div className="w-full border border-buttons mb-4 mt-2"></div>
      <div className="flex justify-between  flex-col gap-5">
        {
            whilist.map((whilelist,index) =>(
                <div className="flex items-center justify-between w-full">

                    <div className="flex flex-col md:flex-row w-[33%] md:w-[44%] items-start md:items-center  gap-1 md:gap-5 lg:gap-8">
                    <img src={require("../Images/" + whilelist.img)} className='h-[100px] w-[100px] object-cover' alt="" />
                    <div className="flex gap-1 md:gap-3 flex-col">
                        <p className='font-montserratBold text-sm md:text-[16px] xl:text-[18px]'>{whilelist.type}</p>
                        <p className='font-montserrat text-[12px] md:text-[16px] xl:text-[18px]'>{whilelist.name}</p>
                    </div>
                    </div>

                    <div className=" w-[60%] md:w-[44%] font-montserrat  flex   gap-2 md:gap-16 xl:gap-20">
                        <div className="flex gap-7 md:gap-10 lg:gap-16 xl:gap-20 w-[350px] md:w-[250px] ">

                    <p className='font-montserrat text-sm md:text-[16px] xl:text-[18px]'>{whilelist.price}</p>
                    <p className='font-montserrat text-sm md:text-[16px] xl:text-[18px]'>{whilelist.stockstatus}</p>
                        </div>
                    <whilelist.icon size={28} />
                  </div>
                </div>
            ))
        }
      </div>
   </div>

   <Fastdelivary/>
   </div>
  )
}

export default Whilelist