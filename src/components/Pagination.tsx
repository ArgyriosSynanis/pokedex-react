import React from 'react';

type Props = {
  goToNextPage: React.MouseEventHandler<HTMLButtonElement>;
  goToPrevPage: React.MouseEventHandler<HTMLButtonElement>;
  prevPageUrl: string;
  nextPageUrl: string;
};

const Pagination = ({
  goToPrevPage,
  goToNextPage,
  prevPageUrl,
  nextPageUrl,
}: Props) => {
  return (
    <div className="flex flex-row gap-6 align-center justify-center mb-10">
      {prevPageUrl && (
        <button
          className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text- font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
          onClick={goToPrevPage}
        >
          <p className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Previous
          </p>
        </button>
      )}
      {nextPageUrl && (
        <button
          className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text- font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
          onClick={goToNextPage}
        >
          <p className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Next
          </p>
        </button>
      )}
    </div>
  );
};

export default Pagination;
