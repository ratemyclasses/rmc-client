import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { CustomSelect } from './CustomSelect';
import { CustomSlider } from './CustomSlider';

function Step5() {
  const a = 5;

  return (
    <div className="bg-white rounded-lg p-10 flex items-center shadow justify-between">
      <div>
        <svg
          className="mb-4 h-20 w-20 text-green-500 mx-auto"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>

        <h2 className="text-2xl mb-4 text-gray-800 text-center font-bold">Review Published!</h2>

        <div className="text-gray-600 mb-8">
          Thank you. We have sent you an email to demo@demo.test. Please click the link in the
          message to activate your account.
        </div>

        <button
          type="button"
          className="w-40 block mx-auto focus:outline-none py-2 px-5 rounded-lg shadow-sm text-center text-gray-600 bg-white hover:bg-gray-100 font-medium border"
        >
          Back to home
        </button>
      </div>
    </div>
  );
}

function Step4() {
  const a = 5;

  return (
    <div>
      <div>
        <div className="mb-5 text-center">
          <div className="mx-auto w-32 h-32 mb-2 border rounded-full relative bg-gray-100 mb-4 shadow-inset">
            <img
              id="image"
              alt="img"
              className="object-cover w-full h-32 rounded-full"
              src="image"
            />
          </div>

          <label
            htmlFor="fileInput"
            type="button"
            className="cursor-pointer inine-flex justify-between items-center focus:outline-none border py-2 px-4 rounded-lg shadow-sm text-left text-gray-600 bg-white hover:bg-gray-100 font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="inline-flex flex-shrink-0 w-6 h-6 -mt-1 mr-1"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="0" y="0" width="24" height="24" stroke="none" />
              <path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
              <circle cx="12" cy="13" r="3" />
            </svg>
            Browse Photo
          </label>

          <div className="mx-auto w-48 text-gray-500 text-xs text-center mt-1">
            Click to add profile picture
          </div>

          <input name="photo" id="fileInput" accept="image/*" className="hidden" type="file" />
        </div>

        <div className="mb-5">
          <label htmlFor="firstname" className="font-bold mb-1 text-gray-700 block">
            Firstname
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
            placeholder="Enter your firstname..."
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="font-bold mb-1 text-gray-700 block">
            Email
          </label>
          <input
            type="email"
            className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
            placeholder="Enter your email address..."
          />
        </div>
      </div>
    </div>
  );
}

function Step3() {
  const a = 5;

  return (
    <div>
      <div className="mb-5">
        <label htmlFor="email" className="font-bold mb-1 text-gray-700 block">
          Gender
        </label>

        <div className="flex">
          <label className="flex justify-start items-center text-truncate rounded-lg bg-white pl-4 pr-6 py-3 shadow-sm mr-4">
            <div className="text-teal-600 mr-3">
              <input
                type="radio"
                x-model="gender"
                value="Male"
                className="form-radio focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="select-none text-gray-700">Male</div>
          </label>

          <label className="flex justify-start items-center text-truncate rounded-lg bg-white pl-4 pr-6 py-3 shadow-sm">
            <div className="text-teal-600 mr-3">
              <input
                type="radio"
                x-model="gender"
                value="Female"
                className="form-radio focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="select-none text-gray-700">Female</div>
          </label>
        </div>
      </div>

      <div className="mb-5">
        <label htmlFor="profession" className="font-bold mb-1 text-gray-700 block">
          Profession
        </label>
        <input
          type="profession"
          className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
          placeholder="eg. Web Developer"
        />
      </div>
    </div>
  );
}

function Step2() {
  const options = [
    'Textbook',
    'Lecture Notes',
    'Course Website',
    'Office Hours',
    'Lots of TAs',
    'Other'
  ];

  return (
    <div className="md:w-2/3">
      <h1 className="mb-3 font-extrabold">What resources does the class offer?</h1>
      <Field name="resources" component={CustomSelect} options={options} isMulti />
      <h1 className="mt-6 mb-3 font-extrabold">How difficult is this class?</h1>
      <Field
        name="difficulty"
        component={CustomSlider}
        step={1}
        min={0}
        max={5}
        minLabel="Not Helpful"
        maxLabel="Very Helpful"
      />

      <h1 className="mt-10 mb-3 font-extrabold">How helpful were the course staff?</h1>
      <Field
        name="staffRating"
        component={CustomSlider}
        step={1}
        min={0}
        max={5}
        minLabel="Not Helpful"
        maxLabel="Very Helpful"
      />

      {/* <div className="mb-5">
        <label htmlFor="email" className="font-bold mb-1 text-gray-700 block">
          Gender
        </label>

        <div className="flex">
          <label className="flex justify-start items-center text-truncate rounded-lg bg-white pl-4 pr-6 py-3 shadow-sm mr-4">
            <div className="text-teal-600 mr-3">
              <input
                type="radio"
                x-model="gender"
                value="Male"
                className="form-radio focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="select-none text-gray-700">Male</div>
          </label>

          <label className="flex justify-start items-center text-truncate rounded-lg bg-white pl-4 pr-6 py-3 shadow-sm">
            <div className="text-teal-600 mr-3">
              <input
                type="radio"
                x-model="gender"
                value="Female"
                className="form-radio focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="select-none text-gray-700">Female</div>
          </label>
        </div>
      </div>

      <div className="mb-5">
        <label htmlFor="profession" className="font-bold mb-1 text-gray-700 block">
          Profession
        </label>
        <input
          type="profession"
          className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
          placeholder="eg. Web Developer"
        />
      </div>
    </div> */}
    </div>
  );
}

export function WizardForm() {
  const [step, setStep] = useState(1);

  const onSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

  return (
    <div>
      <div className="border-b-2 mb-2 py-4">
        <div className="flex md:space-x-52">
          {step === 1 && (
            <div className="text-2xl font-extrabold text-gray-700">Leave a Review</div>
          )}
          {step === 2 && (
            <div className="text-2xl font-extrabold text-gray-700">Leave a Review</div>
          )}
          {step === 3 && (
            <div className="text-2xl font-extrabold text-gray-700">Leave a Review</div>
          )}
          {step === 4 && (
            <div className="text-2xl font-extrabold text-gray-700">Leave a Review</div>
          )}
          {step === 5 && (
            <div className="text-2xl font-extrabold text-gray-700">Leave a Review</div>
          )}

          <div className="flex items-center md:w-64">
            <div className={`w-${step}/5 bg-gray-200 rounded-full mr-2 h-2`}>
              <div className="rounded-full bg-green-500 text-xs leading-none h-2 text-center text-black" />
            </div>
            {step <= 4 && (
              <div className="text-xs w-10 text-gray-600">{Math.round((step / 5) * 100)}%</div>
            )}
          </div>
        </div>
      </div>

      <Formik initialValues={{ resources: '', difficulty: 0 }} onSubmit={onSubmit}>
        <Form>
          <div className="mb-24">
            {step === 5 && <Step5 />}
            {step === 4 && <Step4 />}
            {step === 3 && <Step4 />}
            {step === 2 && <Step3 />}
            {step === 1 && <Step2 />}
          </div>

          <div className="fixed bottom-5 left-0 right-0 py-5">
            <div className="max-w-3xl mx-auto px-4">
              <div className="flex justify-between">
                <div className="w-1/2">
                  {step >= 2 && (
                    <button
                      type="button"
                      className="w-32 focus:outline-none py-2 px-5 rounded-lg shadow-sm text-center text-gray-600 bg-white hover:bg-gray-100 font-medium border"
                      onClick={() => setStep(step - 1)}
                    >
                      Previous
                    </button>
                  )}
                </div>

                <div className="w-1/2 text-right">
                  {step <= 4 && (
                    <button
                      type="button"
                      className="w-32 focus:outline-none border border-transparent py-2 px-5 rounded-lg shadow-sm text-center text-white bg-indigo-500 hover:bg-indigo-600 font-medium"
                      onClick={() => setStep(step + 1)}
                    >
                      Next
                    </button>
                  )}

                  {step === 5 && (
                    <button
                      type="submit"
                      className="w-32 focus:outline-none border border-transparent py-2 px-5 rounded-lg shadow-sm text-center text-white bg-blue-500 hover:bg-blue-600 font-medium"
                    >
                      Complete
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
