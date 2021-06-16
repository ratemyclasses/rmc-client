import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { logout } from '../app/actions/auth.actions';
import { getCollegeByTag, getColleges } from '../app/actions/college.actions';
import { STATUS } from '../app/constants';
import { hasRoles } from '../features/utils';
import { CustomDropdown } from './CustomDropdown';

export function Navbar({ moderate = false }) {
  const dispatch = useDispatch();
  const collegeStatus = useSelector((state) => state.college.status);
  const colleges = useSelector((state) => state.college.colleges);
  const currCollege = useSelector((state) => state.college.college);
  const user = useSelector((state) => state.user.user);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const history = useHistory();
  const { tag } = useParams();

  const tags = [];
  const options = [];
  colleges.forEach((college) => {
    tags.push(college.tag);
    if (!tag) {
      options.push({
        name: college.shortName,
        value: college.tag
      });
    } else if (currCollege && currCollege.tag !== college.tag) {
      options.push({
        name: college.shortName,
        value: college.tag
      });
    }
  });

  if (tag && currCollege) {
    options.unshift({
      name: currCollege.shortName,
      value: currCollege.tag
    });
  } else {
    options.unshift({ name: 'Select a school', value: null });
  }

  useEffect(() => {
    if (collegeStatus === STATUS.idle) {
      dispatch(
        getColleges({
          fields: ['shortName', 'tag']
        })
      );
    }
  }, [dispatch, collegeStatus]);

  useEffect(() => {
    if (tag && (!currCollege || tag !== currCollege.tag)) {
      dispatch(getCollegeByTag(tag));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, tag]);

  const onChange = ({ value }) => {
    if (value) {
      history.push(moderate ? `/moderate/u/${value}` : `/u/${value}`);
    }
  };

  return (
    <nav className="bg-white">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>

              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="b"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>

              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex ml-2 items-stretch justify-start">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/">
                <img
                  className="block h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                  alt="Workflow"
                />
              </Link>
            </div>
            <div className="ml-6">
              <div className="flex space-x-4">
                <CustomDropdown options={options} handleChange={onChange} />
              </div>
            </div>
          </div>
          <div className="absolute float-right inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className={user ? 'hidden' : 'px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'}>
              <button
                onClick={() => history.push('/signup')}
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-500 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Sign Up
              </button>
              <button
                onClick={() => history.push('/login')}
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Log In
              </button>
            </div>
            <div className={!user ? 'hidden' : 'ml-3 relative'}>
              <div>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  type="button"
                  className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </button>
              </div>

              <div
                className={
                  !userMenuOpen
                    ? 'hidden'
                    : 'origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'
                }
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabIndex="-1"
              >
                <Link
                  to="/profile"
                  onClick={() => setUserMenuOpen(false)}
                  className={
                    !userMenuOpen
                      ? 'hidden'
                      : 'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                  }
                  role="menuitem"
                  tabIndex="-1"
                  id="user-menu-item-0"
                >
                  Your Profile
                </Link>
                <Link
                  to="/u/ucb"
                  onClick={() => setUserMenuOpen(false)}
                  className={
                    !userMenuOpen
                      ? 'hidden'
                      : 'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                  }
                  role="menuitem"
                  tabIndex="-1"
                  id="user-menu-item-1"
                >
                  Course Search
                </Link>
                {user && hasRoles(user.roles, ['ADMIN', 'MODERATOR']) && (
                  <Link
                    to="/moderate/u/ucb"
                    onClick={() => setUserMenuOpen(false)}
                    className={
                      !userMenuOpen
                        ? 'hidden'
                        : 'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                    }
                    role="menuitem"
                    tabIndex="-1"
                    id="user-menu-item-2"
                  >
                    Approve Reviews
                  </Link>
                )}
                <button
                  onClick={() => dispatch(logout())}
                  className={
                    !userMenuOpen
                      ? 'hidden'
                      : 'w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                  }
                  role="menuitem"
                  tabIndex="-1"
                  id="user-menu-item-3"
                  type="button"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
