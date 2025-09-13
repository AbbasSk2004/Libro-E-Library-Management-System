import api from './axios';

export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  publishedYear: number;
  category: string;
  numberOfCopies: number;
  available: boolean;
  coverImage?: string;
}

export interface BorrowedBook {
  id: number;
  book: Book;
  borrowedAt: string;
  dueDate: string;
}

export const booksApi = {
  // Get all books with optional search
  getBooks: async (search?: string): Promise<Book[]> => {
    const params = search ? { search } : {};
    const response = await api.get('/books', { params });
    return response.data;
  },

  // Get book by ID
  getBookById: async (id: number): Promise<Book> => {
    const response = await api.get(`/books/${id}`);
    return response.data;
  },

  // Borrow a book
  borrowBook: async (bookId: number): Promise<void> => {
    await api.post(`/books/${bookId}/borrow`);
  },

  // Return a book
  returnBook: async (bookId: number): Promise<void> => {
    await api.post(`/books/${bookId}/return`);
  },

  // Get user's borrowed books
  getBorrowedBooks: async (): Promise<BorrowedBook[]> => {
    const response = await api.get('/books/borrowed-books');
    return response.data;
  },
};
