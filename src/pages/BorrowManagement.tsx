import React, { useState, useEffect } from 'react';
import AdminNavigation from '../components/admin/AdminNavigation';
import BorrowsTable from '../components/admin/BorrowsTable';
import BorrowModal from '../components/admin/BorrowModal';
import LoadingSpinner from '../components/books/LoadingSpinner';
import ErrorMessage from '../components/books/ErrorMessage';
import { adminApi } from '../api/admin';
import type { AdminBorrowedBook } from '../api/admin';

const BorrowManagement: React.FC = () => {
  const [borrows, setBorrows] = useState<AdminBorrowedBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBorrow, setSelectedBorrow] = useState<AdminBorrowedBook | null>(null);

  useEffect(() => {
    fetchBorrows();
  }, []);

  const fetchBorrows = async () => {
    try {
      setLoading(true);
      setError('');
      const borrows = await adminApi.getBorrows();
      setBorrows(borrows);
    } catch (err) {
      setError('Failed to fetch borrows');
      console.error('Error fetching borrows:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewBorrow = (borrow: AdminBorrowedBook) => {
    setSelectedBorrow(borrow);
    setIsModalOpen(true);
  };

  const handleReturnBook = async (borrowId: number) => {
    try {
      await adminApi.returnBook(borrowId);
      setBorrows(borrows.filter(borrow => borrow.id !== borrowId));
    } catch (err) {
      setError('Failed to return book');
      console.error('Error returning book:', err);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBorrow(null);
  };

  const filteredBorrows = borrows;

  const getStats = () => {
    const now = new Date();
    const overdue = borrows.filter(b => new Date(b.dueDate) < now).length;
    const dueSoon = borrows.filter(b => {
      const dueDate = new Date(b.dueDate);
      const daysUntilDue = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return daysUntilDue <= 3 && daysUntilDue >= 0;
    }).length;
    const total = borrows.length;
    const recent = borrows.filter(b => {
      const createdAt = new Date(b.createdAt);
      const daysSinceCreated = Math.ceil((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
      return daysSinceCreated <= 7;
    }).length;

    return { total, overdue, dueSoon, recent };
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavigation />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Borrow Management</h1>
            <p className="mt-2 text-gray-600">Manage book borrow requests and returns</p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-sm font-medium">📚</span>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">Total Borrows</p>
                  <p className="text-lg font-semibold text-gray-900">{stats.total}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 text-sm font-medium">⚠️</span>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">Overdue</p>
                  <p className="text-lg font-semibold text-gray-900">{stats.overdue}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <span className="text-yellow-600 text-sm font-medium">⏰</span>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">Due Soon</p>
                  <p className="text-lg font-semibold text-gray-900">{stats.dueSoon}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-sm font-medium">🆕</span>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">Recent (7 days)</p>
                  <p className="text-lg font-semibold text-gray-900">{stats.recent}</p>
                </div>
              </div>
            </div>
          </div>


          {error && <ErrorMessage message={error} />}

          {loading ? (
            <LoadingSpinner />
          ) : (
            <BorrowsTable
              borrows={filteredBorrows}
              onViewBorrow={handleViewBorrow}
              onReturnBook={handleReturnBook}
            />
          )}

          <BorrowModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            borrow={selectedBorrow}
            onReturnBook={handleReturnBook}
          />
        </div>
      </div>
    </div>
  );
};

export default BorrowManagement;
