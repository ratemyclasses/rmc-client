import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Input } from '../../common/Input';
import { Select } from '../../common/Select';
import { Slider } from '../../common/Slider';
import { createReview } from '../../app/actions/review.actions';
import { isNumeric } from '../utils';

function Step4({ formValues }) {
  const options = [
    { name: 'Yes', value: true },
    { name: 'No', value: false }
  ];

  return (
    <div className="text-center">
      <h1 className="mt-6 mb-3 text-2xl font-bold">Would you take this class again?</h1>
      <Field
        name="wouldTakeAgain"
        component={Select}
        options={options}
        values={[formValues.wouldTakeAgain]}
      />
      <h1 className="mt-3 font-extrabold">Your personalized review</h1>
      <Field
        name="content"
        id="content"
        type="text"
        required
        component={Input}
        label=""
        value={formValues.content}
        placeholder="Tell us about the course"
      />
    </div>
  );
}

function Step3({ formValues }) {
  const quizFrequencies = [
    { name: 'Weekly', value: 'WEEKLY' },
    { name: 'Biweekly', value: 'BIWEEKLY' },
    { name: 'Monthly', value: 'MONTHLY' }
  ];

  return (
    <div className="md:w-2/3">
      <h1 className="mt-3 font-extrabold">How often are there quizzes (if any)?</h1>
      <Field
        name="quizFrequency"
        component={Select}
        options={quizFrequencies}
        values={[formValues.quizFrequency]}
      />

      <h1 className="mt-3 font-extrabold">When did you take this class?</h1>
      <Field
        name="timeTaken"
        id="timeTaken"
        type="text"
        required
        component={Input}
        label=""
        value={formValues.timeTaken}
        placeholder="i.e. Spring 2016"
      />
      <h1 className="mt-3 font-extrabold">How many hours of homework per week?</h1>
      <Field
        name="hoursPerWeek"
        id="hoursPerWeek"
        type="number"
        required
        component={Input}
        label=""
        value={formValues.hoursPerWeek}
        placeholder="5"
      />
    </div>
  );
}

function Step2({ formValues }) {
  const options = [
    { name: 'Yes', value: true },
    { name: 'No', value: false }
  ];

  return (
    <div className="md:w-2/3">
      <div className="flex flex-wrap gap-2">
        <h1 className="mt-3 font-extrabold">Is attendance mandatory?</h1>
        <Field
          name="mandatoryAttendance"
          component={Select}
          options={options}
          values={[formValues.mandatoryAttendance]}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <h1 className="mt-3 font-extrabold">Was it a project heavy class?</h1>
        <Field
          name="projHeavy"
          component={Select}
          options={options}
          values={[formValues.projHeavy]}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <h1 className="mt-3 font-extrabold">Does the class have fair deadlines?</h1>
        <Field
          name="fairDeadlines"
          component={Select}
          options={options}
          values={[formValues.fairDeadlines]}
        />
      </div>

      <h1 className="mt-3 mb-3 font-extrabold">How responsive is the professor?</h1>
      <Field
        name="profResponsiveness"
        component={Slider}
        step={1}
        min={0}
        max={5}
        minLabel="Not Responsive"
        maxLabel="Very Responsive"
        value={formValues.profResponsiveness}
      />

      <h1 className="mt-10 mb-3 font-extrabold">How difficult are the exams?</h1>
      <Field
        name="examDifficulty"
        component={Slider}
        step={1}
        min={0}
        max={5}
        minLabel="Easy"
        maxLabel="Very Hard"
        value={formValues.examDifficulty}
      />
    </div>
  );
}

function Step1({ formValues }) {
  const options = [
    { name: 'Textbook', value: 'Textbook' },
    { name: 'Lecture Notes', value: 'Lecture Notes' },
    { name: 'Course Website', value: 'Course Website' },
    { name: 'Office Hours', value: 'Office Hours' },
    { name: 'Lots of TAs', value: 'Lots Of TAs' },
    { name: 'Other', value: 'Other' }
  ];

  return (
    <div className="md:w-2/3">
      <h1 className="mt-6 mb-3 font-extrabold">What resources does the class offer?</h1>
      <Field
        name="resources"
        component={Select}
        options={options}
        values={formValues.resources}
        isMulti
      />
      <h1 className="mt-6 mb-3 font-extrabold">How difficult is this class?</h1>
      <Field
        name="difficulty"
        component={Slider}
        step={1}
        min={0}
        max={5}
        minLabel="Not Helpful"
        maxLabel="Very Helpful"
        value={formValues.difficulty}
      />

      <h1 className="mt-10 mb-3 font-extrabold">How helpful were the course staff?</h1>
      <Field
        name="staffRating"
        component={Slider}
        step={1}
        min={0}
        max={5}
        minLabel="Not Helpful"
        maxLabel="Very Helpful"
        value={formValues.staffRating}
      />

      <h1 className="mt-10 mb-3 font-extrabold">What would you rate this class overall?</h1>
      <Field
        name="rating"
        component={Slider}
        step={1}
        min={0}
        max={5}
        minLabel="Awful"
        maxLabel="Awesome"
        value={formValues.staffRating}
      />
    </div>
  );
}

export function CreateReviewForm({ setOpen, setSuccess, initValues = {} }) {
  const [step, setStep] = useState(1);
  const [formValues, setFormValues] = useState(initValues);

  const dispatch = useDispatch();
  const course = useSelector((state) => state.course.course);

  const validate = {
    3: Yup.object({
      timeTaken: Yup.string("Invalid. Must be in form 'Spring 2016'")
        .required('Required')
        .nullable(),
      hoursPerWeek: Yup.number('Invalid. Must be a valid number').required('Required').nullable()
    })
  };

  const onSubmit = (values, { setSubmitting }) => {
    if (step === 4) {
      const cleanedData = {};
      Object.keys(values).forEach((key) => {
        if (isNumeric(values[key])) {
          cleanedData[key] = parseInt(values[key], 10);
        } else {
          cleanedData[key] = values[key];
        }
      });

      dispatch(createReview({ ...cleanedData, courseId: course._id }));
      setOpen(false);
      setSuccess(true);
    } else {
      setFormValues({ ...formValues, ...values });
      setStep(step + 1);
      setSubmitting(false);
    }
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

          <div className="flex items-center md:w-64">
            <div className={`w-${step}/4 bg-gray-200 rounded-full mr-2 h-2`}>
              <div className="rounded-full bg-green-500 text-xs leading-none h-2 text-center text-black" />
            </div>
            {step <= 4 && (
              <div className="text-xs w-10 text-gray-600">{Math.round((step / 4) * 100)}%</div>
            )}
          </div>
        </div>
      </div>

      <Formik initialValues={formValues} validationSchema={validate[step]} onSubmit={onSubmit}>
        <Form>
          <div className="mb-24">
            {step === 4 && <Step4 formValues={formValues} />}
            {step === 3 && <Step3 formValues={formValues} />}
            {step === 2 && <Step2 formValues={formValues} />}
            {step === 1 && <Step1 formValues={formValues} />}
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
                  {step <= 3 && (
                    <button
                      type="submit"
                      className="w-32 focus:outline-none border border-transparent py-2 px-5 rounded-lg shadow-sm text-center text-white bg-indigo-500 hover:bg-indigo-600 font-medium"
                    >
                      Next
                    </button>
                  )}

                  {step === 4 && (
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
