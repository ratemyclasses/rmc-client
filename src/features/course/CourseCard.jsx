import { BookmarkIcon as BookmarkOutlineIcon } from '@heroicons/react/outline';
import { BookmarkIcon, DotsVerticalIcon, StarIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCourseById, toggleBookmarkCourseById } from '../../app/actions/course.actions';
import { getReviews } from '../../app/actions/review.actions';
import { APPROVAL_STATUS } from '../../app/constants';
import { Modal } from '../../common/Modal';
import { Sidenote } from '../../common/Sidenote';
import { LoginForm } from '../auth/LoginForm';
import { SignupForm } from '../auth/SignupForm';
import { hasRoles, rounded } from '../utils';
import './CourseCard.css';
import { CourseResources } from './CourseResources';
import { CourseStatistic } from './CourseStatistic';
import { CreateReviewForm } from './CreateReviewForm';
import { Review } from './Review';
import { ReviewCompleteAlert } from './ReviewCompleteAlert';
import { SummaryColumn } from './SummaryColumn';

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
    dispatch(getReviews({ courseId, populate: ['userId'], select: ['userId.displayName'] }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [college, courseId, dispatch]);

  let curUserReview = null;

  if (user) {
    curUserReview = reviews.find((review) => {
      if (review.userId._id) {
        return review.userId._id === user._id;
      }
      return review.userId === user._id;
    });
  }

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
          <CreateReviewForm
            setOpen={setOpen}
            setSuccess={setSuccess}
            initValues={{ ...initValues }}
            professors={course.professors || []}
          />
        ) : (
          <>{AuthForm}</>
        )}
      </Modal>
    );
  };

  const renderReviewBtn = (className) => {
    let btn = (
      <button
        type="submit"
        className={className}
        onClick={() => {
          setInitValues({});
          setOpen(true);
        }}
      >
        Leave Review
      </button>
    );

    if (curUserReview) {
      if (curUserReview.approved !== APPROVAL_STATUS.approved) {
        btn = (
          <button
            type="submit"
            className={className}
            onClick={() => {
              setInitValues(curUserReview);
              setOpen(true);
            }}
          >
            Edit My Review
          </button>
        );
      } else {
        btn = (
          <button type="submit" className={className}>
            See My Review
          </button>
        );
      }
    }

    if (user) {
      if (hasRoles(user.roles, ['MEMBER'])) {
        return btn;
      }

      return '';
    }

    return btn;
  };

  const determinePillColor = (value) => {
    if (value < 3) {
      return 'red';
    }

    if (value < 4) {
      return 'yellow';
    }

    return 'green';
  };

  return (
    <>
      <ReviewCompleteAlert setSuccess={setSuccess} success={success} />
      {renderModal()}
      <div className="course-card w-full mt-16 mx-8 sm:mx-auto">
        <div className="flex flex-wrap items-start gap-16">
          <div className="flex-none w-80">
            <div className="flex items-center mb-2">
              <h2 className="text-3xl mr-4 font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                {course.abbreviation} {course.number}
              </h2>
              {course.reviewCount > 0 && (
                <span
                  className={`px-3 py-1 flex items-center text-2xl rounded-lg font-bold text-${determinePillColor(
                    rounded(course.avgRating)
                  )}-500 bg-${determinePillColor(rounded(course.avgRating))}-50`}
                >
                  <StarIcon className="h-6 w-6 mr-1" /> {rounded(course.avgRating)}
                </span>
              )}
            </div>

            <h2 className="text-xl mb-2 font-regular leading-7 sm:leading-5 text-gray-500 sm:text-lg">
              {course.name}
            </h2>
            <div className="flex items-center mb-6">
              <p className="mr-4 text-gray-500">
                {course.reviewCount
                  ? `${course.reviewCount} Review${course.reviewCount !== 1 ? 's' : ''}`
                  : 'No Reviews'}
              </p>
              <p className="text-gray-500">Average Grade: {course.avgLetterGrade || 'N/A'}</p>
            </div>
            <div className="flex items-center mb-8">
              {course.website && (
                <button
                  className="py-3 px-6 bg-indigo-600 hover:bg-indigo-700 rounded-full text-white text-md font-bold"
                  type="button"
                >
                  Visit Website
                </button>
              )}
              <button className="rounded-full ml-3 relative p-3 bg-gray-100" type="button">
                <DotsVerticalIcon className="h-5 w-5 text-gray-600" />
              </button>
              {user && (
                <button
                  onClick={() =>
                    dispatch(toggleBookmarkCourseById({ collegeId: college._id, id: course._id }))
                  }
                  className="rounded-full ml-3 relative p-3 bg-gray-100"
                  type="button"
                >
                  {user.bookmarkedCourses.includes(course._id) ? (
                    <BookmarkIcon className="h-5 w-5 text-indigo-600" />
                  ) : (
                    <BookmarkOutlineIcon className="h-5 w-5 text-gray-600" />
                  )}
                </button>
              )}
            </div>
            <Sidenote
              label={
                course.reviewCount ? (
                  `${
                    course.wtaPercent < 1
                      ? `${
                          course.wtaPercent * 100 === 0 ? 'No' : `${course.wtaPercent * 100}%  of`
                        }`
                      : 'All'
                  } reviewers said they would take this class again`
                ) : (
                  <>
                    Would you take this class again?{' '}
                    {renderReviewBtn(
                      'font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none'
                    )}
                    {/* <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
                      onClick={() => {
                        setInitValues({});
                        setOpen(true);
                      }}
                    >
                      Leave a review now
                    </button> */}
                  </>
                )
              }
            />
          </div>
          <div className="flex-grow hidden sm:block"> </div>
          <div className="flex flex-none flex-wrap items-center gap-12 sm:gap-16 w-80">
            <CourseStatistic field="difficulty" value={course.avgDifficulty} subtext="/5" />
            <CourseStatistic field="workload" value={course.avgHoursPerWeek} subtext="hours/week" />
            <CourseResources resources={course.resources} />
          </div>
        </div>
        <div className="flex flex-wrap items-start gap-8 sm:gap-16 mt-8 mb-8">
          <div className="flex-none w-80">
            <SummaryColumn col="Structure" />
          </div>
          <div className="flex-grow"> </div>
          <div className="flex flex-none flex-wrap items-center gap-16 w-80">
            <SummaryColumn col="Assignments/Exams" />
          </div>
        </div>
        <div>
          <div className="flex items-center">
            <p className="font-bold text-xl mr-6">Student Reviews</p>
            {renderReviewBtn(
              'rounded-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            )}
          </div>

          {reviews.length ? (
            reviews.map((review) => (
              <Review
                key={review._id}
                review={review}
                setOpen={setOpen}
                setInitValues={setInitValues}
              />
            ))
          ) : (
            <div className="text-gray-500 mt-3">
              Oh no! This course doesn’t have any reviews yet. Be the first to{' '}
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
                onClick={() => {
                  setInitValues({});
                  setOpen(true);
                }}
              >
                leave a review now
              </button>
              .
            </div>
          )}
        </div>
      </div>
    </>
  );
}
