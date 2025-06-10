import React, { ChangeEvent } from 'react';
import { Categories } from '../models/Categories'; 

interface FiltersProps {
    onCategoryChange: (category: Categories | null) => void; 
    selectedCategory: Categories | null; 
  }

const Filters = ({ onCategoryChange, selectedCategory }: FiltersProps) => {

    const handleChange = (event:ChangeEvent<HTMLSelectElement>) => {
      if(event.target?.value){
        onCategoryChange(event.target.value as Categories);
      }
  };

return (
    <div className="mb-4">
      <label htmlFor="categoryFilter" className="block text-gray-700 text-sm font-bold mb-2">
        Filtriraj po kategoriji:
      </label>
      <select
        id="categoryFilter"
        name="category"
        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        onChange={handleChange}
        value={selectedCategory || ""} 
      >
        <option value="">Sve kategorije</option> 
          {Object.values(Categories).map((category) => (
            <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Filters;