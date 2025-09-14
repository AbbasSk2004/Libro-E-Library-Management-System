import React from 'react';
import type { Book } from '../../api/books';

interface BookCardProps {
  book: Book;
  onBorrow: (bookId: number) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onBorrow }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer group h-full flex flex-col">
      {book.coverImage && (
        <div className="overflow-hidden bg-gray-50 flex items-center justify-center">
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-48 sm:h-56 object-contain transition-transform duration-200 group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-3 sm:p-4 flex flex-col flex-grow">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-200">
          {book.title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 mb-2 group-hover:text-gray-700 transition-colors duration-200">by {book.author}</p>
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 group-hover:bg-indigo-100 group-hover:text-indigo-800 transition-colors duration-200">
            {book.category}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-gray-700 mb-4 line-clamp-2 sm:line-clamp-3 group-hover:text-gray-800 transition-colors duration-200 flex-grow">
          {book.description}
        </p>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0 mt-auto">
          <div className="flex flex-col space-y-1">
            <span className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-200">
              Published: {book.publishedYear}
            </span>
            <span className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-200">
              Copies: {book.numberOfCopies}
            </span>
          </div>
          <button
            onClick={() => onBorrow(book.id)}
            disabled={!book.available || book.numberOfCopies <= 0}
            className={`w-full sm:w-auto px-3 py-2 rounded text-xs sm:text-sm font-medium transition-all duration-200 ${
              book.available && book.numberOfCopies > 0
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-md transform hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {book.numberOfCopies <= 0 ? 'Out of Stock' : book.available ? 'Borrow' : 'Unavailable'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
