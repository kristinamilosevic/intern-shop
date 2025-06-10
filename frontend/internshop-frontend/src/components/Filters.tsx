import React, { ChangeEvent } from 'react';
import { Categories } from '../models/Categories'; 

interface FiltersProps {
    onCategoryChange: (category: Categories | null) => void; 
    selectedCategory: Categories | null; 
    onTitleChange: (title: string) => void;
    searchTitle: string;
  }

const Filters = ({ onCategoryChange, selectedCategory, onTitleChange, searchTitle }: FiltersProps) => {

    const handleChange = (event:ChangeEvent<HTMLSelectElement>) => {
      if(event.target?.value){
        onCategoryChange(event.target.value as Categories);
      }
  };

    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
      onTitleChange(event.target.value);
  };

  return (
    <div className="mb-4 space-y-4"> 
        <div>
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
                {Object.values(Categories).map((category: string) => (
                    <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
                    </option>
                ))}
            </select>
        </div>

        <div>
            <label htmlFor="titleFilter" className="block text-gray-700 text-sm font-bold mb-2">
                Pretraži po nazivu:
            </label>
            <input
                type="text"
                id="titleFilter"
                name="title"
                placeholder="Unesi naziv oglasa..."
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={searchTitle}
                onChange={handleTitleChange}
            />
        </div>
    </div>
);
};

export default Filters;