import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminNavigation: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-indigo-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/admin" className="flex-shrink-0 flex items-center">
              <img 
                src="/logo.png" 
                loading="lazy"
                alt="Libro Logo" 
                className="h-8 w-8 mr-2"
              />
              <h1 className="text-xl font-bold text-white">Libro Admin</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/admin"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/admin')
                    ? 'bg-indigo-800 text-white'
                    : 'text-indigo-200 hover:text-white hover:bg-indigo-800'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/admin/users"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/admin/users')
                    ? 'bg-indigo-800 text-white'
                    : 'text-indigo-200 hover:text-white hover:bg-indigo-800'
                }`}
              >
                User Management
              </Link>
              <Link
                to="/admin/books"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/admin/books')
                    ? 'bg-indigo-800 text-white'
                    : 'text-indigo-200 hover:text-white hover:bg-indigo-800'
                }`}
              >
                Books Management
              </Link>
              <Link
                to="/admin/borrows"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/admin/borrows')
                    ? 'bg-indigo-800 text-white'
                    : 'text-indigo-200 hover:text-white hover:bg-indigo-800'
                }`}
              >
                Borrow Management
              </Link>
            </div>
          </div>

          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center">
            <span className="text-sm text-indigo-200 mr-4">
              Admin: {user?.name}
            </span>
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-md text-sm font-medium text-indigo-200 hover:text-white hover:bg-indigo-800"
            >
              Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-indigo-200 hover:text-white hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-indigo-800 border-t border-indigo-700">
            {/* Mobile Navigation Links */}
            <Link
              to="/admin"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/admin')
                  ? 'bg-indigo-700 text-white'
                  : 'text-indigo-200 hover:text-white hover:bg-indigo-700'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/admin/users"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/admin/users')
                  ? 'bg-indigo-700 text-white'
                  : 'text-indigo-200 hover:text-white hover:bg-indigo-700'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              User Management
            </Link>
            <Link
              to="/admin/books"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/admin/books')
                  ? 'bg-indigo-700 text-white'
                  : 'text-indigo-200 hover:text-white hover:bg-indigo-700'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Books Management
            </Link>
            <Link
              to="/admin/borrows"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/admin/borrows')
                  ? 'bg-indigo-700 text-white'
                  : 'text-indigo-200 hover:text-white hover:bg-indigo-700'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Borrow Management
            </Link>
            
            {/* Mobile User Info */}
            <div className="border-t border-indigo-700 pt-4 pb-3">
              <div className="flex items-center px-3">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-indigo-700 flex items-center justify-center">
                    <span className="text-sm font-medium text-white">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">{user?.name}</div>
                  <div className="text-sm font-medium text-indigo-200">Administrator</div>
                </div>
              </div>
              <div className="mt-3 px-2">
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-indigo-200 hover:text-white hover:bg-indigo-700"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavigation;
