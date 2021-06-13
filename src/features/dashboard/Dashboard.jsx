import React, { useState } from 'react';
import { Route, useLocation, useRouteMatch } from 'react-router-dom';
import { Navbar } from '../../common/Navbar';
import { CourseCard } from '../course/CourseCard';
import { CourseList } from './CourseList';
import { Header } from './Header';

export function Dashboard() {
  const { path } = useRouteMatch();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const [searchTerm, setSearchTerm] = useState(queryParams.has('q') ? queryParams.get('q') : '');

  return (
    <div>
      <Navbar />
      <div>
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="h-screen flex justify-between">
          <div className="hidden sm:block w-full border-r border-gray-200 sm:w-64 lg:w-96">
            <CourseList
              searchTerm={searchTerm}
              pageNum={queryParams.has('pageNum') ? queryParams.get('pageNum') : 0}
            />
          </div>
          <div className="flex-1 flex overflow-hidden">
            <div className="block w-full sm:w-full sm:block bg-white flex-1 overflow-y-scroll">
              <Route path={`${path}/:courseId`} component={CourseCard} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
