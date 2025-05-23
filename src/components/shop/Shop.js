import React, { useState } from 'react';
import Database from '../Database';
import { NavLink } from 'react-router-dom';

const Shop = () => {
  // States for all filters
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [stockFilter, setStockFilter] = useState('all');

  // Get unique categories and brands
  const uniqueCategories = [...new Set(Database.map((item) => item.catagories))];
  const uniqueBrands = [...new Set(Database.map((item) => item.name))];

  // Filter products based on all criteria
  const filteredProducts = Database.filter((item) => {
    const matchesCategory = !selectedCategory || item.catagories === selectedCategory;
    const matchesBrand = !selectedBrand || item.name === selectedBrand;
    const price = parseInt(item.price.replace('$', ''));
    const matchesPrice = price >= priceRange.min && price <= priceRange.max;
    const matchesStock = 
      stockFilter === 'all' ? true :
      stockFilter === 'inStock' ? item.availability === "On Stock" :
      item.availability === "Out Stock";

    return matchesCategory && matchesBrand && matchesPrice && matchesStock;
  });

  return (
    <div className='flex flex-col lg:flex-row justify-between pt-[100px] px-4 lg:px-[100px] gap-8'>
      {/* Sidebar with all filters */}
      <div className="lg:w-1/4 space-y-8 bg-white p-6 lg:pl-0 lg:pb-0 lg:pt-0 pr-6 rounded-lg shadow-sm">
        {/* Categories Filter */}
        <div>
          <h3 className='text-lg font-bold mb-4 text-gray-800 border-b pb-2'>Categories</h3>
          <ul className="space-y-2">
            <li
              className={`cursor-pointer transition-colors duration-200 ${
                selectedCategory === null 
                  ? "text-navbar  font-semibold" 
                  : "text-gray-600 hover:text-navbar "
              }`}
              onClick={() => setSelectedCategory(null)}
            >
              All Categories
            </li>
            {uniqueCategories.map((category, index) => (
             <li
             key={index}
             className={`cursor-pointer transition-colors duration-200 flex items-center gap-2 ${
               selectedCategory === category 
                 ? "text-navbar  font-semibold" 
                 : "text-gray-600 hover:text-navbar "
             }`}
             onClick={() => setSelectedCategory(category)}
           >
             <span className={`w-4 h-4 border rounded-full flex items-center justify-center ${
               selectedCategory === category 
                 ? "border-navbar " 
                 : "border-gray-300"
             }`}>
               {selectedCategory === category && (
                 <span className="w-2 h-2 bg-navbar  rounded-full"/>
               )}
             </span>
             <span>{category}</span>
           </li>
            ))}
          </ul>
        </div>

        {/* Price Range Filter */}
        <div>
          <h3 className='text-lg font-bold mb-4 text-gray-800 border-b pb-2'>Price Range</h3>
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-gray-600">Minimum Price: ${priceRange.min}</label>
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange.min}
                onChange={(e) => setPriceRange(prev => ({ ...prev, min: parseInt(e.target.value) }))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-navbar "
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-gray-600">Maximum Price: ${priceRange.max}</label>
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) }))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-navbar "
              />
            </div>
          </div>
        </div>

        {/* Brand Filter */}
        <div>
          <h3 className='text-lg font-bold mb-4 text-gray-800 border-b pb-2'>Brands</h3>
          <ul className="space-y-2">
            <li
              className={`cursor-pointer transition-colors duration-200 ${
                selectedBrand === null 
                  ? "text-navbar  font-semibold" 
                  : "text-gray-600 hover:text-navbar "
              }`}
              onClick={() => setSelectedBrand(null)}
            >
              All Brands
            </li>
            {uniqueBrands.map((brand, index) => (
     
                 
              <li
                key={index}
                className={`cursor-pointer transition-colors duration-200 flex items-center gap-2 ${
                  selectedBrand === brand 
                    ? "text-navbar  font-semibold" 
                    : "text-gray-600 hover:text-blue-500"
                }`}
                onClick={() => setSelectedBrand(brand)}
              >
             
             <span className={`w-4 h-4 border rounded-full flex items-center justify-center ${
               selectedBrand === brand 
                 ? "border-navbar " 
                 : "border-gray-300"
             }`}>
               {selectedBrand === brand  && (
                 <span className="w-2 h-2 bg-navbar  rounded-full"/>
               )}
             </span>
                {brand}
              </li>
            ))}
          </ul>
        </div>

        {/* Stock Filter */}
        <div>
          <h3 className='text-lg font-bold mb-4 text-gray-800 border-b pb-2'>Availability</h3>
          <ul className="space-y-2">
            <li
              className={`cursor-pointer transition-colors duration-200 ${
                stockFilter === 'all' 
                  ? "text-navbar font-semibold" 
                  : "text-gray-600 hover:text-navbar "
              }`}
              onClick={() => setStockFilter('all')}
            >
              All Items
            </li>
            <li
              className={`cursor-pointer transition-colors duration-200 flex items-center gap-2 ${
                stockFilter === 'inStock' 
                  ? "text-navbar  font-semibold" 
                  : "text-gray-600 hover:text-navbar "
              }`}
              onClick={() => setStockFilter('inStock')}
            >
                <span className={`w-4 h-4 border rounded-full flex items-center justify-center ${
             stockFilter === 'inStock'
                 ? "border-navbar " 
                 : "border-gray-300"
             }`}>
               {stockFilter === 'inStock' && (
                 <span className="w-2 h-2 bg-navbar  rounded-full"/>
               )}
             </span>
              On Stock
            </li>
            <li
              className={`cursor-pointer transition-colors duration-200 flex items-center gap-2 ${
                stockFilter === 'outStock' 
                  ? "text-navbar  font-semibold" 
                  : "text-gray-600 hover:text-navbar "
              }`}
              onClick={() => setStockFilter('outStock')}
            >
                 <span className={`w-4 h-4 border rounded-full flex items-center justify-center ${
             stockFilter === 'outStock'
                 ? "border-navbar " 
                 : "border-gray-300"
             }`}>
               {stockFilter === 'outStock' && (
                 <span className="w-2 h-2 bg-navbar  rounded-full"/>
               )}
             </span>
             
              Out of Stock
            </li>
          </ul>
        </div>
      </div>

      {/* Product Section */}
      <div className="lg:w-3/4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl lg:text-2xl font-bold text-gray-800">
            Products ({filteredProducts.length})
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((card, index) => (
            <div key={index} className="group relative bg-white   overflow-hidden">
              <div className="relative aspect-square overflow-hidden">
                <img 
                  loading='lazy' 
                  src={require("../Images/" + card.img)} 
                  alt="" 
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
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
              <div className="p-4">
                <p className='text-sm text-gray-500'>{card.name}</p>
                <p className='text-lg font-semibold mt-1 group-hover:text-buttons transition-colors duration-300'>{card.type}</p>
                <p className='text-lg font-bold text-gray-900 mt-2'>{card.price}</p>
                <p className={`text-sm mt-2 ${
                  card.availability === "On Stock" 
                    ? "text-navbar " 
                    : "text-red-500"
                }`}>
                  {card.availability}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;