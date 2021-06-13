import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

export function Header({ searchTerm, setSearchTerm }) {
  const college = useSelector((state) => state.college.college);
  const history = useHistory();
  const location = useLocation();

  if (!college) {
    return <div>Loading...</div>;
  }

  const isModeratorMode = location.pathname.includes('moderate');

  const onChangeSearchTerm = (term) => {
    setSearchTerm(term);
    if (!term) {
      const queryParams = new URLSearchParams(location.search);
      queryParams.delete('q');
      history.replace({
        search: queryParams.toString()
      });
    } else {
      history.push({
        pathname: location.pathname,
        search: `?q=${term}`
      });
    }
  };

  return (
    <div className="md:flex md:items-center bg-white border-t border-b py-3 pl-4">
      {isModeratorMode ? (
        <h1 className="text-2xl">Pending Reviews</h1>
      ) : (
        <>
          <div className="relative flex items-center w-full px-4 my-4 sm:w-96 sm:ml-4">
            <input
              type="text"
              className="block w-full sm:w-full py-2 pl-4 pr-4 leading-normal rounded-full focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 ring-opacity-90 bg-gray-100 dark:bg-gray-800 text-gray-400 aa-input"
              placeholder="Search"
              onChange={(e) => onChangeSearchTerm(e.target.value)}
              value={searchTerm}
            />
          </div>
          <div className="w-full flex mb-4 mx-auto items-center overflow-auto sm:w-full sm:ml-4 sm:mb-0">
            <button
              type="button"
              className="px-4 py-2 text-base flex items-center rounded-full text-indigo-500 border border-indigo-500 undefined "
            >
              Department
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <button
              type="button"
              className="ml-2 px-4 py-2 text-base flex items-center rounded-full text-indigo-500 border border-indigo-500 undefined "
            >
              Department
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <button
              type="button"
              className="ml-2 px-4 py-2 text-base flex items-center rounded-full text-indigo-500 border border-indigo-500 undefined "
            >
              Department
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <button
              type="button"
              className="ml-2 px-4 py-2 text-base flex items-center rounded-full text-indigo-500 border border-indigo-500 undefined "
            >
              Department
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
