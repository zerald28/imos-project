// CategoryTabs.tsx
'use client';

import { Link } from '@inertiajs/react';

interface CategoryTabsProps {
  activeCategory: string;  // Changed from categoryFilter to activeCategory
  onCategoryChange: (category: string) => void; // Add this prop
}

export default function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  const tabs = [
    { key: 'DA', label: 'DA' },
    { key: 'Livestock', label: 'Livestock' },
    { key: 'all', label: 'All' },
  ];

  const handleClick = (e: React.MouseEvent, key: string) => {
    e.preventDefault();
    onCategoryChange(key);
  };

  return (
    <div className="w-full border-b border-gray-200 dark:border-gray-700 mb-4 px-6">
      <div className="flex items-center gap-6 overflow-x-auto no-scrollbar py-2">
        {tabs.map((tab) => {
          const isActive = activeCategory === tab.key;

          return (
            <Link
              key={tab.key}
              href={`/cms/blog?category=${tab.key}`}
              preserveState
              preserveScroll
              replace
              onClick={(e) => handleClick(e, tab.key)}
              className={`
                relative pb-2 text-sm font-medium transition-colors whitespace-nowrap
                ${isActive 
                  ? "text-sidebar-primary dark:text-sidebar-primary" 
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                }
              `}
            >
              {tab.label}

              {/* Highlight bar */}
              {isActive && (
                <span className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-sidebar-primary dark:bg-sidebar-primary rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}