import React from 'react';

export function CourseCard() {
  return (
    <div className="bg-white  overflow-hidden shadow-sm rounded-lg w-full md:w-full relative py-4 px-4 mb-4">
      <div className="">
        <dl className="float-left py-2">
          <dd className="text-md font-semibold text-gray-900">CS 361</dd>
          <dt className="text-sm leading-5 text-gray-500 truncate">Probability and Statistics</dt>
          {/* <dd className="text-gray-500 font-semibold">
                        <span>
                            Hongye Liu
                        </span>
                    </dd> */}
        </dl>
        <span className="rounded-xl px-4 py-4 bg-purple-200 float-right font-extrabold text-purple-800">
          4.5
        </span>
      </div>
    </div>
  );
}
