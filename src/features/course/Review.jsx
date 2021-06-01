// import { ThumbDownIcon, ThumbUpIcon } from '@heroicons/react/solid';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/outline';
import ThumbDownOutline from '@heroicons/react/outline/ThumbDownIcon';
import ThumbUpOutline from '@heroicons/react/outline/ThumbUpIcon';
import { ThumbDownIcon, ThumbUpIcon } from '@heroicons/react/solid';
import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearVoteReviewById,
  deleteReviewById,
  downvoteReviewById,
  upvoteReviewById
} from '../../app/actions/review.actions';
import { APPROVAL_STATUS, STATISTICS } from '../../app/constants';
import { StatisticPill } from './StatisticPill';

export function Review({ review, moderate = false, setInitValues, setOpen, ref }) {
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

  return (
    <>
      <div className="w-80 sm:w-full mx-0 mt-8 border-b">
        {review.approved !== APPROVAL_STATUS.approved && (
          <span className="mb-16 ml-8 sm:ml-16 text-sm font-medium bg-red-100 py-1 px-2 rounded text-red-500 align-middle">
            UNDER REVIEW
          </span>
        )}
        <div className="flex items-center">
          <div className=" w-8 h-8 sm:w-12 sm:h-12 rounded-full mr-2 sm:mr-4 bg-gray-100"> </div>
          <div>
            <div className="flex flex-wrap items-start">
              <div className="flex-none flex items-center">
                <p className="mr-4 text-sm sm:text-md font-bold flex items-center gap-1">
                  {review.userId._id
                    ? review.userId.displayName || 'Anonymous User'
                    : user.displayName}
                  {'  '}
                  <span className="hidden sm:block text-gray-500 font-normal">
                    {'  '}
                    {review.rating < 3 ? 'does not ' : ''}recommend{review.rating < 3 ? '' : 's'}{' '}
                    this course
                  </span>
                </p>
                <StatisticPill field={{ type: STATISTICS.rating }} value={review.rating} />
              </div>
              <div className="flex-none">
                {user && user._id === (review.userId._id || review.userId) && (
                  <button
                    className="text-red-500 p-2 ml-2 bg-gray-50 hover:bg-gray-100 rounded-full"
                    onClick={() => dispatch(deleteReviewById(review._id))}
                    type="button"
                  >
                    <TrashIcon className="h-5 h-5" />
                  </button>
                )}
                {user &&
                  user._id === (review.userId._id || review.userId) &&
                  review.approved !== APPROVAL_STATUS.approved && (
                    <button
                      onClick={() => {
                        setInitValues(review);
                        setOpen(true);
                      }}
                      className="text-black-500 p-2 ml-2 bg-gray-50 hover:bg-gray-100 rounded-full"
                      type="button"
                    >
                      <PencilAltIcon className="h-5 h-5" />
                    </button>
                  )}
              </div>
            </div>

            <div className="flex items-center">
              <span className="text-xs text-gray-500">
                {' '}
                Posted {moment(moment.utc(review.updatedAt).format()).fromNow()}
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
                <span
                  key={resource}
                  className="px-2 mr-2 py-1 flex items-center text-sm rounded-lg font-semibold text-blue-500 bg-blue-50"
                >
                  {resource}
                </span>
              ))}
            </div>
            {!moderate && review.approved === APPROVAL_STATUS.approved && (
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
                    {review.upvoteCount}
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
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
