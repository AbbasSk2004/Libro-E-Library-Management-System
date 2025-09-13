import React from 'react';

const SignUpHeader: React.FC = () => {
  return (
    <div>
      <div className="flex justify-center items-center mb-4">
        <img 
          src="/logo.png" 
          alt="Libro Logo" 
          className="h-12 w-12 mr-3"
        />
        <h1 className="text-2xl font-bold text-indigo-600">Libro.lb</h1>
      </div>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Create your account
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        Join eLibrary and start borrowing books
      </p>
    </div>
  );
};

export default SignUpHeader;
