import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { booksApi } from '../api/books';
import type { BorrowedBook } from '../api/books';
import { useNavigate } from 'react-router-dom';
import ProfileHeader from '../components/profile/ProfileHeader';
import UserInfo from '../components/profile/UserInfo';
import BorrowedBooksList from '../components/profile/BorrowedBooksList';
import EmptyBorrowedBooks from '../components/profile/EmptyBorrowedBooks';

const Profile: React.FC = () => {
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBorrowedBooks();
  }, []);

  const fetchBorrowedBooks = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Fetch real borrowed books from API
      const borrowedBooks = await booksApi.getBorrowedBooks();
      setBorrowedBooks(borrowedBooks);
    } catch (err) {
      console.error('Error fetching borrowed books:', err);
      setError('Failed to fetch borrowed books');
    } finally {
      setLoading(false);
    }
  };

  const handleReturnBook = async (bookId: number) => {
    try {
      await booksApi.returnBook(bookId);
      fetchBorrowedBooks();
      alert('Book returned successfully! Thank you for using our library.');
    } catch (err) {
      console.error('Error returning book:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to return book. Please try again.';
      alert(errorMessage);
    }
  };



  return (
    <div className="flex-1 bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <ProfileHeader />

          <UserInfo user={user} />

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Borrowed Books</h2>

            <BorrowedBooksList
              borrowedBooks={borrowedBooks}
              loading={loading}
              error={error}
              onReturn={handleReturnBook}
            />

            {!loading && borrowedBooks.length === 0 && (
              <EmptyBorrowedBooks onBrowseBooks={() => navigate('/books')} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
