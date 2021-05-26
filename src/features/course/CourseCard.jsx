import { DotsVerticalIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCourseById } from '../../app/actions/course.actions';
import { getReviews } from '../../app/actions/review.actions';
import { Modal } from '../../common/Modal';
import { Sidenote } from '../../common/Sidenote';
import { LoginForm } from '../auth/LoginForm';
import { SignupForm } from '../auth/SignupForm';
import { hasRoles } from '../utils';
import { CourseResources } from './CourseResources';
import { CourseStatistic } from './CourseStatistic';
import { AverageGradeCard } from './AverageGradeCard';
import { CourseInfo } from './CourseInfo';
import { CreateReviewForm } from './CreateReviewForm';
import { SummaryColumn } from './SummaryColumn';
import { IndividualRatings } from './IndividualRatings';
import { OverallRating } from './OverallRating';
import { Review } from './Review';
import { ReviewCompleteAlert } from './ReviewCompleteAlert';

export function CourseCard() {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const course = useSelector((state) => state.course.course);
  const college = useSelector((state) => state.college.college);
  const user = useSelector((state) => state.user.user);
  const reviews = useSelector((state) => state.review.reviews);
  const authenticated = useSelector((state) => state.auth.authenticated);
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [signup, setSignup] = useState(false);
  const [initValues, setInitValues] = useState({});

  useEffect(() => {
    if (college) {
      dispatch(getCourseById({ collegeId: college._id, id: courseId }));
    }
    dispatch(getReviews({ courseId }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [college, courseId, dispatch]);

  if (!course) {
    return <div className="mt-3">Select a course</div>;
  }

  const renderModal = () => {
    const AuthForm = signup ? (
      <SignupForm setSignup={setSignup} />
    ) : (
      <LoginForm setSignup={setSignup} />
    );

    return (
      <Modal open={open} setOpen={setOpen} width={authenticated ? '4xl' : 'md'}>
        {authenticated ? (
          <CreateReviewForm setOpen={setOpen} setSuccess={setSuccess} initValues={initValues} />
        ) : (
          <>{AuthForm}</>
        )}
      </Modal>
    );
  };

  const renderReviewBtn = () => {
    const btn = (
      <button
        type="submit"
        className="group relative w-1/3 mb-6 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => setOpen(true)}
      >
        Leave Review
      </button>
    );

    if (user) {
      if (hasRoles(user.roles, ['MEMBER'])) {
        return btn;
      }

      return '';
    }

    return btn;
  };

  return (
    <>
      <ReviewCompleteAlert setSuccess={setSuccess} success={success} />
      {renderModal()}
      <div className="w-full mt-16 mx-auto md:w-9/12 md:mx-auto">
        <div className="flex flex-wrap items-start gap-16">
          <div className="flex-none w-80">
            <h2 className="text-3xl mb-2 font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              {course.abbreviation}, {course.number}
            </h2>
            <h2 className="text-2xl mb-2 font-regular leading-5 text-gray-500 sm:text-lg">
              {course.name}
            </h2>
            <div className="flex items-center mb-6">
              <p className="mr-4 text-gray-500">{reviews.length} Reviews</p>
              <p className="text-gray-500">Average Grade: {course.avgLetterGrade}</p>
            </div>
            <div className="flex items-center">
              <button
                className="py-3 px-6 bg-indigo-700 rounded-full text-white text-md font-bold"
                type="button"
              >
                Visit Website
              </button>
              <button className="rounded-full ml-3 relative p-3 bg-gray-100" type="button">
                <DotsVerticalIcon className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            <Sidenote label={`${course.wtaPercent * 100}% reviewers would take this class again`} />
          </div>
          <div className="flex-grow"> </div>
          <div className="flex flex-none flex-wrap items-center gap-16 w-80">
            <CourseStatistic field="difficulty" value={course.avgDifficulty} subtext="/5" />
            <CourseStatistic field="workload" value={course.avgHoursPerWeek} subtext="hours/week" />
            <CourseResources
              resources={[
                'Course Wesbite ',
                'TAs',
                'Lecture Videos',
                'Textbook',
                'Active Online Forum'
              ]}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-start gap-16 mt-8">
          <div className="flex-none w-80">
            <SummaryColumn col="structure" />
          </div>
          <div className="flex-grow"> </div>
          <div className="flex flex-none flex-wrap items-center gap-16 w-80">
            <SummaryColumn col="assignments" />
          </div>
        </div>
      </div>
      <div className="sm:mx-6 md:mx-20 sm:mt-10 md:mt-6">
        <div className="flex flex-wrap items-center">
          <div className="">
            <div className="">
              <div className="w-full sm:w-80">
                <h2 className="text-3xl mb-2 font-bold leading-7 text-gray-900 sm:text-2xl sm:truncate">
                  {course.abbreviation}, {course.number}
                </h2>
                <h2 className="text-2xl mb-4 font-regular leading-5 text-gray-500 sm:text-lg mb-2 ">
                  {course.name}
                </h2>
              </div>
              <div className="mt-1 w-full flex flex-wrap items-center sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                <div className="mt-2 mr-4 flex items-center text-lg sm:text-sm text-gray-500">
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
                <div className="mt-2 mb-2 flex items-center text-lg sm:text-sm text-gray-500">
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
          <div className="min-w-32 w-5/12 sm:w-32 mr-4">
            <OverallRating avgRating={course.avgRating} />
            <AverageGradeCard avgLetterGrade={course.avgLetterGrade} />
          </div>
          <div className="min-w-32 w-5/12 sm:w-32">
            <IndividualRatings
              avgDifficulty={course.avgDifficulty}
              avgHoursPerWeek={course.avgHoursPerWeek}
              wtaPercent={course.wtaPercent}
            />
          </div>
        </div>
        <div className="col-span-3 py-6">
          <CourseInfo course={course} />
          <h1 className="text-xl font-bold">REVIEWS</h1>
          {reviews && reviews.length ? (
            reviews.map((review) => (
              <Review
                key={review._id}
                review={review}
                setOpen={setOpen}
                setInitValues={setInitValues}
              />
            ))
          ) : (
            <div>No reviews yet</div>
          )}
        </div>
        {renderReviewBtn()}
      </div>
    </>
  );
}
