import { useState, useEffect, useRef } from 'react';
import { FiSearch } from 'react-icons/fi';
import { VscSettings } from "react-icons/vsc";
import { AccordionItem, ActiveFilter, PlpFiltersProps } from './interfaces';
import { Accordion } from '../Accordion/Accordion';



export const PlpFilters = ({ filtersConfig, onFiltersChange, onSearch }: PlpFiltersProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([]);
  const [accordionKey, setAccordionKey] = useState(0);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (searchQuery.length === 0) {
      onSearch('');
      return;
    }

    if (searchQuery.length < 3) {
      return;
    }

    debounceRef.current = setTimeout(() => {
      onSearch(searchQuery.trim());
    }, 1000);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchQuery, onSearch]);

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

    setActiveFilters(updated);
    onFiltersChange(updated);
  };



  const items: AccordionItem[] = filtersConfig.map(filter => ({
    id: filter.id,
    title: filter.title,
    cols: filter.cols,
    options: filter.options.map(opt => ({
      id: opt.id,
      label: opt.label,
      onChange: (id: string, checked: boolean) => handleOptionChange(filter.id, id, checked)
    }))
  }));

  const resetFilters = () => {
    setActiveFilters([]);
    setSearchQuery('');
    setAccordionKey(key => key + 1);
    onFiltersChange([]);
  }

  return (
    <div className="text-white font-nunito">
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
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search by"
          className="w-full bg-transparent focus:outline-none border-none" // <-- border-none agregado
        />
      </div>

      <Accordion key={accordionKey} items={items} />
    </div>
  );
}
