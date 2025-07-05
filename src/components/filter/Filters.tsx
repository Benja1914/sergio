import { useState, useEffect, useRef } from 'react';
import { FiSearch, FiChevronDown } from 'react-icons/fi';
import { VscSettings } from "react-icons/vsc";
import { AccordionItem, ActiveFilter, PlpFiltersProps } from './interfaces';
import { Accordion } from '../Accordion/Accordion';

export const PlpFilters = ({ 
  filtersConfig, 
  onFiltersChange, 
  onSearch, 
  activeFilters = [], 
  searchQuery = '' 
}: PlpFiltersProps) => {
  const [internalSearchQuery, setInternalSearchQuery] = useState(searchQuery);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  
  // Estados para mobile
  const [selectedFilterTag, setSelectedFilterTag] = useState('YCH');
  const [selectedSortBy, setSelectedSortBy] = useState('Price');

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (internalSearchQuery.length === 0) {
      onSearch('');
      return;
    }

    if (internalSearchQuery.length < 3) {
      return;
    }

    debounceRef.current = setTimeout(() => {
      onSearch(internalSearchQuery.trim());
    }, 1000);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [internalSearchQuery, onSearch]);

  interface HandleOptionChangeItem {
    label: string;
    filterCategory: string;
    labelId: string;
  }

  const handleOptionChange = (
    filterType: string,
    optionId: string,
    checked: boolean
  ): void => {
    const filterDef = filtersConfig.find(f => f.id === filterType);
    if (!filterDef) return;
    const option = filterDef.options.find(o => o.id === optionId);
    if (!option) return;
    const label = option.label;
    const labelId = option.id;
    const filterCategory = filterDef.id;
    const item: HandleOptionChangeItem = { label, filterCategory, labelId };

    let updated: ActiveFilter[];
    if (checked) {
      const exists = activeFilters.some(
        (founded: ActiveFilter) => founded.label === label && founded.filterCategory === filterCategory
      );

      updated = exists ? activeFilters : [...activeFilters, item];
    } else {
      updated = activeFilters.filter(
        (founded: ActiveFilter) => !(founded.label === label && founded.filterCategory === filterCategory)
      );
    }

    onFiltersChange(updated);
  };

  const items: AccordionItem[] = filtersConfig.map(filter => ({
    id: filter.id,
    title: filter.title,
    cols: filter.cols,
    options: filter.options.map(opt => ({
      id: opt.id,
      label: opt.label,
      checked: activeFilters.some(f => f.filterCategory === filter.id && f.labelId === opt.id),
      onChange: (id: string, checked: boolean) => handleOptionChange(filter.id, id, checked)
    }))
  }));

  const resetFilters = () => {
    setInternalSearchQuery('');
    onSearch('');
    onFiltersChange([]);
  }

  // Opciones para los selectores mobile
  const filterTagOptions = ['YCH', 'Commission', 'Adoptable', 'Other'];
  const sortByOptions = ['Price', 'Date', 'Popularity', 'Ending Soon'];

  return (
    <>
      {/* Desktop Version */}
      <div className="hidden md:block text-white font-nunito">
        <div className='flex pb-3 justify-between items-center'>
          <label className='text-xl font-bold'>Filters</label>
          <div className='flex gap-2 items-center cursor-pointer' onClick={resetFilters}>
            <VscSettings />
            <label className='text-sm cursor-pointer'>Reset</label>
          </div>
        </div>
        <div className="flex items-center gap-1 p-2 border-[0.5px] border-stroke rounded-2xl h-8">
          <FiSearch className="w-4 h-4" />
          <input
            type="text"
            value={internalSearchQuery}
            onChange={e => setInternalSearchQuery(e.target.value)}
            placeholder="Search by"
            className="w-full bg-transparent focus:outline-none border-none"
          />
        </div>

        <Accordion items={items} />
      </div>

      {/* Mobile Version */}
      <div className="md:hidden flex gap-4 px-4 py-3">
        {/* Filter Tags Selector */}
        <div className="flex-1">
          <label className="block text-white text-sm font-medium mb-2">Filter Tags</label>
          <div className="relative">
            <select
              value={selectedFilterTag}
              onChange={(e) => setSelectedFilterTag(e.target.value)}
              className="w-full bg-[#1a2332] text-white border border-gray-600 rounded-lg px-4 py-3 pr-10 appearance-none focus:outline-none focus:border-blue-500 transition-colors"
            >
              {filterTagOptions.map(option => (
                <option key={option} value={option} className="bg-[#1a2332]">
                  {option}
                </option>
              ))}
            </select>
            <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
          </div>
        </div>

        {/* Sort By Selector */}
        <div className="flex-1">
          <label className="block text-white text-sm font-medium mb-2">Sort By</label>
          <div className="relative">
            <select
              value={selectedSortBy}
              onChange={(e) => setSelectedSortBy(e.target.value)}
              className="w-full bg-[#1a2332] text-white border border-gray-600 rounded-lg px-4 py-3 pr-10 appearance-none focus:outline-none focus:border-blue-500 transition-colors"
            >
              {sortByOptions.map(option => (
                <option key={option} value={option} className="bg-[#1a2332]">
                  {option}
                </option>
              ))}
            </select>
            <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
          </div>
        </div>
      </div>
    </>
  );
}