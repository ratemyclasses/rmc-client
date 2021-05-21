import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews } from '../../app/actions/review.actions';
import { Review } from '../../common/Review';
import { AverageGradeCard } from './AverageGradeCard';
import { CourseInfo } from './CourseInfo';
import { IndividualRatings } from './IndividualRatings';
import { OverallRating } from './OverallRating';

export function Course() {
  const dispatch = useDispatch();
  const course = useSelector((state) => state.course.course);
  const reviewStatus = useSelector((state) => state.review.status);
  const reviews = useSelector((state) => state.review.reviews);

  useEffect(() => {
    if (course) {
      dispatch(getReviews({ courseId: course._id }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course, dispatch]);

  if (!course) {
    return <div className="mt-3">Select a course</div>;
  }
  console.log(course._id);
  console.log(reviews);

  return (
    <div className="mx-auto mt-16 flex items-center">
      <div className="mx-auto">
        <div className="col-span-3">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-2">
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold leading-7 text-gray-900 sm:text-2xl sm:truncate">
                  {course.abbreviation}, {course.number}
                </h2>
                <h2 className="text-xl font-regular leading-5 text-gray-500 sm:text-lg mb-2 ">
                  {course.name}
                </h2>
                <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <svg
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                      <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                    </svg>
                    Average Grade: {course.avgLetterGrade || 'N/A'}
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <svg
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Average GPA: {course.avgGpa?.toFixed(2) || 'N/A'}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <OverallRating />
              <AverageGradeCard />
            </div>
            <div>
              <IndividualRatings />
            </div>
            {/* <div className="col-span-2"></div> */}
          </div>
        </div>
        <div className="col-span-3">
          <CourseInfo />
        </div>
        <div className="col-span-3">Reviews</div>
        {reviews ? (
          reviews.map((review) => (
            <div className="col-span-3">
              <Review review={review} />
            </div>
          ))
        ) : (
          <div className="col-span-3">Loading...</div>
        )}

        {/* <div>
        <div className="mt-10">{course.description}</div>
      </div> */}
      </div>
    </div>
  );
}
