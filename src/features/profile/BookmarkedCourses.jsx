/*eslint-disable */
import { ChartBarIcon, StarIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getColleges } from '../../app/actions/college.actions';
import { getCourses } from '../../app/actions/course.actions';
import { CustomDropdown } from '../../common/CustomDropdown';
import { determinePillColor, rounded } from '../utils';

export function BookmarkedCourses() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [tag, setTag] = useState(null);
  const courses = useSelector((state) => state.course.courses);
  const colleges = useSelector((state) => state.college.colleges);

  useEffect(() => {
    dispatch(
      getColleges({
        fields: ['shortName', 'tag']
      })
    ).then(() => {
      dispatch(
        getCourses({
          collegeId: colleges[0]._id,
          params: { ids: user.bookmarkedCourses, fields: ['shortName', 'name', 'aggregate'] }
        })
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const onChange = ({ value, name }) => {
    setTag(value.tag);
    dispatch(
      getCourses({
        collegeId: value.id,
        params: { ids: user.bookmarkedCourses, fields: ['shortName', 'name', 'aggregate'] }
      })
    );
  };

  const options = colleges.map((college) => ({
    name: college.shortName,
    value: { id: college._id, tag: college.tag }
  }));

  return (
    <div className="container items-center">
      <CustomDropdown options={options} handleChange={onChange} />
      {courses.length ? (
        <div className="mt-5">
          {courses.map((course) => {
            return (
              <Link
                title={`${course.shortName}: ${course.name}`}
                to={`/courses/u/${tag}/${course._id}`}
                key={course._id}
              >
                <div className="overflow-ellipsis overflow-hidden py-4 px-4 flex bg-gray-100 gap-5 w-96 items-center rounded-xl mt-3 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-md">
                  {course.aggregate.reviewCount > 0 && (
                    <span
                      className={`px-3 py-1 flex items-center text-2xl rounded-lg font-bold text-${determinePillColor(
                        rounded(course.aggregate.avgRating)
                      )}-500 bg-${determinePillColor(rounded(course.aggregate.avgRating))}-50`}
                    >
                      <StarIcon className="h-6 w-6 mr-1" /> {rounded(course.aggregate.avgRating)}
                    </span>
                  )}
                  <div className="py-2 text-left">
                    <p className="float-left text-lg font-bold text-gray-900">{course.shortName}</p>
                    <p className="float-left text-md font-regular leading-5 text-gray-500 w-full truncate">
                      {course.name}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="container mt-5">
          You have not bookmarked any courses for this college yet.
        </div>
      )}
    </div>
  );
}
