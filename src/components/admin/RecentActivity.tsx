import React from 'react';

interface Activity {
  id: number;
  type: 'borrow' | 'return' | 'register' | 'add_book';
  user: string;
  book: string | null;
  time: string;
  status: 'completed' | 'pending' | 'failed';
}

interface RecentActivityProps {
  activities: Activity[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'borrow':
        return '📖';
      case 'return':
        return '↩️';
      case 'register':
        return '👤';
      case 'add_book':
        return '📚';
      default:
        return '📝';
    }
  };

  const getActivityText = (activity: Activity) => {
    switch (activity.type) {
      case 'borrow':
        return `${activity.user} borrowed "${activity.book}"`;
      case 'return':
        return `${activity.user} returned "${activity.book}"`;
      case 'register':
        return `${activity.user} registered`;
      case 'add_book':
        return `Added book "${activity.book}"`;
      default:
        return 'Unknown activity';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
          Recent Activity
        </h3>
        <div className="flow-root">
          {activities.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No recent activity</p>
            </div>
          ) : (
            <ul className="-mb-8">
              {activities.map((activity, activityIdx) => (
              <li key={activity.id}>
                <div className="relative pb-8">
                  {activityIdx !== activities.length - 1 ? (
                    <span
                      className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div className="relative flex space-x-3">
                    <div>
                      <span className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center ring-8 ring-white">
                        <span className="text-sm">{getActivityIcon(activity.type)}</span>
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p className="text-sm text-gray-500">
                          {getActivityText(activity)}
                        </p>
                      </div>
                      <div className="text-right text-sm whitespace-nowrap text-gray-500">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                          {activity.status}
                        </span>
                        <p className="mt-1">{activity.time}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
