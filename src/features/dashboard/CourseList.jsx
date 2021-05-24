import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCourses } from '../../app/actions/course.actions';
import { CourseListItem } from '../course/CourseListItem';

export function CourseList() {
  const courses = useSelector((state) => state.course.courses);
  const college = useSelector((state) => state.college.college);
  const dispatch = useDispatch();

  useEffect(() => {
    if (college) {
      dispatch(
        getCourses({
          collegeId: college._id,
          params: {
            limit: 7,
            offset: 1,
            sortBy: ['abbreviation:1', 'number:1'],
            fields: ['name', 'abbreviation', 'number']
          }
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [college, dispatch]);

  if (!courses.length) {
    return <div>Loading courses...</div>;
  }

  return (
    <div className="mb-8 bg-white h-screen overflow-y-auto">
      {courses.map((course) => (
        <CourseListItem key={course._id} course={course} />
      ))}
    </div>
  );
}
