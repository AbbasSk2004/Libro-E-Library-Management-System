import React from 'react';
import type { AdminBorrowedBook } from '../../api/admin';

interface BorrowModalProps {
  isOpen: boolean;
  onClose: () => void;
  borrow: AdminBorrowedBook | null;
  onReturnBook: (borrowId: number) => void;
}

const BorrowModal: React.FC<BorrowModalProps> = ({ isOpen, onClose, borrow, onReturnBook }) => {
  if (!isOpen || !borrow) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDueStatus = (dueDate: string) => {
    const now = new Date();
    const due = new Date(dueDate);
    const daysUntilDue = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilDue < 0) {
      return { text: 'Overdue', color: 'text-red-600 bg-red-100' };
    } else if (daysUntilDue <= 3) {
      return { text: 'Due Soon', color: 'text-yellow-600 bg-yellow-100' };
    } else {
      return { text: 'On Time', color: 'text-green-600 bg-green-100' };
    }
  };

  const dueStatus = getDueStatus(borrow.dueDate);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Borrow Details
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-6">
            {/* Due Status */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">Due Status</span>
              <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${dueStatus.color}`}>
                {dueStatus.text}
              </span>
            </div>

            {/* User Information */}
            <div className="border-t pt-4">
              <h4 className="text-md font-medium text-gray-900 mb-3">User Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">User Name</span>
                  <p className="text-sm text-gray-900">{borrow.userName}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">User Email</span>
                  <p className="text-sm text-gray-900">{borrow.userEmail}</p>
                </div>
              </div>
            </div>

            {/* Book Information */}
            <div className="border-t pt-4">
              <h4 className="text-md font-medium text-gray-900 mb-3">Book Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">Book Title</span>
                  <p className="text-sm text-gray-900">{borrow.bookTitle}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Author</span>
                  <p className="text-sm text-gray-900">{borrow.bookAuthor}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Price</span>
                  <p className="text-sm text-gray-900">${borrow.price}</p>
                </div>
              </div>
            </div>

            {/* Borrow Period */}
            <div className="border-t pt-4">
              <h4 className="text-md font-medium text-gray-900 mb-3">Borrow Period</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">Borrowed At</span>
                  <p className="text-sm text-gray-900">{formatDate(borrow.borrowedAt)}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Due Date</span>
                  <p className="text-sm text-gray-900">{formatDate(borrow.dueDate)}</p>
                </div>
              </div>
            </div>

            {/* ID Card Image */}
            {borrow.idCardImagePath && (
              <div className="border-t pt-4">
                <h4 className="text-md font-medium text-gray-900 mb-3">ID Card Image</h4>
                <div className="max-w-xs">
                  <img
                    src={borrow.idCardImagePath}
                    alt="ID Card"
                    className="w-full h-auto rounded-lg border border-gray-300"
                    onError={(e) => {
                      console.error('Failed to load ID card image:', borrow.idCardImagePath);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="border-t pt-4 flex justify-end">
              <div className="flex space-x-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    onReturnBook(borrow.id);
                    onClose();
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Return Book
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowModal;