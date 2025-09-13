import React from 'react';

interface BooksHeaderProps {
  userName?: string;
}

const BooksHeader: React.FC<BooksHeaderProps> = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Books Library</h1>
    </div>
  );
};

export default BooksHeader;
