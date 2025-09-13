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

export interface AdminBorrowedBook {
  id: number;
  userId: number;
  userName: string;
  userEmail: string;
  bookId: number;
  bookTitle: string;
  bookAuthor: string;
  borrowedAt: string;
  dueDate: string;
  price: number;
  idCardImagePath?: string;
  createdAt: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
}

export interface BorrowedBook {
  id: number;
  userId: number;
  bookId: number;
  userName: string;
  bookTitle: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'returned';
  idCardImage?: string;
  createdAt: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalBooks: number;
  activeBorrows: number;
  pendingReturns: number;
}

export interface RecentActivity {
  id: number;
  type: 'borrow' | 'return' | 'register' | 'add_book';
  user: string;
  book: string | null;
  time: string;
  status: 'completed' | 'pending' | 'failed';
}

export const adminApi = {
  // Dashboard
  getDashboardStats: async (): Promise<DashboardStats> => {
    const response = await api.get('/admin/dashboard/stats');
    return response.data;
  },

  getRecentActivity: async (): Promise<RecentActivity[]> => {
    const response = await api.get('/admin/dashboard/recent-activity');
    return response.data;
  },

  // User Management
  getUsers: async (): Promise<User[]> => {
    const response = await api.get('/admin/users');
    return response.data;
  },

  createUser: async (userData: CreateUserRequest): Promise<User> => {
    const response = await api.post('/admin/users', userData);
    return response.data;
  },

  updateUser: async (userId: number, userData: UpdateUserRequest): Promise<User> => {
    const response = await api.put(`/admin/users/${userId}`, userData);
    return response.data;
  },

  deleteUser: async (userId: number): Promise<void> => {
    await api.delete(`/admin/users/${userId}`);
  },

  // Book Management
  getBooks: async (): Promise<Book[]> => {
    const response = await api.get('/admin/books');
    return response.data;
  },

  createBook: async (bookData: any): Promise<Book> => {
    const response = await api.post('/admin/books', bookData);
    return response.data;
  },

  updateBook: async (bookId: number, bookData: any): Promise<Book> => {
    const response = await api.put(`/admin/books/${bookId}`, bookData);
    return response.data;
  },

  deleteBook: async (bookId: number): Promise<void> => {
    await api.delete(`/admin/books/${bookId}`);
  },

  // Borrow Management



  // Borrow Management
  getBorrows: async (): Promise<AdminBorrowedBook[]> => {
    const response = await api.get('/admin/borrows');
    return response.data;
  },
  returnBook: async (borrowId: number): Promise<void> => {
    await api.post(`/admin/borrows/${borrowId}/return`);
  },
};
