import React from 'react';

interface EmptyBorrowedBooksProps {
  onBrowseBooks: () => void;
}

const EmptyBorrowedBooks: React.FC<EmptyBorrowedBooksProps> = ({ onBrowseBooks }) => {
  return (
    <div className="text-center py-8">
      <p className="text-gray-600">You haven't borrowed any books yet.</p>
      <button
        onClick={onBrowseBooks}
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Browse Books
      </button>
    </div>
  );
};

export default EmptyBorrowedBooks;
