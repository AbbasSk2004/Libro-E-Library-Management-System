# Libro - E-Library Management System

A modern, full-stack eLibrary management system built with React, TypeScript, and ASP.NET Core. This repository contains the frontend application that provides an intuitive interface for users to browse, borrow, and manage books, as well as comprehensive admin tools for library management.

## ✨ Features

### User Features
- **🔐 Authentication**: Secure JWT-based authentication with persistent login
- **📚 Book Management**: Browse, search, and filter books by category
- **📖 Book Borrowing**: Borrow and return books with due date tracking
- **👤 User Profile**: View personal information and borrowed books history
- **📱 Responsive Design**: Modern, mobile-first UI built with TailwindCSS
- **🔍 Advanced Search**: Search books by title, author, or category
- **📊 Book Availability**: Real-time availability status and copy tracking

### Admin Features
- **📊 Dashboard**: Comprehensive analytics and recent activity overview
- **📚 Book Management**: Add, edit, delete books with cover image upload
- **👥 User Management**: Manage user accounts and permissions
- **📋 Borrow Management**: Track and manage all book borrows and returns
- **📈 Statistics**: Real-time library statistics and reporting
- **🖼️ Media Management**: Upload and manage book cover images

## 🛠️ Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** for fast development and building
- **React Router v6** for navigation
- **Axios** for API calls with JWT interceptors
- **TailwindCSS** for responsive styling
- **Context API** for state management

### Backend (Separate Repository)
- **ASP.NET Core** Web API
- **PostgreSQL** database with Supabase
- **JWT Authentication**
- **File Storage** with Supabase Storage

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **React Router v6** for navigation
- **Axios** for API calls with JWT interceptors
- **TailwindCSS** for styling
- **Context API** for state management

## 📁 Project Structure

```
src/
├── api/                    # API service functions
│   ├── axios.ts           # Axios instance with JWT interceptor
│   ├── auth.ts            # Authentication API calls
│   ├── books.ts           # Books API calls
│   └── admin.ts           # Admin API calls
├── components/            # Reusable components
│   ├── admin/             # Admin-specific components
│   │   ├── AdminNavigation.tsx
│   │   ├── BookModal.tsx
│   │   ├── BooksTable.tsx
│   │   ├── BorrowModal.tsx
│   │   ├── BorrowsTable.tsx
│   │   └── ...
│   ├── books/             # Book-related components
│   │   ├── BookCard.tsx
│   │   ├── BookSearch.tsx
│   │   ├── BooksGrid.tsx
│   │   └── ...
│   ├── common/            # Shared components
│   │   ├── Navigation.tsx
│   │   └── ProtectedRoute.tsx
│   ├── login/             # Authentication components
│   │   ├── LoginForm.tsx
│   │   └── LoginHeader.tsx
│   └── profile/           # Profile components
│       ├── ProfileHeader.tsx
│       └── BorrowedBooksList.tsx
├── context/              # React Context providers
│   └── AuthContext.tsx   # Authentication context
├── pages/                # Page components
│   ├── Login.tsx         # Login page
│   ├── SignUp.tsx        # Registration page
│   ├── Books.tsx         # Books listing and search
│   ├── Profile.tsx       # User profile
│   ├── AdminDashboard.tsx # Admin dashboard
│   ├── BooksManagement.tsx # Admin book management
│   ├── BorrowManagement.tsx # Admin borrow management
│   └── UserManagement.tsx # Admin user management
└── App.tsx               # Main app component with routing
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Backend API** running (see backend repository)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AbbasSk2004/Libro-E-Library-Management-System.git
   cd Libro-E-Library-Management-System
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and configure your API URL:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser and navigate to `http://localhost:5173`**

### Demo Credentials

For testing purposes, use these credentials:
- **Admin Email**: `abbas@gmail.com`
- **Admin Password**: `123456`
- **User Email**: `skaiki@gmail.com`
- **User Password**: `123456`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📋 Features Overview

### 🔐 Authentication & Authorization
- JWT token storage in localStorage
- Automatic token attachment to API requests
- Token expiration handling with automatic logout
- Protected routes for authenticated users
- Role-based access control (User/Admin)
- Secure password handling

### 📚 Books Management
- **Responsive Grid Layout**: Display books in an adaptive grid
- **Advanced Search**: Search by title, author, or category
- **Category Filtering**: Filter books by predefined categories
- **Book Details**: View comprehensive book information
- **Cover Images**: High-quality book cover display
- **Availability Status**: Real-time availability tracking
- **Copy Management**: Track number of available copies

### 📖 Borrowing System
- **One-Click Borrowing**: Simple book borrowing process
- **Due Date Tracking**: Automatic due date calculation
- **Return Management**: Easy book return functionality
- **Overdue Indicators**: Visual indicators for overdue books
- **Borrow History**: Complete borrowing history tracking

### 👤 User Profile
- **Personal Information**: View and manage user details
- **Borrowed Books**: Current and historical book borrows
- **Due Date Alerts**: Visual indicators for upcoming due dates
- **Return Actions**: Quick return functionality

### 🛠️ Admin Dashboard
- **Analytics Overview**: Key library statistics and metrics
- **Recent Activity**: Real-time activity feed
- **Quick Actions**: Fast access to common admin tasks
- **User Management**: Comprehensive user account management
- **Book Management**: Full CRUD operations for books
- **Borrow Management**: Track and manage all borrows
- **Media Management**: Upload and manage book covers

### 📱 Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Responsive design for tablets
- **Desktop Experience**: Full-featured desktop interface
- **Touch-Friendly**: Intuitive touch interactions

## 🔌 API Integration

The frontend is designed to work with a backend API. Configure the API base URL using environment variables:

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api

# Optional: Supabase Configuration (if using direct Supabase)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Expected API Endpoints

#### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/logout` - User logout
- `GET /auth/profile` - Get user profile

#### Books
- `GET /books` - Get all books (with optional search query)
- `GET /books/:id` - Get book by ID
- `POST /books/:id/borrow` - Borrow a book
- `POST /books/:id/return` - Return a book

#### User
- `GET /user/borrowed-books` - Get user's borrowed books

#### Admin (Protected)
- `GET /admin/books` - Get all books for admin
- `POST /admin/books` - Create new book
- `PUT /admin/books/:id` - Update book
- `DELETE /admin/books/:id` - Delete book
- `GET /admin/borrows` - Get all borrows
- `POST /admin/borrows/:id/return` - Admin return book
- `GET /admin/dashboard/stats` - Get dashboard statistics
- `GET /admin/dashboard/recent-activity` - Get recent activity

## Customization

### Styling
The project uses TailwindCSS for styling. Customize the design by:
- Modifying `tailwind.config.js` for theme customization
- Adding custom CSS in `src/index.css`
- Using Tailwind utility classes in components

### Adding New Pages
1. Create a new component in `src/pages/`
2. Add the route in `src/App.tsx`
3. Update navigation in `src/components/Navigation.tsx`

### Adding New API Endpoints
1. Add new functions in `src/api/` files
2. Update TypeScript interfaces as needed
3. Use the functions in your components

## 🚀 Production Deployment

### Build for Production

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **The `dist` folder contains the production build**

### Deployment Options

#### Option 1: Static Hosting (Recommended)
Deploy to platforms like:
- **Vercel** (Recommended)
- **Netlify**
- **GitHub Pages**
- **Firebase Hosting**

#### Option 2: Traditional Web Server
Deploy to:
- **Apache**
- **Nginx**
- **IIS**

### Environment Configuration

For production deployment, ensure you have:

1. **Environment Variables:**
   ```env
   VITE_API_BASE_URL=https://your-api-domain.com/api
   ```

2. **CORS Configuration:**
   Ensure your backend API allows requests from your frontend domain.

3. **HTTPS:**
   Use HTTPS in production for security.

### Vercel Deployment (Quick Start)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Set Environment Variables:**
   - Go to your Vercel dashboard
   - Add `VITE_API_BASE_URL` environment variable

### Performance Optimization

- **Code Splitting**: Automatic with Vite
- **Tree Shaking**: Automatic dead code elimination
- **Minification**: Automatic in production build
- **Image Optimization**: Use WebP format for book covers

## 🌐 Browser Support

- **Chrome** (latest)
- **Firefox** (latest)
- **Safari** (latest)
- **Edge** (latest)
- **Mobile browsers** (iOS Safari, Chrome Mobile)

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch:**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Test thoroughly**
5. **Commit your changes:**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
6. **Push to the branch:**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React** team for the amazing framework
- **Vite** team for the fast build tool
- **TailwindCSS** team for the utility-first CSS framework
- **Supabase** team for the backend-as-a-service platform

## 📞 Support

If you have any questions or need help, please:

1. Check the [Issues](https://github.com/AbbasSk2004/Libro-E-Library-Management-System/issues) page
2. Create a new issue if your problem isn't already reported
3. Contact the maintainers

---

**Made with ❤️ by the Libro Team**