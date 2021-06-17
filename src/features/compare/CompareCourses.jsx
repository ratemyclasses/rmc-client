import { PlusCircleIcon } from '@heroicons/react/outline';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCompareCourseByCollege, getCourses } from '../../app/actions/course.actions';
import { Navbar } from '../../common/Navbar';
import { CompareCard } from './CompareCard';
import { CompareHeader } from './CompareHeader';
import { CourseLabels } from './CourseLabels';

export function CompareCourses() {
  const compareCourses = useSelector((state) => state.course.compareCourses);
  const courses = useSelector((state) => state.course.courses);
  const college = useSelector((state) => state.college.college);
  const dispatch = useDispatch();

  useEffect(() => {
    if (college) {
      dispatch(
        getCourses({
          collegeId: college._id,
          params: {
            limit: 50,
            sortBy: ['abbreviation:1', 'number:1']
          }
        })
      ).then(() => {
        dispatch(getCompareCourseByCollege(college._id));
      });
    }
  }, [college, dispatch]);

  if (!courses) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="h-screen">
        <div className="py-4 flex gap-8 bg-white border-t border-b pl-4">
          <CompareHeader />
        </div>
        <div className="flex">
          <div className="flex-none w-72 bg-white border-r h-screen overflow-y-auto">
            <CourseLabels />
          </div>
          <div className="flex">
            {compareCourses.map((course) => (
              <CompareCard key={course._id} course={course} />
            ))}
          </div>
          <div className="w-80">
            <div className="rounded-xl border-2 border-dashed border-gray-300 h-screen mx-4 my-4">
              <div className="mx-auto p-4 text-gray-400 inline-flex items-center justify-center">
                Add Course <PlusCircleIcon className="ml-2 h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
