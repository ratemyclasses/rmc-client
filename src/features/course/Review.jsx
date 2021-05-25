import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearVoteReviewById,
  downvoteReviewById,
  upvoteReviewById
} from '../../app/actions/review.actions';
import { Modal } from '../../common/Modal';
import { CreateReviewForm } from './CreateReviewForm';

export function Review({ review, moderate = false }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);

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
      <Modal open={open} setOpen={setOpen} width="4xl">
        <CreateReviewForm setOpen={setOpen} setSuccess={setSuccess} initValues={review} />
      </Modal>
      <div className="py-8 flex flex-wrap md:flex-nowrap">
        <div className="md:w-1/8 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
          <div className="inline-block relative">
            <div className="rounded-xl float-left p-3 px-4 mb-2 mr-6 bg-indigo-500 dark:bg-gray-800 text-right">
              <div className="text-right items-right">
                {/* <svg viewBox="206.372 159.55 70.073 67.114" width="15" height="15">
          <path
            d="M 236.923 162.805 C 238.337 158.465 244.478 158.465 245.887 162.805 L 250.93 178.32 C 251.562 180.258 253.369 181.571 255.408 181.572 L 271.724 181.572 C 276.291 181.572 278.185 187.416 274.495 190.102 L 261.299 199.689 C 259.646 200.888 258.953 203.015 259.583 204.958 L 264.626 220.473 C 266.04 224.813 261.068 228.428 257.368 225.742 L 244.172 216.156 C 242.521 214.957 240.286 214.957 238.634 216.156 L 225.438 225.742 C 221.743 228.428 216.776 224.813 218.185 220.473 L 223.228 204.958 C 223.858 203.015 223.165 200.888 221.512 199.689 L 208.321 190.107 C 204.631 187.421 206.53 181.577 211.092 181.577 L 227.403 181.577 C 229.444 181.577 231.253 180.265 231.885 178.325 L 236.928 162.81 Z"
            style={{ fill: 'rgb(255, 255, 255)' }}
          />
        </svg> */}
                {/* <p className="text-sm text-right text-white dark:text-gray-50">Overall</p> */}
              </div>
              <div className="flex flex-row justify-start">
                <div className="py-2 mr-2 float-left">
                  <svg viewBox="206.372 159.55 70.073 67.114" width="10" height="10">
                    <path
                      d="M 236.923 162.805 C 238.337 158.465 244.478 158.465 245.887 162.805 L 250.93 178.32 C 251.562 180.258 253.369 181.571 255.408 181.572 L 271.724 181.572 C 276.291 181.572 278.185 187.416 274.495 190.102 L 261.299 199.689 C 259.646 200.888 258.953 203.015 259.583 204.958 L 264.626 220.473 C 266.04 224.813 261.068 228.428 257.368 225.742 L 244.172 216.156 C 242.521 214.957 240.286 214.957 238.634 216.156 L 225.438 225.742 C 221.743 228.428 216.776 224.813 218.185 220.473 L 223.228 204.958 C 223.858 203.015 223.165 200.888 221.512 199.689 L 208.321 190.107 C 204.631 187.421 206.53 181.577 211.092 181.577 L 227.403 181.577 C 229.444 181.577 231.253 180.265 231.885 178.325 L 236.928 162.81 Z"
                      style={{ fill: 'rgb(255, 255, 255)' }}
                    />
                  </svg>
                </div>

                <p className="text-white text-lg text-right dark:text-white font-bold">
                  {review.rating}
                </p>

                {/* <div className="relative w-28 h-2 bg-indigo-300 rounded">
          <div className="absolute top-0 h-2  left-0 rounded bg-white w-2/3" />
        </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-10">
          {/* <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">
          Bitters hashtag waistcoat fashion axe chia unicorn
        </h2> */}
          <div className="leading-relaxed w-1/2">
            {review.approved !== 'APPROVED' ? (
              <span className="text-sm font-medium bg-red-100 py-1 px-2 rounded text-red-500 align-middle">
                DRAFT
              </span>
            ) : (
              ''
            )}

            {review.content}
          </div>
          {!moderate && (
            <>
              <div className="flex justify-center h-12 rounded-lg text-lg mb-4" role="group">
                <button
                  type="button"
                  disabled={!user}
                  className={`${
                    upvoted ? 'bg-indigo-500 text-white' : 'text-gray-600'
                  } flex hover:border-indigo-500 rounded-l-lg px-4 py-2 mx-0 border outline-none focus:outline-none focus:shadow-outline`}
                  onClick={() =>
                    dispatch(
                      upvoted ? clearVoteReviewById(review._id) : upvoteReviewById(review._id)
                    )
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                    />
                  </svg>
                  {review.upvoteCount}
                </button>
                <button
                  type="button"
                  disabled={!user}
                  className={`${downvoted ? 'bg-indigo-500 text-white' : 'text-gray-600'}
            flex hover:border-indigo-500 border rounded-r-lg px-4 py-2 mx-0 outline-none focus:outline-none focus:shadow-outline`}
                  onClick={() =>
                    dispatch(
                      downvoted ? clearVoteReviewById(review._id) : downvoteReviewById(review._id)
                    )
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
                    />
                  </svg>
                  {review.downvoteCount}
                </button>
              </div>
              {user && user._id === review.userId && (
                <button onClick={() => setOpen(true)} type="button">
                  Edit
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

// return (
//   <div>
//     <div className="bg-white dark:bg-gray-800 w-full mb-6 sm:inline-block">
//       <div className="flex items-start text-left">
//         <div className="flex-shrink-0">
//           <div className="inline-block relative">
//             <div className="rounded-xl float-right p-3 px-4 mb-2 bg-indigo-500 dark:bg-gray-800 text-right">
//               <div className="text-right items-right">
//                 {/* <svg viewBox="206.372 159.55 70.073 67.114" width="15" height="15">
//         <path
//           d="M 236.923 162.805 C 238.337 158.465 244.478 158.465 245.887 162.805 L 250.93 178.32 C 251.562 180.258 253.369 181.571 255.408 181.572 L 271.724 181.572 C 276.291 181.572 278.185 187.416 274.495 190.102 L 261.299 199.689 C 259.646 200.888 258.953 203.015 259.583 204.958 L 264.626 220.473 C 266.04 224.813 261.068 228.428 257.368 225.742 L 244.172 216.156 C 242.521 214.957 240.286 214.957 238.634 216.156 L 225.438 225.742 C 221.743 228.428 216.776 224.813 218.185 220.473 L 223.228 204.958 C 223.858 203.015 223.165 200.888 221.512 199.689 L 208.321 190.107 C 204.631 187.421 206.53 181.577 211.092 181.577 L 227.403 181.577 C 229.444 181.577 231.253 180.265 231.885 178.325 L 236.928 162.81 Z"
//           style={{ fill: 'rgb(255, 255, 255)' }}
//         />
//       </svg> */}
//                 {/* <p className="text-sm text-right text-white dark:text-gray-50">Overall</p> */}
//               </div>
//               <div className="flex flex-row justify-start">
//                 <div className="py-2 mr-2 float-left">
//                   <svg viewBox="206.372 159.55 70.073 67.114" width="10" height="10">
//                     <path
//                       d="M 236.923 162.805 C 238.337 158.465 244.478 158.465 245.887 162.805 L 250.93 178.32 C 251.562 180.258 253.369 181.571 255.408 181.572 L 271.724 181.572 C 276.291 181.572 278.185 187.416 274.495 190.102 L 261.299 199.689 C 259.646 200.888 258.953 203.015 259.583 204.958 L 264.626 220.473 C 266.04 224.813 261.068 228.428 257.368 225.742 L 244.172 216.156 C 242.521 214.957 240.286 214.957 238.634 216.156 L 225.438 225.742 C 221.743 228.428 216.776 224.813 218.185 220.473 L 223.228 204.958 C 223.858 203.015 223.165 200.888 221.512 199.689 L 208.321 190.107 C 204.631 187.421 206.53 181.577 211.092 181.577 L 227.403 181.577 C 229.444 181.577 231.253 180.265 231.885 178.325 L 236.928 162.81 Z"
//                       style={{ fill: 'rgb(255, 255, 255)' }}
//                     />
//                   </svg>
//                 </div>

//                 <p className="text-white text-lg text-right dark:text-white font-bold">4.3</p>

//                 {/* <div className="relative w-28 h-2 bg-indigo-300 rounded">
//         <div className="absolute top-0 h-2  left-0 rounded bg-white w-2/3" />
//       </div> */}
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="ml-6">
//           <p className="flex items-baseline">
//             <span className="text-gray-900 dark:text-gray-200 font-bold">A Msan</span>
//             <span className="text-gray-500 dark:text-gray-300  ml-2 text-sm">2 months ago</span>
//           </p>

//           <div className="mt-3">
//             <p className="mt-1 text-gray-700 max-w-xs dark:text-white">
//               My first job of scanning photos at the Memories 2 Digital Photo Scanning was
//               fantastic. She completed the work quickly while I was waiting. Thanks for a great
//               service..
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );
