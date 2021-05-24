import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCourses } from '../../app/actions/course.actions';
import { CourseListItem } from '../course/CourseListItem';
import { Paginator } from '../../common/Paginator';

export function CourseList() {
  const courses = useSelector((state) => state.course.courses);
  const college = useSelector((state) => state.college.college);
  const dispatch = useDispatch();
  const [offset, setOffset] = useState(0);
  const total = 15456;
  const perPage = 7;
  const limit = Math.min(perPage, total - offset);

  useEffect(() => {
    if (college) {
      dispatch(
        getCourses({
          collegeId: college._id,
          params: {
            limit,
            offset,
            sortBy: ['abbreviation:1', 'number:1'],
            fields: ['name', 'abbreviation', 'number']
          }
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [college, offset, dispatch]);

  if (!courses.length) {
    return <div>Loading courses...</div>;
  }

  return (
    <div className="mb-8 bg-white h-screen overflow-y-auto">
      <div className="mt-3 ml-3">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{offset + 1}</span> to{' '}
          <span className="font-medium">{Math.min(offset + 7, total)}</span> of{' '}
          <span className="font-medium">{total}</span> results
        </p>
      </div>
      {courses.map((course) => (
        <CourseListItem key={course._id} course={course} />
      ))}
      <Paginator
        setOffset={setOffset}
        offset={offset}
        perPage={perPage}
        curPageNum={Math.round(offset / perPage) + 1}
        total={total}
      />
    </div>
  );
}
