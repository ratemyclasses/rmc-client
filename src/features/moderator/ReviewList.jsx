import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews } from '../../app/actions/review.actions';
import { ReviewListItem } from './ReviewListItem';

export function ReviewList() {
  const reviews = useSelector((state) => state.review.reviews);
  const college = useSelector((state) => state.college.college);
  const dispatch = useDispatch();

  useEffect(() => {
    if (college) {
      dispatch(
        getReviews({
          approved: false,
          limit: 10,
          sortBy: ['createdAt:1', 'updatedAt:1'],
          populate: ['courseId']
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [college, dispatch]);

  if (!reviews.length) {
    return <div>Loading reviews...</div>;
  }

  return (
    <div className="mb-8 bg-white h-screen overflow-y-auto">
      {reviews.map((review) => (
        <ReviewListItem key={review._id} review={review} />
      ))}
    </div>
  );
}
