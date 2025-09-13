import React from 'react';

const CATEGORIES = [
  'All Categories',
  'Fiction',
  'Non-Fiction',
  'Science Fiction',
  'Fantasy',
  'Romance',
  'Mystery',
  'Thriller',
  'Biography',
  'History',
  'Science',
  'Technology',
  'Philosophy',
  'Religion',
  'Art',
  'Music',
  'Poetry',
  'Drama',
  'Comedy',
  'Horror',
  'Adventure',
  'Children',
  'Young Adult',
  'Reference',
  'Textbook',
  'General'
];

interface BookSearchProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onSearch: (e: React.FormEvent) => void;
}

const BookSearch: React.FC<BookSearchProps> = ({
  searchTerm,
  onSearchTermChange,
  selectedCategory,
  onCategoryChange,
  onSearch,
}) => {
  return (
    <form onSubmit={onSearch} className="mb-6">
      {/* Mobile Layout - Stacked */}
      <div className="flex flex-col space-y-3 sm:hidden">
        <input
          type="text"
          placeholder="Search books by title or author..."
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base"
        />
        <div className="flex space-x-2">
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-base"
          >
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 whitespace-nowrap"
          >
            Search
          </button>
        </div>
      </div>

      {/* Tablet and Desktop Layout - Horizontal */}
      <div className="hidden sm:flex gap-3 lg:gap-4">
        <input
          type="text"
          placeholder="Search books by title or author..."
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white min-w-[160px] lg:min-w-[180px]"
        >
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 whitespace-nowrap"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default BookSearch;
