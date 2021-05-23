import React from 'react';

export function OverallRating({ avgRating }) {
  return (
    <div className="rounded-xl float-right p-3 px-4 mb-2 bg-indigo-500 dark:bg-gray-800 text-right">
      <div className="text-right items-right">
        {/* <svg viewBox="206.372 159.55 70.073 67.114" width="15" height="15">
          <path
            d="M 236.923 162.805 C 238.337 158.465 244.478 158.465 245.887 162.805 L 250.93 178.32 C 251.562 180.258 253.369 181.571 255.408 181.572 L 271.724 181.572 C 276.291 181.572 278.185 187.416 274.495 190.102 L 261.299 199.689 C 259.646 200.888 258.953 203.015 259.583 204.958 L 264.626 220.473 C 266.04 224.813 261.068 228.428 257.368 225.742 L 244.172 216.156 C 242.521 214.957 240.286 214.957 238.634 216.156 L 225.438 225.742 C 221.743 228.428 216.776 224.813 218.185 220.473 L 223.228 204.958 C 223.858 203.015 223.165 200.888 221.512 199.689 L 208.321 190.107 C 204.631 187.421 206.53 181.577 211.092 181.577 L 227.403 181.577 C 229.444 181.577 231.253 180.265 231.885 178.325 L 236.928 162.81 Z"
            style={{ fill: 'rgb(255, 255, 255)' }}
          />
        </svg> */}
        {/* <p className="text-sm text-right text-white dark:text-gray-50">Overall</p> */}
      </div>
      <div className="flex flex-row justify-start">
        <div className="py-2 mr-2 float-left">
          <svg viewBox="206.372 159.55 70.073 67.114" width="15" height="15">
            <path
              d="M 236.923 162.805 C 238.337 158.465 244.478 158.465 245.887 162.805 L 250.93 178.32 C 251.562 180.258 253.369 181.571 255.408 181.572 L 271.724 181.572 C 276.291 181.572 278.185 187.416 274.495 190.102 L 261.299 199.689 C 259.646 200.888 258.953 203.015 259.583 204.958 L 264.626 220.473 C 266.04 224.813 261.068 228.428 257.368 225.742 L 244.172 216.156 C 242.521 214.957 240.286 214.957 238.634 216.156 L 225.438 225.742 C 221.743 228.428 216.776 224.813 218.185 220.473 L 223.228 204.958 C 223.858 203.015 223.165 200.888 221.512 199.689 L 208.321 190.107 C 204.631 187.421 206.53 181.577 211.092 181.577 L 227.403 181.577 C 229.444 181.577 231.253 180.265 231.885 178.325 L 236.928 162.81 Z"
              style={{ fill: 'rgb(255, 255, 255)' }}
            />
          </svg>
        </div>

        <p className="text-white text-2xl text-right dark:text-white font-bold">
          {avgRating ? (
            <>
              {avgRating.toFixed(1)}
              <span className="text-white font-normal text-lg text-right dark:text-white ">/5</span>
            </>
          ) : (
            'N/A'
          )}
        </p>

        {/* <div className="relative w-28 h-2 bg-indigo-300 rounded">
          <div className="absolute top-0 h-2  left-0 rounded bg-white w-2/3" />
        </div> */}
      </div>
    </div>
  );
}
