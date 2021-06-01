/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews } from '../../app/actions/review.actions';
import { Review } from '../course/Review';

export function ViewReviews() {
  const dispatch = useDispatch();
  const [initValues, setInitValues] = useState({});
  const [open, setOpen] = useState(false);
  const reviews = useSelector((state) => state.review.reviews);
  const user = useSelector((state) => state.user.user);
  if (user) {
    useEffect(() => {
      dispatch(
        getReviews({
          userId: user._id
        })
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);
    if (reviews.length > 0) {
      return (
        <div>
          {reviews.map((review) => (
            <Review
              key={review._id}
              review={review}
              setOpen={setOpen}
              setInitValues={setInitValues}
              profile={true}
            />
          ))}
        </div>
      );
    } else {
      return <div> Loading Reviews ... </div>;
    }
  } else {
    return <div> Login </div>;
  }
}
