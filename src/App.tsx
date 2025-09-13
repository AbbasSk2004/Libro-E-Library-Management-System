import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Navigation from './components/common/Navigation';
import Footer from './components/common/Footer';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Books from './pages/Books';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import UserManagement from './pages/UserManagement';
import BooksManagement from './pages/BooksManagement';
import BorrowManagement from './pages/BorrowManagement';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <div className="flex flex-col min-h-screen">
                    <Navigation />
                    <Books />
                    <Footer />
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/books"
              element={
                <ProtectedRoute>
                  <div className="flex flex-col min-h-screen">
                    <Navigation />
                    <Books />
                    <Footer />
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <div className="flex flex-col min-h-screen">
                    <Navigation />
                    <Profile />
                    <Footer />
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute requireAdmin={true}>
                  <UserManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/books"
              element={
                <ProtectedRoute requireAdmin={true}>
                  <BooksManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/borrows"
              element={
                <ProtectedRoute requireAdmin={true}>
                  <BorrowManagement />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/books" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
