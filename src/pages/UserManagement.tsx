import React, { useState, useEffect } from 'react';
import AdminNavigation from '../components/admin/AdminNavigation';
import UserTable from '../components/admin/UserTable';
import UserModal from '../components/admin/UserModal';
import LoadingSpinner from '../components/books/LoadingSpinner';
import ErrorMessage from '../components/books/ErrorMessage';
import { adminApi } from '../api/admin';
import type { User, CreateUserRequest, UpdateUserRequest } from '../api/admin';

// User interface is now imported from admin.ts

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
      
      const users = await adminApi.getUsers();
      setUsers(users);
    } catch (err) {
      setError('Failed to fetch users');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = async (userId: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await adminApi.deleteUser(userId);
        setUsers(users.filter(user => user.id !== userId));
      } catch (err) {
        setError('Failed to delete user');
        console.error('Error deleting user:', err);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleSaveUser = async (userData: Partial<User>) => {
    try {
      if (selectedUser) {
        // Update existing user
        const updateData: UpdateUserRequest = {
          name: userData.name,
          email: userData.email,
          role: userData.role,
          password: (userData as any).password // Include password if provided
        };
        
        const updatedUser = await adminApi.updateUser(selectedUser.id, updateData);
        setUsers(users.map(user => 
          user.id === selectedUser.id ? updatedUser : user
        ));
      } else {
        // Create new user
        const createData: CreateUserRequest = {
          name: userData.name || '',
          email: userData.email || '',
          password: 'defaultPassword123!', // You might want to handle this differently
          role: userData.role || 'User'
        };
        
        const newUser = await adminApi.createUser(createData);
        setUsers([...users, newUser]);
      }
      
      handleCloseModal();
    } catch (err) {
      setError('Failed to save user');
      console.error('Error saving user:', err);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavigation />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                <p className="mt-2 text-gray-600">Manage user accounts and permissions</p>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Add New User
              </button>
            </div>
          </div>

          <div className="mb-6">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {error && <ErrorMessage message={error} />}

          {loading ? (
            <LoadingSpinner />
          ) : (
            <UserTable
              users={filteredUsers}
              onEditUser={handleEditUser}
              onDeleteUser={handleDeleteUser}
            />
          )}

          <UserModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            user={selectedUser}
            onSave={handleSaveUser}
          />
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
