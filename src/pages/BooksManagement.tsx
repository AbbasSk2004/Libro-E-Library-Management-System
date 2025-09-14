import React, { useState, useEffect } from 'react';
import AdminNavigation from '../components/admin/AdminNavigation';
import BooksTable from '../components/admin/BooksTable';
import BookModal from '../components/admin/BookModal';
import LoadingSpinner from '../components/books/LoadingSpinner';
import ErrorMessage from '../components/books/ErrorMessage';
import { adminApi } from '../api/admin';
import type { Book } from '../api/admin';

const BooksManagement: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError('');
      const books = await adminApi.getBooks();
      setBooks(books);
    } catch (err) {
      setError('Failed to fetch books');
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditBook = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleDeleteBook = async (bookId: number) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await adminApi.deleteBook(bookId);
        setBooks(books.filter(book => book.id !== bookId));
      } catch (err) {
        setError('Failed to delete book');
        console.error('Error deleting book:', err);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  const handleSaveBook = async (bookData: Partial<Book>) => {
    try {
      if (selectedBook) {
        // Update existing book with form data
        const formData = new FormData();
        formData.append('title', bookData.title || selectedBook.title);
        formData.append('author', bookData.author || selectedBook.author);
        formData.append('category', bookData.category || selectedBook.category);
        formData.append('publishedYear', bookData.publishedYear?.toString() || selectedBook.publishedYear.toString());
        formData.append('description', bookData.description || selectedBook.description);
        formData.append('numberOfCopies', bookData.numberOfCopies?.toString() || selectedBook.numberOfCopies.toString());
        
        if (bookData.coverImage && typeof bookData.coverImage === 'object' && 'name' in bookData.coverImage) {
          formData.append('coverImage', bookData.coverImage as File);
        }

        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'https://libro-e-library-backend.onrender.com/api'}/admin/books/${selectedBook.id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: formData
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to update book');
        }

        const updatedBook = await response.json();
        setBooks(books.map(book => 
          book.id === selectedBook.id ? updatedBook : book
        ));
      } else {
        // Create new book with form data
        const formData = new FormData();
        formData.append('title', bookData.title || '');
        formData.append('author', bookData.author || '');
        formData.append('category', bookData.category || 'General');
        formData.append('publishedYear', bookData.publishedYear?.toString() || new Date().getFullYear().toString());
        formData.append('description', bookData.description || '');
        formData.append('numberOfCopies', bookData.numberOfCopies?.toString() || '1');
        
        if (bookData.coverImage && typeof bookData.coverImage === 'object' && 'name' in bookData.coverImage) {
          formData.append('coverImage', bookData.coverImage as File);
        }

        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'https://libro-e-library-backend.onrender.com/api'}/admin/books`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: formData
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to create book');
        }

        const newBook = await response.json();
        setBooks([...books, newBook]);
      }
      
      handleCloseModal();
    } catch (err) {
      setError('Failed to save book');
      console.error('Error saving book:', err);
    }
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavigation />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Books Management</h1>
                <p className="mt-2 text-gray-600">Manage library books and inventory</p>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Add New Book
              </button>
            </div>
          </div>

          <div className="mb-6">
            <input
              type="text"
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {error && <ErrorMessage message={error} />}

          {loading ? (
            <LoadingSpinner />
          ) : (
            <BooksTable
              books={filteredBooks}
              onEditBook={handleEditBook}
              onDeleteBook={handleDeleteBook}
            />
          )}

          <BookModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            book={selectedBook}
            onSave={handleSaveBook}
          />
        </div>
      </div>
    </div>
  );
};

export default BooksManagement;
