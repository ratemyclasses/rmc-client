// import { ThumbDownIcon, ThumbUpIcon } from '@heroicons/react/solid';
import { ThumbUpIcon, ThumbDownIcon } from '@heroicons/react/solid';
import { TrashIcon } from '@heroicons/react/outline';
import ThumbUpOutline from '@heroicons/react/outline/ThumbUpIcon';
import ThumbDownOutline from '@heroicons/react/outline/ThumbDownIcon';
import moment from 'moment';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearVoteReviewById,
  deleteReviewById,
  downvoteReviewById,
  upvoteReviewById
} from '../../app/actions/review.actions';
import { STATISTICS } from '../../app/constants';
import { StatisticPill } from './StatisticPill';

export function Review({ review, moderate = false, setInitValues, setOpen }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  let upvoted = false;
  let downvoted = false;

  if (user) {
    if (review.upvoters.includes(user._id)) {
      upvoted = true;
    } else if (review.downvoters.includes(user._id)) {
      downvoted = true;
    }
  }

  console.log(review);

  return (
    <>
      <div className="w-80 sm:w-full mx-0 mt-8 border-b">
        {/* <div className="block sm:hidden w-10 ml-8">
          <StatisticPill field={{ type: STATISTICS.rating }} value={review.rating} />
        </div> */}
        {review.approved !== 'APPROVED' ? (
          <span className="mb-16 ml-8 sm:ml-16 text-sm font-medium bg-red-100 py-1 px-2 rounded text-red-500 align-middle">
            DRAFT
          </span>
        ) : (
          ''
        )}
        <div className="flex items-center">
          <div className=" w-8 h-8 sm:w-12 sm:h-12 rounded-full mr-2 sm:mr-4 bg-gray-100"> </div>
          <div>
            <div className="flex flex-wrap items-start">
              <div className="flex-none flex items-center">
                <p className="mr-4 text-sm sm:text-md font-bold flex items-center gap-1">
                  Anonymous User{'  '}
                  <span className="hidden sm:block text-gray-500 font-normal">
                    {'  '}recommends this course
                  </span>
                </p>
                <StatisticPill field={{ type: STATISTICS.rating }} value={review.rating} />
              </div>
              <div className="flex-none">
                {user && user._id === review.userId && (
                  <button
                    className="text-red-500 p-2 ml-2 bg-gray-50 hover:bg-gray-100 rounded-full"
                    onClick={() => dispatch(deleteReviewById(review._id))}
                    type="button"
                  >
                    <TrashIcon className="h-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <span className="text-xs text-gray-500">
                {' '}
                Posted {moment(moment.utc(review.CreatedAt).format()).fromNow()}
              </span>
              <div className="w-1 h-1 rounded-full  bg-gray-500 mx-2"> </div>
              <span className="text-xs text-gray-500"> Last taken in {review.timeTaken}</span>
            </div>
          </div>
        </div>
        <div className="sm:ml-16 my-4">
          <p className="text-sm sm:text-md">{review.content}</p>
          <div className="mt-6 flex items-center h-8">
            <div className="flex items-center w-10/12  mr-4 overflow-x-auto">
              {review.resources.map((resource) => (
                <span className="px-2 mr-2 py-1 flex items-center text-sm rounded-lg font-semibold text-blue-500 bg-blue-50">
                  {resource}
                </span>
              ))}
            </div>
            {!moderate && (
              <>
                <div className="flex justify-center h-12 rounded-lg text-sm mb-4" role="group">
                  <button
                    type="button"
                    disabled={!user}
                    className={`${
                      upvoted ? 'text-indigo-500' : 'text-gray-600'
                    } flex items-center hover:text-indigo-500 px-3 py-1 mx-0 border-r outline-none focus:outline-none`}
                    onClick={() =>
                      dispatch(
                        upvoted ? clearVoteReviewById(review._id) : upvoteReviewById(review._id)
                      )
                    }
                  >
                    {upvoted ? (
                      <ThumbUpIcon className="h-4 w-4 mr-1 " />
                    ) : (
                      <ThumbUpOutline className="h-4 w-4 mr-1" />
                    )}{' '}
                    {review.upvoteCount}123
                  </button>
                  <button
                    type="button"
                    disabled={!user}
                    className={`${downvoted ? 'text-indigo-500' : 'text-gray-600'}
            flex items-center hover:text-indigo-500 px-3 py-1 mx-0 outline-none focus:outline-none`}
                    onClick={() =>
                      dispatch(
                        downvoted ? clearVoteReviewById(review._id) : downvoteReviewById(review._id)
                      )
                    }
                  >
                    {downvoted ? (
                      <ThumbDownIcon className="h-4 w-4 mr-1 " />
                    ) : (
                      <ThumbDownOutline className="h-4 w-4 mr-1 " />
                    )}{' '}
                    {review.downvoteCount}
                  </button>
                </div>
                {user && user._id === review.userId && review.approved !== 'APPROVED' && (
                  <button
                    onClick={() => {
                      setInitValues(review);
                      setOpen(true);
                    }}
                    type="button"
                  >
                    Edit
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
