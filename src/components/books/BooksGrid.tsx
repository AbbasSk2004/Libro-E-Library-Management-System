import React from 'react';
import BookCard from './BookCard';
import type { Book } from '../../api/books';

interface BooksGridProps {
  books: Book[];
  onBorrow: (bookId: number) => void;
}

const BooksGrid: React.FC<BooksGridProps> = ({ books, onBorrow }) => {
  if (books.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12">
        <div className="max-w-md mx-auto">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No books found</h3>
          <p className="text-gray-600">Try adjusting your search terms or category filter.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6">
      {books.map((book) => (
        <BookCard key={book.id} book={book} onBorrow={onBorrow} />
      ))}
    </div>
  );
};

export default BooksGrid;
