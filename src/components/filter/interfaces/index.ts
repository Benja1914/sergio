export interface FilterOption {
  id: string;
  label: string;
}

export interface FilterConfig {
  id: string;
  title: string;
  cols: number;
  options: FilterOption[];
}

export interface PlpFiltersProps {
  filtersConfig: FilterConfig[];
  onFiltersChange: (filters: ActiveFilter[]) => void;
  onSearch: (query: string) => void;
  activeFilters?: ActiveFilter[];
  searchQuery?: string;
}

export interface ActiveFilter {
  label: string;
  filterCategory: string;
  labelId: string;
}

export interface AccordionOption {
  id: string;
  label: string;
  checked: boolean;
  onChange: (id: string, checked: boolean) => void;
}

export interface AccordionItem {
  id: string;
  title: string;
  cols: number;
  options: AccordionOption[];
}
