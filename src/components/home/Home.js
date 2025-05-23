import React, { useState, useEffect } from 'react'
import brn from "../Images/Iphonebanner3.jpg"
import brn2 from "../Images/Samsuag.jpg"
import brn3 from "../Images/Nokiabanner.jpg"
import { NavLink } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import styled from 'styled-components'
import Newproducts from './Newproducts'
import News from './News'
import Topsellingproducts from './Topsellingproducts'
import Fastdelivary from './Fastdelivary'
import Blogs from './Blogs'
import Testmonials from '../testimonials/Testmonials'

const CarouselContainer = styled.div`
  height: 100%;
  overflow: hidden;
  position: relative;
`

const CarouselInner = styled.div`
  position: relative;
  height: 100%;
`

const CarouselItem = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${props => props.isActive ? 1 : 0};
  transition: opacity 0.5s ease-in-out;
  z-index: ${props => props.isActive ? 1 : 0};

  &:first-child {
    position: relative;
  }
`

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s ease;
  z-index: 2;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  &.prev {
    left: 20px;
  }

  &.next {
    right: 20px;
  }
`

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const Bannercards = [
    {img:brn, title:"IPHONE", all:"get all", des:"QUALITY YOU CAN TRUST"},
    {img:brn2, title:"SAMSUNG", all:"get all", des:"QUALITY YOU CAN TRUST"},
    {img:brn3, title:"NOKIA", all:"get all", des:"QUALITY YOU CAN TRUST"}
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => 
        current === Bannercards.length - 1 ? 0 : current + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setActiveIndex((current) => 
      current === 0 ? Bannercards.length - 1 : current - 1
    );
  };

  const goToNext = () => {
    setActiveIndex((current) => 
      current === Bannercards.length - 1 ? 0 : current + 1
    );
  };

  return (
    <div>
    <CarouselContainer>
      <div className="   absolute left-[20px] top-1/2 transform bg-[#fff]/50 cursor-pointer z-20 duration-300 flex items-center justify-center border-none w-[50px] h-[50px] rounded-full " onClick={goToPrevious}>
        <ChevronLeft className=' h-[20px] w-[20px]  lg:h-[30px]  lg:w-[30px]' color="white" />
      </div>
      <div className="prev right-[20px] absolute top-1/2 transform bg-[#fff]/50 cursor-pointer z-20 duration-300 flex items-center justify-center border-none w-[50px] h-[50px] rounded-full" onClick={goToNext}>
        <ChevronRight className=' h-[20px] w-[20px]  lg:h-[30px]  lg:w-[30px]' color="white" />
      </div>

      <CarouselInner>
        {Bannercards.map((card, index) => (
          <CarouselItem 
            key={index}
            isActive={index === activeIndex}
            className="flex relative items-start"
          >
            <img loading='lazy' src={card.img} className='w-full h-[480px] object-cover lg:h-[520px] xl:h-[100vh]  lg:object-cover' alt="" />
            <div className="absolute w-full top-0 h-full flex items-start justify-center flex-col  px-[20px] gap-2 md:px-[40px] lg:px-[100px]  lg:gap-3">
              <p className='text-white text-[14px] font-semibold font-montserrat'>{card.title}</p>
              <p className='      text-22px    md:text-[22px]   lg:text-[26px]      xl:text-3xl text-white font-montserrat'>{card.all}</p>
              <h1 className='font-montserratBold pb-2 text-[24px] md:text-[24px] lg:text-[32px] xl:text-4xl text-white'>{card.des}</h1>
              <NavLink 
                className='border-[1px]   px-[20px] md:px-[30px]  lg:px-[40px]  xl:px-[50px]  py-[8px] md:py-[10px] xl:py-[12px] font-montserrat relative m-0 xl:h-[60px] flex justify-center items-center cursor-pointer uppercase bg-none border-[#fff] rounded-[0px] text-body font-normal text-14px  xl:text-[18px] overflow-hidden transition-all duration-300 hover:animate-[rotate_0.7s_ease-in-out] group'
                to=''
              >
                <span className="text-white text-[14px] font-montserratBold font-medium tracking-[0.7px] group-hover:animate-[storm_0.7s_ease-in-out] group-hover:delay-[60ms] flex items-center">
                  VIEW MORE
                  <ArrowRight size={28} className='text-white pl-[8px] transtion group-hover:translate-x-1 transition-transform'/>
                </span>
                <div className="absolute right-0 bottom-0 w-[100px] h-[100px] rounded-full bg-body opacity-0 transition-all duration-200 translate-x-full -translate-y-1/4 group-hover:opacity-15 group-hover:translate-x-1/2 group-hover:scale-90" />
                <div className="absolute right-0 bottom-0 w-[100px] h-[100px] rounded-full bg-[#fff] opacity-0 transition-all duration-200 translate-x-full -translate-y-1/4 group-hover:opacity-15 group-hover:translate-x-1/2 group-hover:scale-110" />
              </NavLink>
            </div>
          </CarouselItem>
        ))}
      </CarouselInner>
    </CarouselContainer>
    
    <Newproducts/>

    {/* News  Updates*/}
  <News/>

  {/* TOP SMARTPHONES PRODUCTS */}
  <Topsellingproducts/>

  {/* Fast Delivary */}
  < Fastdelivary/>

  {/* Blogs */}
  <Blogs/>

  {/* TESTMONIALS */}
  <Testmonials/>
    </div>
  )
}

export default Home
