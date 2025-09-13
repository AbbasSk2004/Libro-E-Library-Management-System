import React from 'react';
import type { BorrowedBook } from '../../api/books';

interface BorrowedBookCardProps {
  borrowedBook: BorrowedBook;
  onReturn: (bookId: number) => void;
}

const BorrowedBookCard: React.FC<BorrowedBookCardProps> = ({ borrowedBook, onReturn }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">
            {borrowedBook.book.title}
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            by {borrowedBook.book.author}
          </p>
          <div className="flex gap-4 text-sm text-gray-500">
            <span>
              Borrowed: {formatDate(borrowedBook.borrowedAt)}
            </span>
            <span
              className={`${
                isOverdue(borrowedBook.dueDate)
                  ? 'text-red-600 font-medium'
                  : 'text-gray-500'
              }`}
            >
              Due: {formatDate(borrowedBook.dueDate)}
              {isOverdue(borrowedBook.dueDate) && ' (Overdue)'}
            </span>
          </div>
        </div>
        <button
          onClick={() => onReturn(borrowedBook.book.id)}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Return
        </button>
      </div>
    </div>
  );
};

export default BorrowedBookCard;
