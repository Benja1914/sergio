import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { AccordionItemProps } from './interfaces';



export const AccordionItem = ({ id, title, options, cols = 2 }: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const colClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  };

  const gridClass = `grid ${colClasses[cols] || 'grid-cols-1'} gap-1 text-disabled`;

  return (
    <div className="border-b border-disabled font-nunito py-3 text-white flex flex-col gap-[10px]">
      <button
        onClick={() => setIsOpen(open => !open)}
        className="w-full flex justify-between items-center focus:outline-none font-bold text-lg"
      >
        <span>{title}</span>
        <FiChevronDown
          className={`w-7 h-5 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className={gridClass}>
          {options.map(({ id: optId, label, checked, onChange }) => (
            <label
              key={optId}
              htmlFor={`${id}-${optId}`}
              className="flex items-center space-x-2 text-base"
            >
              <input
                id={`${id}-${optId}`}
                type="checkbox"
                checked={checked}
                onChange={e => {
                  e.stopPropagation();
                  onChange(optId, e.target.checked);
                }}
                onClick={e => e.stopPropagation()}
                className="
                  h-4 w-4
                  border border-white
                  rounded
                  bg-transparent
                  checked:border-white
                  accent-info
                  focus:outline-none
                "
              />
              <span className='select-none'>{label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
