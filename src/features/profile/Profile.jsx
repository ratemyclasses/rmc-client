/*eslint-disable*/
import { ChatIcon, UserIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';
import { Navbar } from '../../common/Navbar';
import { EditProfile } from './EditProfile';
import { ViewReviews } from './ViewReviews';

export function Profile() {
  const [reviewOrProfile, setReviewOrProfile] = useState(0);
  const iconStyle = 'text-indigo-500 w-5 h-6 inline-flex items-center justify-center';
  const mapping = { 'My Reviews': <ViewReviews />, 'My Profile': <EditProfile /> };
  const navItems = [
    { label: 'My Profile', icon: <UserIcon className={iconStyle} /> },
    { label: 'My Reviews', icon: <ChatIcon className={iconStyle} /> }
  ];
  const changeDisplay = (e) => {
    setReviewOrProfile(e.target.innerText);
  };
  return (
    <div className="bg-white border-1">
      <Navbar />
      <div className="min-h-screen bg-white mt-20">
        <nav className="h-50 flex flex-col w-80 bg-white border-2 border-solid ml-40">
          <ul className="p-2 space-y-2 flex-1 overflow-auto" style={{ scrollbarWidth: 'thin' }}>
            {navItems.map((item) => {
              return (
                <li>
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
        </nav>
        {mapping[reviewOrProfile]}
      </div>
    </div>
  );
}
