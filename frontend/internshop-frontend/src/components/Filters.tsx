import React, { useEffect, useState } from 'react';
import { Categories } from '../models/Categories';
import { Ad } from '../models/Ad';
import { fetchAds } from '../services/adService';

interface FiltersProps {
  onAdsFetched: (ads: Ad[], totalPages: number) => void;
  currentPage: number;
  currentUserId: number;
}

const Filters = ({ onAdsFetched, currentPage, currentUserId }: FiltersProps) => {
  const [selectedCategory, setSelectedCategory] = useState<Categories | null>(null);
  const [searchTitle, setSearchTitle] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [showMineOnly, setShowMineOnly] = useState<boolean>(false);

  useEffect(() => {
    const loadAds = async () => {
      try {
        const userId = showMineOnly ? currentUserId : null;

        const { ads, totalPages } = await fetchAds(
          currentPage,
          selectedCategory,
          searchTitle,
          minPrice,
          maxPrice,
          userId
        );
        onAdsFetched(ads, totalPages);
      } catch (error) {
        console.error('Error loading ads in Filters:', error);
      }
    };

    loadAds();
  }, [currentPage, selectedCategory, searchTitle, minPrice, maxPrice, showMineOnly]);

  return (
    <div className="mb-6 p-4 rounded shadow-sm max-w-4xl mx-auto">
      <div className="flex flex-wrap gap-4 justify-between">
        <div className="flex-1 min-w-[180px]">
          <label
            className="block text-xs font-semibold mb-1"
            style={{ color: '#8E806A' }}
          >
            Filter by category
          </label>
          <select
            className="w-full px-3 py-1.5 border rounded text-sm focus:outline-none focus:ring-2"
            style={{
              borderColor: '#C3B091',
              backgroundColor: 'white',
              color: '#4B3621',
              boxShadow: '0 0 0 2px transparent',
            }}
            value={selectedCategory || ''}
            onChange={(e) =>
              setSelectedCategory(e.target.value ? (e.target.value as Categories) : null)
            }
            onFocus={(e) => (e.currentTarget.style.boxShadow = '0 0 0 2px #C3B091')}
            onBlur={(e) => (e.currentTarget.style.boxShadow = '0 0 0 2px transparent')}
          >
            <option value="">All categories</option>
            {Object.values(Categories).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[180px]">
          <label
            className="block text-xs font-semibold mb-1"
            style={{ color: '#8E806A' }}
          >
            Search by title
          </label>
          <input
            type="text"
            className="w-full px-3 py-1.5 border rounded text-sm focus:outline-none focus:ring-2"
            style={{
              borderColor: '#C3B091',
              backgroundColor: 'white',
              color: '#4B3621',
              boxShadow: '0 0 0 2px transparent',
            }}
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            placeholder="Enter title"
            onFocus={(e) => (e.currentTarget.style.boxShadow = '0 0 0 2px #C3B091')}
            onBlur={(e) => (e.currentTarget.style.boxShadow = '0 0 0 2px transparent')}
          />
        </div>

        <div className="flex-1 min-w-[120px]">
          <label
            className="block text-xs font-semibold mb-1"
            style={{ color: '#8E806A' }}
          >
            Minimum price
          </label>
          <input
            type="number"
            className="w-full px-3 py-1.5 border rounded text-sm focus:outline-none focus:ring-2"
            style={{
              borderColor: '#C3B091',
              backgroundColor: 'white',
              color: '#4B3621',
              boxShadow: '0 0 0 2px transparent',
            }}
            value={minPrice ?? ''}
            onChange={(e) =>
              setMinPrice(e.target.value ? parseFloat(e.target.value) : null)
            }
            placeholder="0"
            min="0"
            onFocus={(e) => (e.currentTarget.style.boxShadow = '0 0 0 2px #C3B091')}
            onBlur={(e) => (e.currentTarget.style.boxShadow = '0 0 0 2px transparent')}
          />
        </div>

        <div className="flex-1 min-w-[120px]">
          <label
            className="block text-xs font-semibold mb-1"
            style={{ color: '#8E806A' }}
          >
            Maximum price
          </label>
          <input
            type="number"
            className="w-full px-3 py-1.5 border rounded text-sm focus:outline-none focus:ring-2"
            style={{
              borderColor: '#C3B091',
              backgroundColor: 'white',
              color: '#4B3621',
              boxShadow: '0 0 0 2px transparent',
            }}
            value={maxPrice ?? ''}
            onChange={(e) =>
              setMaxPrice(e.target.value ? parseFloat(e.target.value) : null)
            }
            placeholder="No limit"
            min="0"
            onFocus={(e) => (e.currentTarget.style.boxShadow = '0 0 0 2px #C3B091')}
            onBlur={(e) => (e.currentTarget.style.boxShadow = '0 0 0 2px transparent')}
          />
        </div>
      </div>

      <div className="mt-4 flex justify-center items-center space-x-2">
        <input
          type="checkbox"
          checked={showMineOnly}
          onChange={(e) => setShowMineOnly(e.target.checked)}
          id="showMineOnlyCheckbox"
          className="w-4 h-4 rounded focus:ring-yellow-400"
          style={{ borderColor: '#C3B091', accentColor: '#8E806A' }}
        />
        <label
          htmlFor="showMineOnlyCheckbox"
          className="text-sm select-none"
          style={{ color: '#8E806A' }}
        >
          Show only my ads
        </label>
      </div>
    </div>
  );
};

export default Filters;
