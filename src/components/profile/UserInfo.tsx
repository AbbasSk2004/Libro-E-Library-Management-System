import React from 'react';

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

interface UserInfoProps {
  user: User | null;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">User Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <p className="mt-1 text-sm text-gray-900">{user?.name}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <p className="mt-1 text-sm text-gray-900">{user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
