import React from 'react';
import type { BorrowedBook } from '../../api/books';
import BorrowedBookCard from './BorrowedBookCard';
import ErrorMessage from '../books/ErrorMessage';

interface BorrowedBooksListProps {
  borrowedBooks: BorrowedBook[];
  loading: boolean;
  error: string;
  onReturn: (bookId: number) => void;
}

const BorrowedBooksList: React.FC<BorrowedBooksListProps> = ({
  borrowedBooks,
  loading,
  error,
  onReturn,
}) => {
  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <p className="mt-2 text-gray-600">Loading borrowed books...</p>
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (borrowedBooks.length === 0) {
    return null; // Empty state will be handled by parent component
  }

  return (
    <div className="space-y-4">
      {borrowedBooks.map((borrowedBook) => (
        <BorrowedBookCard
          key={borrowedBook.id}
          borrowedBook={borrowedBook}
          onReturn={onReturn}
        />
      ))}
    </div>
  );
};

export default BorrowedBooksList;
