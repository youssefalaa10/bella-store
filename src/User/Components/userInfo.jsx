import React from "react";
import { useSelector } from "react-redux";

function UserInfo() {
  const { userDetails } = useSelector((state) => state.auth);

  if (!userDetails)
    return <p className="text-center text-gray-500 mt-10">Loading...</p>;

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8 mt-12 transition-all duration-300 ease-in-out hover:shadow-xl">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-6 text-center tracking-tight">
        User Information
      </h2>
      <div className="border-t border-gray-200 mt-6 mb-6"></div>
      <div className="mt-6 space-y-6 text-gray-700">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-lg">Name:</span>
          <span className="text-lg">{userDetails.userName}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-semibold text-lg">Email:</span>
          <span className="text-lg">{userDetails.userEmail}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-semibold text-lg">Phone Number:</span>
          <span className="text-lg">{userDetails.phone || "N/A"}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-semibold text-lg">Address:</span>
          <span className="text-lg">{userDetails.address || "N/A"}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-semibold text-lg">City:</span>
          <span className="text-lg">{userDetails.city || "N/A"}</span>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
