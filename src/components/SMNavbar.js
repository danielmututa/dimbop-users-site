// import { useState } from 'react';

// const MediaNavbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="fixed w-full bg-white shadow-md z-50 opacity-95">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <h1 className="text-2xl font-bold">Navbar</h1>

//           {/* Desktop Menu (visible only on lg and xl) */}
//           <ul className="hidden md:hidden lg:flex space-x-6">
//             {['Home', 'About', 'Category', 'Menu', 'Testimonial', 'Contact'].map((item) => (
//               <li key={item}>
//                 <a href="#" className="text-gray-700 hover:text-green-600 transition-colors">
//                   {item}
//                 </a>
//               </li>
//             ))}
//           </ul>

//           {/* Mobile Menu Button (visible only on sm and md) */}
//           <button
//             className="md:block lg:hidden focus:outline-none"
//             onClick={() => setIsOpen(!isOpen)}
//             aria-label="Toggle menu"
//           >
//             <div className="w-6 flex flex-col space-y-1.5">
//               <span className={`h-0.5 w-full bg-gray-800 transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
//               <span className={`h-0.5 w-full bg-gray-800 transition-all ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
//               <span className={`h-0.5 w-full bg-gray-800 transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
//             </div>
//           </button>
//         </div>

//         {/* Mobile Menu (visible only on sm and md) */}
//         <div
//           className={`md:block lg:hidden fixed inset-0 bg-white z-40 mt-16 transition-all duration-300 ease-in-out transform ${
//             isOpen ? 'translate-x-0' : '-translate-x-full'
//           }`}
//         >
//           <ul className="px-4 py-8 space-y-6">
//             {['Home', 'About', 'Category', 'Menu', 'Testimonial', 'Contact'].map((item) => (
//               <li key={item}>
//                 <a
//                   href="#"
//                   className="block text-gray-700 hover:text-green-600 text-lg py-2 transition-colors"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   {item}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default MediaNavbar;


import React, { useState } from 'react';
import { ChevronDown, Search, ShoppingCart, User } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';

const MobileNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (item) => {
    setOpenAccordion(openAccordion === item ? null : item);
  };

  return (
    <nav className="lg:hidden fixed w-full bg-navbar shadow-md z-50">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex justify-between items-center h-16">
          <p className="text-white font-montserratBold text-xl">Dimbo P</p>
          
          {/* Mobile Menu Button */}
          <button
            className="focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col space-y-1.5">
              <span className={`h-0.5 w-full bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`h-0.5 w-full bg-white transition-all ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`h-0.5 w-full bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu Content */}
        <div className={`bg-navbar transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-screen' : 'max-h-0'}`}>
          <div className="px-4 py-4 space-y-4">
            {/* Home Link */}
            <NavLink 
              to="/" 
              className="block text-white font-montserrat py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>

            {/* Pages Accordion */}
            <div className="border-b border-gray-700 pb-2">
              <button 
                className="flex justify-between items-center w-full text-white font-montserrat py-2"
                onClick={() => toggleAccordion('pages')}
              >
                <span>Pages</span>
                <ChevronDown size={16} className={`transition-transform ${openAccordion === 'pages' ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openAccordion === 'pages' ? 'max-h-96' : 'max-h-0'}`}>
                <div className="pl-4 pt-2 space-y-3">
                  <Link to="/about" className="block text-gray-300 hover:text-white" onClick={() => setIsMenuOpen(false)}>About us</Link>
                  <Link to="/team" className="block text-gray-300 hover:text-white" onClick={() => setIsMenuOpen(false)}>About Team</Link>
                  <Link to="/services" className="block text-gray-300 hover:text-white" onClick={() => setIsMenuOpen(false)}>Services</Link>
                  <Link to="/contact" className="block text-gray-300 hover:text-white" onClick={() => setIsMenuOpen(false)}>Contact us</Link>
                  <Link to="/faq" className="block text-gray-300 hover:text-white" onClick={() => setIsMenuOpen(false)}>FAQ</Link>
                  <Link to="/whilelist" className="block text-gray-300 hover:text-white" onClick={() => setIsMenuOpen(false)}>Wishlist</Link>
                  <Link to="/login" className="block text-gray-300 hover:text-white" onClick={() => setIsMenuOpen(false)}>Login</Link>
                </div>
              </div>
            </div>

            {/* Shop Accordion */}
            <div className="border-b border-gray-700 pb-2">
              <button 
                className="flex justify-between items-center w-full text-white font-montserrat py-2"
                onClick={() => toggleAccordion('shop')}
              >
                <span>Shop</span>
                <ChevronDown size={16} className={`transition-transform ${openAccordion === 'shop' ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openAccordion === 'shop' ? 'max-h-96' : 'max-h-0'}`}>
                <div className="pl-4 pt-2 space-y-3">
                  <Link to="/shop" className="block text-gray-300 hover:text-white" onClick={() => setIsMenuOpen(false)}>Product Listings</Link>
                  <Link to="/categories" className="block text-gray-300 hover:text-white" onClick={() => setIsMenuOpen(false)}>Categories</Link>
                  <Link to="/account" className="block text-gray-300 hover:text-white" onClick={() => setIsMenuOpen(false)}>Account</Link>
                </div>
              </div>
            </div>

            {/* Blogs Accordion */}
            <div className="border-b border-gray-700 pb-2">
              <button 
                className="flex justify-between items-center w-full text-white font-montserrat py-2"
                onClick={() => toggleAccordion('blogs')}
              >
                <span>Blogs</span>
                <ChevronDown size={16} className={`transition-transform ${openAccordion === 'blogs' ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openAccordion === 'blogs' ? 'max-h-96' : 'max-h-0'}`}>
                <div className="pl-4 pt-2 space-y-3">
                  <Link to="/blog" className="block text-gray-300 hover:text-white" onClick={() => setIsMenuOpen(false)}>Blog</Link>
                  <Link to="/blogarticle" className="block text-gray-300 hover:text-white" onClick={() => setIsMenuOpen(false)}>Blog Article</Link>
                </div>
              </div>
            </div>

            {/* Icons Row */}
            <div className="flex justify-start space-x-6 pt-4">
              <Search size={18} className="text-white" />
              <User size={18} className="text-white" />
              <ShoppingCart size={18} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MobileNavbar;