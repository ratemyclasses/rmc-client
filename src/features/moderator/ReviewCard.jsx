import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { approveReviewById, getReviewById, denyReviewById } from '../../app/actions/review.actions';
import { Review } from '../course/Review';

export function ReviewCard() {
  const college = useSelector((state) => state.college.college);
  const review = useSelector((state) => state.review.review);
  const { reviewId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (college) {
      dispatch(getReviewById(reviewId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [college, reviewId, dispatch]);

  if (!review) {
    return <div className="mt-3">Select a review</div>;
  }

  return (
    <div className="mx-auto p-5">
      <Review review={review} moderate />
      <div className="flex flex-row gap-5 pl-20">
        <button
          className="flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          type="button"
          onClick={() => dispatch(approveReviewById(review._id))}
        >
          Approve
        </button>
        <button
          className="flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          type="button"
          onClick={() => dispatch(denyReviewById(review._id))}
        >
          Deny
        </button>
        <div className="w-1/6" />
        <Link
          className="text-indigo-600 hover:text-indigo-500"
          to={`/u/${college.tag}/${review.courseId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Course Details
        </Link>
      </div>
    </div>
  );
}
