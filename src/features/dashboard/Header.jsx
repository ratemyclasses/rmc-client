import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getDepartments } from '../../app/actions/department.actions';
import { MultiSelectDropdown } from '../../common/filter/MultiSelectDropdown';

export function Header() {
  const college = useSelector((state) => state.college.college);
  const departments = useSelector((state) => state.department.departments);
  const dispatch = useDispatch();

  const location = useLocation();

  useEffect(() => {
    if (college) {
      dispatch(
        getDepartments({
          collegeId: college._id
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [college, dispatch]);

  console.log(departments);

  const filters = [
    {
      departmentName: 'Department',
      options: departments
    }
  ];

  if (!college || !departments) {
    return <div>Loading...</div>;
  }

  const departmentArr = [];
  departments.forEach((department) => {
    departmentArr.push({ name: department.longName, value: department.longName });
  });

  filters[0].options = departmentArr;

  const isModeratorMode = location.pathname.includes('moderate');

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
            />
          </div>

          {filters.map((filter) => (
            <MultiSelectDropdown options={filter.options} label={filter.departmentName} />
          ))}
        </>
      )}
    </div>
  );
}
