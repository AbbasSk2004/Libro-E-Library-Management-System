import React from 'react';

interface Stats {
  totalUsers: number;
  totalBooks: number;
  activeBorrows: number;
  pendingReturns: number;
}

interface AdminStatsProps {
  stats: Stats;
}

const AdminStats: React.FC<AdminStatsProps> = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: '👥',
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      title: 'Total Books',
      value: stats.totalBooks,
      icon: '📚',
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      title: 'Active Borrows',
      value: stats.activeBorrows,
      icon: '📖',
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600'
    },
    {
      title: 'Pending Returns',
      value: stats.pendingReturns,
      icon: '⏰',
      color: 'bg-red-500',
      textColor: 'text-red-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className={`w-8 h-8 ${stat.color} rounded-md flex items-center justify-center`}>
                  <span className="text-white text-lg">{stat.icon}</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {stat.title}
                  </dt>
                  <dd className={`text-lg font-medium ${stat.textColor}`}>
                    {stat.value.toLocaleString()}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminStats;
