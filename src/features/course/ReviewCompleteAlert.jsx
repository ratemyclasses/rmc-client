import { CheckIcon, XIcon } from '@heroicons/react/solid';
import React from 'react';
import { STATUS } from '../../app/constants';
import { Alert } from '../../common/Alert';

export function ReviewCompleteAlert({ setSuccess, success }) {
  const renderMessage = () => {
    if (success === STATUS.success) {
      return (
        <>
          <CheckIcon className="w-20 h-20 text-green-500 mx-auto" />
          <h2 className="text-2xl mb-4 text-gray-800 text-center font-bold">Review Completed!</h2>
          <div className="text-gray-600 mb-8 text-center">
            Thank you. Your review will be published when it is approved within 1 business day.
          </div>
        </>
      );
    }

    if (success === STATUS.failed) {
      return (
        <>
          <XIcon className="w-20 h-20 text-red-500 mx-auto" />
          <h2 className="text-2xl mb-4 text-gray-800 text-center font-bold">Internal Error.</h2>
          <div className="text-gray-600 mb-8 text-center">
            There was an issue with posting your review. Please try again later.
          </div>
        </>
      );
    }

    return '';
  };

  return (
    <Alert
      setOpen={(val) => (val ? setSuccess(success) : setSuccess(''))}
      open={success === STATUS.success || success === STATUS.failed}
    >
      <div className="bg-white rounded-lg p-10 flex items-center justify-between">
        <div>
          {renderMessage()}
          <button
            type="button"
            className="w-40 block mx-auto focus:outline-none py-2 px-5 rounded-lg shadow-sm text-center text-gray-600 bg-white hover:bg-gray-100 font-medium border"
            onClick={() => setSuccess('')}
          >
            Back to home
          </button>
        </div>
      </div>
    </Alert>
  );
}
