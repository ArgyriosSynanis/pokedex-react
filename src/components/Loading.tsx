import React from 'react';
import { FaSpinner } from 'react-icons/fa';

export default function Loading() {
  return (
    <div className="flex flex-col items-center text-center">
      <FaSpinner className="text-center mx-auto text-gray-400" size={20} />
      <p className="p-2 m-4 text-xl">Loading....</p>
    </div>
  );
}
