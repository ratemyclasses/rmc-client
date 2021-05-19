import React from 'react';
import { useSelector } from 'react-redux';
import { UniversityCard } from './UniversityCard';

export function Universities() {
  const colleges = useSelector((state) => state.college.colleges);

  return (
    <div>
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-10">
          <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">
            SUPPORTED UNIVERSITIES
          </h2>
          <h1 className="sm:text-3xl text-2xl font-bold title-font text-gray-900">
            Explore Courses at Your School
          </h1>
        </div>
        <div className="flex flex-wrap -m-4">
          {colleges.map((college) => (
            <UniversityCard
              name={college.shortName}
              tag={college.tag}
              description={college.description}
              key={college.tag}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
