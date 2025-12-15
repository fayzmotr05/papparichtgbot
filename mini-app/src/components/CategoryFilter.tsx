import { useState } from 'react';

interface ProductTypeFilterProps {
  language: 'uz' | 'ru' | 'en';
  selectedType?: string;
  onTypeSelect: (type?: string) => void;
}

export default function ProductTypeFilter({ language, selectedType, onTypeSelect }: ProductTypeFilterProps) {
  // Predefined product types for coffee shop
  const productTypes = [
    { key: 'coffee', icon: '☕', 
      names: { uz: 'Kofe', ru: 'Кофе', en: 'Coffee' }
    },
    { key: 'accessory', icon: '🥄', 
      names: { uz: 'Aksessuarlar', ru: 'Аксессуары', en: 'Accessories' }
    }
  ];

  const getLabels = () => {
    switch (language) {
      case 'ru':
        return {
          all: 'Все товары'
        };
      case 'en':
        return {
          all: 'All Products'
        };
      default:
        return {
          all: 'Barcha mahsulotlar'
        };
    }
  };

  const labels = getLabels();

  return (
    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {/* All Products Button */}
        <button
          onClick={() => onTypeSelect(undefined)}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
            !selectedType
              ? 'bg-blue-500 text-white shadow-md'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          {labels.all}
        </button>

        {/* Product Type Buttons */}
        {productTypes.map((type) => (
          <button
            key={type.key}
            onClick={() => onTypeSelect(type.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex items-center gap-2 transition-colors duration-200 ${
              selectedType === type.key
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <span className="text-base">{type.icon}</span>
            <span>{type.names[language]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}