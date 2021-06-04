/*eslint-disable*/
import { ChartBarIcon, ChatIcon, UserIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ActivateBar } from '../../common/ActivateBar';
import { Navbar } from '../../common/Navbar';
import { BookmarkedCoursesView } from './BookmarkedCoursesView';
import { EditProfile } from './EditProfile';
import { ViewReviews } from './ViewReviews';

export function Profile() {
  const [reviewOrProfile, setReviewOrProfile] = useState('My Profile');
  const iconStyle = 'text-indigo-500 w-5 h-6 inline-flex items-center justify-center';
  const mapping = {
    'My Reviews': <ViewReviews />,
    'My Profile': <EditProfile />,
    'Bookmarked Courses': <BookmarkedCoursesView />
  };
  const navItems = [
    { label: 'My Profile', icon: <UserIcon className={iconStyle} /> },
    { label: 'My Reviews', icon: <ChatIcon className={iconStyle} /> },
    { label: 'Bookmarked Courses', icon: <ChartBarIcon className={iconStyle} /> }
  ];
  const changeDisplay = (e) => {
    setReviewOrProfile(e.target.innerText);
  };
  return (
    <div className="bg-white border-1">
      <Navbar />
      <div className="min-h-screen bg-white mt-20 md:grid md:grid-cols-3">
        <div className="md:col-span-1">
          <nav className="h-50 shadow overflow-hidden sm:rounded-md w-80 bg-white ml-40">
            <div className="divide-y md:divide divide-opacity-5">
              <div className="py-2">
                <ul
                  className="p-2 space-y-2 flex-1 overflow-auto"
                  style={{ scrollbarWidth: 'thin' }}
                >
                  {navItems.map((item) => {
                    return (
                      <li key={item.label}>
                        <button
                          onClick={changeDisplay}
                          className="flex space-x-2 items-center text-gray-600 p-2 hover:bg-gray-200 rounded-lg"
                        >
                          {item.icon}
                          <h3 className="text-l font-bold">{item.label}</h3>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="py-2 ml-3  mr-3">
                <h5 className="text-xs text-gray-400">
                  Want to report an error?{' '}
                  <a
                    className="text-indigo-700"
                    href="https://forms.gle/npzDseY42HSDHBRM8"
                    target="_blank"
                  >
                    Report it here
                  </a>
                </h5>
              </div>
            </div>
          </nav>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">{mapping[reviewOrProfile]}</div>
      </div>
    </div>
  );
}
