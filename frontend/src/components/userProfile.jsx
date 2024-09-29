import React from 'react';

function UserProfile() {
  return (
    <div className="flex items-center space-x-2 mb-4 mt-4 ml-4">
      <div className="w-20 h-20 rounded-full bg-gray-300" />
      <div>
        <p className="text-white">John Doe</p>
        <p className="text-sm text-gray-400 cursor-pointer">View Profile</p>
      </div>
    </div>
  );
}

export default UserProfile;