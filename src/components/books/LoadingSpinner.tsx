import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="text-center py-8 sm:py-12">
      <div className="inline-block animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-indigo-600"></div>
      <p className="mt-2 sm:mt-4 text-sm sm:text-base text-gray-600">Loading books...</p>
    </div>
  );
};

export default LoadingSpinner;
