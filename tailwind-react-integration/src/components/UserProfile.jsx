import React from 'react';

function UserProfile() {
  return (
    <div className="bg-gray-100 p-4 md:p-8 max-w-xs md:max-w-sm mx-auto my-20 rounded-lg shadow-lg">
      <img 
        className="w-24 h-24 md:w-36 md:h-36 rounded-full mx-auto"
        src="https://via.placeholder.com/150" 
        alt="User" 
        />
      <h1 
        className="text-lg md:test-xl text-blue-800 my-4 text-center">
        John Doe
        </h1>
      <p className="text-gray-600 text-sm md:text-base text-center">
        Developer at Example Co. Loves to write code and explore new technologies.
        </p>
    </div>
  );
}

export default UserProfile;