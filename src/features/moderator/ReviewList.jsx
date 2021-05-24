import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews } from '../../app/actions/review.actions';
import { Paginator } from '../../common/Paginator';
import { ReviewListItem } from './ReviewListItem';

export function ReviewList() {
  const reviews = useSelector((state) => state.review.reviews);
  const total = useSelector((state) => state.review.totalCount);
  const college = useSelector((state) => state.college.college);
  const dispatch = useDispatch();
  const [offset, setOffset] = useState(0);
  const perPage = 7;
  const limit = total ? Math.min(perPage, total - offset) : perPage;

  useEffect(() => {
    if (college) {
      dispatch(
        getReviews({
          approved: false,
          limit,
          offset,
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
      <div className="mt-3 ml-3">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{offset + 1}</span> to{' '}
          <span className="font-medium">{Math.min(offset + 7, total)}</span> of{' '}
          <span className="font-medium">{total}</span> results
        </p>
      </div>
      {reviews.map((review) => (
        <ReviewListItem key={review._id} review={review} />
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
