import React, { useState, useRef, useEffect } from 'react';

const CustomSelect = ({ options, placeholder = "Select options", onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const filteredOptions = options?.filter(option => 
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelectOption = (option) => {
    let newSelectedOptions;
    
    if (isOptionSelected(option)) {
      newSelectedOptions = selectedOptions?.filter(item => item.value !== option.value);
    } else {
      newSelectedOptions = [...selectedOptions, option];
    }
    
    setSelectedOptions(newSelectedOptions);
    if (onChange) onChange(newSelectedOptions);
  };

  const isOptionSelected = (option) => {
    return selectedOptions.some(item => item.value === option.value);
  };

  const removeOption = (option, e) => {
    e.stopPropagation();
    const newSelectedOptions = selectedOptions?.filter(item => item.value !== option.value);
    setSelectedOptions(newSelectedOptions);
    if (onChange) onChange(newSelectedOptions);
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div 
        className="flex items-center min-h-10 w-full p-2 border border-gray-300 rounded-md bg-white cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-wrap gap-1 flex-grow">
          {selectedOptions.length > 0 ? (
            selectedOptions.map(option => (
              <div 
                key={option.value}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md flex items-center text-sm"
              >
                {option.label}
                <button 
                  className="ml-1 text-blue-500 hover:text-blue-700 focus:outline-none"
                  onClick={(e) => removeOption(option, e)}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))
          ) : (
            <div className="text-gray-500">{placeholder}</div>
          )}
        </div>
        <div className="ml-2 flex-shrink-0">
          <svg 
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          <div className="sticky top-0 bg-white p-2 border-b border-gray-200">
            <input
              ref={inputRef}
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <div>
            {filteredOptions?.length > 0 ? (
              filteredOptions?.map((option) => (
                <div
                  key={option.value}
                  className={`p-2 hover:bg-gray-100 cursor-pointer flex items-center ${
                    isOptionSelected(option) ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => handleSelectOption(option)}
                >
                  <div className="mr-2 flex-shrink-0">
                    <div className={`w-4 h-4 border rounded ${
                      isOptionSelected(option) 
                        ? 'bg-blue-500 border-blue-500' 
                        : 'border-gray-400'
                    }`}>
                      {isOptionSelected(option) && (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div>{option.label}</div>
                </div>
              ))
            ) : (
              <div className="p-2 text-gray-500 text-center">No options found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;