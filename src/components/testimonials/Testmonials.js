// import { QuoteIcon } from 'lucide-react'
// import React , { useEffect, useState }from 'react'

// const Testmonials = () => {
//     const [currentIndex, setCurrentIndex] = useState(0);
// const testmonials =[
//     {icon:QuoteIcon, img:"John Carter.jpg", name:"John Carter", role:"Tech Enthusiast", Comment:"I’ve been exploring gadgets for years, and these services are unmatched.The customization options and technical precision truly impressed me.I’ll definitely recommend them to anyone seeking quality solutions." },
//     {icon:QuoteIcon, img:"Sophia Lee.jpg", name:"Sophia Lee", role:"Digital Marketer", Comment:"The refurbished devices were like a breath of fresh air—affordable and reliable.They delivered excellent value without any compromise in quality.Truly a game-changer for small businesses like mine!" },
//     {icon:QuoteIcon, img:"Michael Roberts.jpg", name:"Michael Roberts", role:"IT Specialist", Comment:"My laptop was running sluggishly, but their upgrades made it feel brand new.Everything from response time to performance has improved dramatically.I am beyond satisfied with the results of their work." },
//     {icon:QuoteIcon, img:"Emily Chen.jpg", name:"Emily Chen", role:"Content Creator", Comment:"Editing videos on my custom-built PC is a game-changer.It’s fast, efficient, and tailored to handle my intensive workloads.This service has boosted my productivity immensely!" },
//     {icon:QuoteIcon, img:"James Wright.jpg", name:"James Wright", role:"Student", Comment:"I struggled to set up my laptop, but their support team made it so simple.Their guidance helped me optimize my device for maximum productivity.They made the entire process stress-free and enjoyable." },
//     {icon:QuoteIcon, img:"Aisha Khan.jpg", name:"Aisha Khan", role:"Small Business Owner", Comment:"Knowing my old gadgets were recycled responsibly gives me peace of mind.Their efforts toward sustainability are truly commendable.I’m proud to support a service that values the planet." },
//     {icon:QuoteIcon, img:"David Smith.jpg", name:"David Smith", role:"Photographer", Comment:"I thought I’d lost my project files forever, but they recovered them!Their expertise saved my career from a major setback.I’m forever grateful for their incredible service." },
//     {icon:QuoteIcon, img:"Maria Gonzalez.jpg", name:"Maria Gonzalez", role:" Homemaker", Comment:"My smart home system is now seamlessly integrated and easy to use.It adds a touch of luxury and so much convenience to my daily routine.I’m amazed by how much easier life has become!" },
// ]

// useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => 
//         prevIndex === testimonials.length - 2 ? 0 : prevIndex + 1
//       );
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);


//   return (
//     <div className='py-[80px]' >
// <div className="flex gap-14 flex-wrap  relative overflow-hidden w-full">
  




//     {
//      testmonials.map((card,index) => (

//           <div className="relative  w-[35%] flex flex-col gap-7  ">
//         <p className='font-montserrat pt-10'> {card.Comment}</p>
//         <div className="flex items-center gap-3"> 
//             <img src={require("../Images/" + card.img)} className='h-12 w-12 rounded-full object-cover' alt="" />

//             <div className="flex flex-col ">
//               <h4 className='font-montserratBold text-buttons '>{card.name}</h4>
//               <p className='font-montserrat text'>{card.role}</p>

//             </div>
//         </div>

//         < card.icon size={30} className='text-buttons absolute top-[-5]'  />
//        </div>

//      ))
    
    
//     }
// </div>
       
//     </div>
//   )
// }

// export default Testmonials














import { QuoteIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const Testimonials = () => {
  const [position, setPosition] = useState(0);
  const testimonials = [
    {icon:QuoteIcon, img:"Sophia Lee.jpg", name:"Sophia Lee", role:"Digital Marketer", Comment:"The refurbished devices were like a breath of fresh air—affordable and reliable.They delivered excellent value without any compromise in quality.Truly a game-changer for small businesses like mine!" },
    // ... rest of your testimonials array ...
    {icon:QuoteIcon, img:"Sophia Lee.jpg", name:"Sophia Lee", role:"Digital Marketer", Comment:"The refurbished devices were like a breath of fresh air—affordable and reliable.They delivered excellent value without any compromise in quality.Truly a game-changer for small businesses like mine!" },
    {icon:QuoteIcon, img:"Michael Roberts.jpg", name:"Michael Roberts", role:"IT Specialist", Comment:"My laptop was running sluggishly, but their upgrades made it feel brand new.Everything from response time to performance has improved dramatically.I am beyond satisfied with the results of their work." },
    {icon:QuoteIcon, img:"Emily Chen.jpg", name:"Emily Chen", role:"Content Creator", Comment:"Editing videos on my custom-built PC is a game-changer.It’s fast, efficient, and tailored to handle my intensive workloads.This service has boosted my productivity immensely!" },
    {icon:QuoteIcon, img:"James Wright.jpg", name:"James Wright", role:"Student", Comment:"I struggled to set up my laptop, but their support team made it so simple.Their guidance helped me optimize my device for maximum productivity.They made the entire process stress-free and enjoyable." },
    {icon:QuoteIcon, img:"Aisha Khan.jpg", name:"Aisha Khan", role:"Small Business Owner", Comment:"Knowing my old gadgets were recycled responsibly gives me peace of mind.Their efforts toward sustainability are truly commendable.I’m proud to support a service that values the planet." },
    {icon:QuoteIcon, img:"David Smith.jpg", name:"David Smith", role:"Photographer", Comment:"I thought I’d lost my project files forever, but they recovered them!Their expertise saved my career from a major setback.I’m forever grateful for their incredible service." },
    {icon:QuoteIcon, img:"Maria Gonzalez.jpg", name:"Maria Gonzalez", role:" Homemaker", Comment:"My smart home system is now seamlessly integrated and easy to use.It adds a touch of luxury and so much convenience to my daily routine.I’m amazed by how much easier life has become!" },
  ];

  // Create a duplicated array for seamless looping
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  useEffect(() => {
    const animation = setInterval(() => {
      setPosition((prevPosition) => {
        // Reset position when we've scrolled through all original items
        if (prevPosition >= testimonials.length * 35) {
          return 0;
        }
        return prevPosition + 0.5; // Smaller increment for smoother movement
      });
    }, 100); // Smaller interval for smoother animation

    return () => clearInterval(animation);
  }, [testimonials.length]);

  return (
    <div className=' pb-[50px] md:pb-[60px] xl:pb-[80px]'>
      <div className="relative overflow-hidden w-full">
        <div 
          className="flex gap-14 transition-transform duration-300 ease-linear"
          style={{
            transform: `translateX(-${position}%)`,
          }}
        >
          {duplicatedTestimonials.map((card, index) => (
            <div 
              key={index}
              className="relative w-full md:w-[35%] flex-shrink-0 flex flex-col gap-7"
            >
              <p className='text-sm md:text-[16px] font-montserrat pt-10'>{card.Comment}</p>
              <div className="flex items-center gap-3">
                <img 
                  src={require("../Images/" + card.img)} 
                  className='h-12 w-12 rounded-full object-cover' 
                  alt="" 
                />
                <div className="flex flex-col">
                  <h4 className='font-montserratBold text-buttons'>{card.name}</h4>
                  <p className=' text-sm md:text-[16px]  font-montserrat text'>{card.role}</p>
                </div>
              </div>
              <card.icon size={30} className='text-buttons absolute  top-[-5]' />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Testimonials;