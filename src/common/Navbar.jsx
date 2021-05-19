import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { getCollegeByTag, getColleges } from "../app/actions/college.actions";
import { STATUS } from "../app/constants";

export function Navbar(props) {

    const dispatch = useDispatch();
    const status = useSelector((state) => state.college.status);
    const colleges = useSelector((state) => state.college.colleges);
    const currCollege = useSelector((state) => state.college.college);
    const history = useHistory();

    const { tag } = useParams();
    useEffect(() => {
        if (status === STATUS.idle) {
            dispatch(getColleges());

        }
        if (!currCollege || tag != currCollege.tag) {
            dispatch(getCollegeByTag(tag))
        }
    });
    console.log(tag);
    console.log(colleges);
    console.log(currCollege);

    let [userMenuOpen, setUserMenuOpen] = useState(false);
    let [collegeMenuOpen, setCollegeMenuOpen] = useState(false);


    return (
        <nav class="bg-white">
            <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div class="relative flex items-center justify-between h-16">
                    <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                            <span class="sr-only">Open main menu</span>

                            <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="b" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>

                            <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div class="flex-1 flex ml-2 items-stretch justify-start">
                        <div class="flex-shrink-0 flex items-center">
                            <img class="block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow" />
                            {/* <img class="hidden lg:block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-black-text.svg" alt="Workflow" /> */}
                        </div>
                        <div class="ml-6">
                            <div class="flex space-x-4">
                                <div>
                                    <button onClick={() => setCollegeMenuOpen(!collegeMenuOpen)} type="button" class=" border border-gray-300 bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center w-full rounded-md  px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500" id="options-menu">
                                        {currCollege ? currCollege.shortName : ""}
                                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1408 704q0 26-19 45l-448 448q-19 19-45 19t-45-19l-448-448q-19-19-19-45t19-45 45-19h896q26 0 45 19t19 45z">
                                            </path>
                                        </svg>
                                    </button>
                                </div>

                                <div class={!collegeMenuOpen ? "hidden" : "origin-top-right absolute left-12 mt-12 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"} role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                                    {colleges.map(college => {
                                        if (currCollege && college.shortName != currCollege.shortName) {
                                            return <a onClick={() => history.push(`/u/${college.tag}`)} class={!collegeMenuOpen ? "hidden" : "block px-4 py-2 text-sm text-gray-700"} role="menuitem" tabindex="-1" id="user-menu-item-0">{college.shortName}</a>
                                        }
                                    })}
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="absolute float-right inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">


                        <div class="ml-3 relative">
                            <div>
                                <button onClick={() => setUserMenuOpen(!userMenuOpen)} type="button" class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                    <span class="sr-only">Open user menu</span>
                                    <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                </button>
                            </div>


                            <div class={!userMenuOpen ? "hidden" : "origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"} role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">

                                <a href="#" class={!userMenuOpen ? "hidden" : "block px-4 py-2 text-sm text-gray-700"} role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</a>
                                <a href="#" class={!userMenuOpen ? "hidden" : "block px-4 py-2 text-sm text-gray-700"} role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </nav>
    );
}