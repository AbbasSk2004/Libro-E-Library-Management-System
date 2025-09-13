import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { booksApi } from '../api/books';
import type { Book } from '../api/books';
import BooksHeader from '../components/books/BooksHeader';
import BookSearch from '../components/books/BookSearch';
import BooksGrid from '../components/books/BooksGrid';
import LoadingSpinner from '../components/books/LoadingSpinner';
import ErrorMessage from '../components/books/ErrorMessage';
import BorrowModal from '../components/books/BorrowModal';

const Books: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const books = await booksApi.getBooks(searchTerm);
      
      // Filter by category if not "All Categories"
      let filteredBooks = books;
      if (selectedCategory !== 'All Categories') {
        filteredBooks = books.filter(book => book.category === selectedCategory);
      }
      
      setBooks(filteredBooks);
    } catch (err) {
      setError('Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBooks();
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleBorrow = (bookId: number) => {
    const book = books.find(b => b.id === bookId);
    if (book) {
      setSelectedBook(book);
      setIsModalOpen(true);
    }
  };

  const handleConfirmBorrow = async (bookId: number, startDate: string, endDate: string, idCardImage: File) => {
    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('StartDate', startDate);
      formData.append('EndDate', endDate);
      formData.append('IdCardImage', idCardImage);

      // Call the API with FormData
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}/books/${bookId}/borrow`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to borrow book');
      }

      const borrowedBookData = await response.json();
      
      // Refresh books list
      await fetchBooks();
      
      // Show success message with book details
      const bookTitle = borrowedBookData.book?.title || 'the book';
      const dueDate = new Date(borrowedBookData.dueDate).toLocaleDateString();
      alert(`Book "${bookTitle}" borrowed successfully! Please come and collect it from the library. Due date: ${dueDate}. Thank you!`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to borrow book. Please try again.';
      alert(errorMessage);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  return (
    <div className="flex-1 bg-gray-50">
      <div className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 sm:space-y-6">
          <BooksHeader userName={user?.name} />

          <BookSearch
            searchTerm={searchTerm}
            onSearchTermChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            onSearch={handleSearch}
          />

          {error && <ErrorMessage message={error} />}

          {loading ? (
            <LoadingSpinner />
          ) : (
            <BooksGrid books={books} onBorrow={handleBorrow} />
          )}

          <BorrowModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            book={selectedBook}
            onConfirmBorrow={handleConfirmBorrow}
          />
        </div>
      </div>
    </div>
  );
};

export default Books;
