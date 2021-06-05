import { Field, Form, Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { createReview, updateReviewById } from '../../app/actions/review.actions';
import { STATUS } from '../../app/constants';
import { Dropdown } from '../../common/Dropdown';
import { Input } from '../../common/Input';
import { Select } from '../../common/Select';
import { Textarea } from '../../common/Textarea';
import { isNumeric } from '../utils';

const quarters = [
  { name: 'Spring 2021', value: 'Spring 2021' },
  { name: 'Winter 2020', value: 'Winter 2020' },
  { name: 'Fall 2020', value: 'Fall 2020' },
  { name: 'Summer 2020', value: 'Summer 2020' },
  { name: 'Spring 2020', value: 'Spring 2020' },
  { name: 'Winter 2019', value: 'Winter 2019' },
  { name: 'Fall 2019', value: 'Fall 2019' },
  { name: 'Summer 2019', value: 'Summer 2019' }
];

const options = [
  { name: 'Yes', value: true },
  { name: 'No', value: false }
];

const quizFrequencies = [
  { name: 'Weekly', value: 'WEEKLY' },
  { name: 'Biweekly', value: 'BIWEEKLY' },
  { name: 'Monthly', value: 'MONTHLY' }
];

const resources = [
  { name: 'Textbook', value: 'Textbook' },
  { name: 'Lecture Notes/Slides', value: 'Lecture Notes/Slides' },
  { name: 'Course Website', value: 'Course Website' },
  { name: 'Office Hours', value: 'Office Hours' },
  { name: 'Lots of TAs', value: 'Lots of TAs' },
  { name: 'Online Forum (Piazza, Canvas, etc)', value: 'Online Forum (Piazza, Canvas, etc)' }
];

const ratings = [
  { name: '1', value: 1 },
  { name: '2', value: 2 },
  { name: '3', value: 3 },
  { name: '4', value: 4 },
  { name: '5', value: 5 }
];

function Step4({ formValues }) {
  return (
    <div>
      <h1 className="mt-10 mb-3 font-bold">
        What would you rate this class overall? <span className="text-sm text-red-500">*</span>
      </h1>
      <Field
        name="rating"
        component={Select}
        options={ratings}
        minLabel="Awful"
        maxLabel="Awesome"
        values={[formValues.rating]}
      />
      <div className="flex flex-wrap gap-2">
        <h1 className="mt-3 font-bold">
          Would you take this class again? <span className="text-sm text-red-500">*</span>
        </h1>
        <Field
          name="wouldTakeAgain"
          component={Select}
          options={options}
          values={[formValues.wouldTakeAgain]}
        />
      </div>
      <h1 className="font-bold">Your personalized review</h1>
      <div className="mt-3 sm:w-3/4">
        <Field
          name="content"
          id="content"
          type="text"
          rows={6}
          required
          component={Textarea}
          label=""
          placeholder="Tell us about the course"
        />
      </div>
    </div>
  );
}

function Step3({ formValues }) {
  return (
    <div>
      <h1 className="mt-10 mb-3 font-bold">
        How difficult are the exams? <span className="text-sm text-red-500">*</span>
      </h1>
      <Field
        name="examDifficulty"
        component={Select}
        options={ratings}
        minLabel="Easy"
        maxLabel="Very Hard"
        values={[formValues.examDifficulty]}
      />
      <div className="flex flex-wrap gap-2">
        <h1 className="mt-3 font-bold">Was it a project heavy class?</h1>
        <Field
          name="projHeavy"
          component={Select}
          options={options}
          values={[formValues.projHeavy]}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <h1 className="mt-3 font-bold">Does the class have fair deadlines?</h1>
        <Field
          name="fairDeadlines"
          component={Select}
          options={options}
          values={[formValues.fairDeadlines]}
        />
      </div>
      <h1 className="mt-3 font-bold">How often are there quizzes (if any)?</h1>
      <Field
        name="quizFrequency"
        component={Select}
        options={quizFrequencies}
        values={[formValues.quizFrequency]}
      />
    </div>
  );
}

function Step2({ formValues, professors }) {
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <h1 className="mt-3 font-bold">
          Is attendance mandatory? <span className="text-sm text-red-500">*</span>
        </h1>
        <Field
          name="mandatoryAttendance"
          component={Select}
          options={options}
          values={[formValues.mandatoryAttendance]}
        />
      </div>
      <h1 className="mt-3 font-bold">
        Who was your professor? <span className="text-sm text-red-500">*</span>
      </h1>
      <Field
        name="professor"
        id="professor"
        required
        component={Dropdown}
        label="Choose professor"
        options={professors}
        value={{
          name: formValues.professor || "Couldn't find my professor",
          value: formValues.professor
        }}
      />
      {formValues.professor === "Couldn't find my professor" && (
        <div className="sm:w-1/2">
          <h1 className="mt-3 font-bold">
            Different Professor? <span className="text-sm text-red-500">*</span>
          </h1>
          <Field
            name="profName"
            id="profName"
            type="text"
            required
            component={Input}
            label=""
            placeholder="i.e. Josh Hug"
          />
        </div>
      )}
      <h1 className="mt-3 mb-3 font-bold">How responsive was your professor?</h1>
      <Field
        name="profResponsiveness"
        component={Select}
        minLabel="Not Responsive"
        maxLabel="Very Responsive"
        options={ratings}
        values={[formValues.profResponsiveness]}
      />
      <h1 className="mt-10 mb-3 font-bold">How helpful were the course staff (if any)?</h1>
      <Field
        name="staffRating"
        component={Select}
        options={ratings}
        minLabel="Not Helpful"
        maxLabel="Very Helpful"
        values={[formValues.staffRating]}
      />
    </div>
  );
}

function Step1({ formValues }) {
  return (
    <div>
      <h1 className="mt-3 font-bold">
        When did you take this class? <span className="text-sm text-red-500">*</span>
      </h1>
      <Field
        name="timeTaken"
        id="timeTaken"
        required
        component={Dropdown}
        label="Choose semester/quarter"
        placeholder="i.e. Spring 2016"
        options={quarters}
        value={{ name: formValues.timeTaken, value: formValues.timeTaken }}
      />
      <h1 className="mt-6 mb-3 font-bold">
        What resources does the class offer? <span className="text-sm text-red-500">*</span>
      </h1>
      <Field
        name="resources"
        component={Select}
        options={resources}
        values={formValues.resources}
        isMulti
      />
      <h1 className="mt-6 mb-3 font-bold">
        How difficult is this class? <span className="text-sm text-red-500">*</span>
      </h1>
      <Field
        name="difficulty"
        component={Select}
        options={ratings}
        minLabel="Easy"
        maxLabel="Very Hard"
        values={[formValues.difficulty]}
      />
      <h1 className="mt-3 font-bold">
        How many hours of work per week? <span className="text-sm text-red-500">*</span>
      </h1>
      <div className="sm:w-1/2">
        <Field
          name="hoursPerWeek"
          id="hoursPerWeek"
          type="number"
          required
          component={Input}
          label=""
          placeholder="5"
        />
      </div>
    </div>
  );
}

export function CreateReviewForm({ setOpen, setSuccess, initValues = {}, professors = [] }) {
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  const course = useSelector((state) => state.course.course);
  const status = useSelector((state) => state.review.status);

  const isFirstRun = useRef([]);

  useEffect(() => {
    if (!isFirstRun.current.length) {
      isFirstRun.current = [
        ...professors.map((p) => ({
          name: p,
          value: p
        })),
        { name: "Couldn't find my professor", value: "Couldn't find my professor" }
      ];

      if (!initValues.timeTaken) {
        initValues.timeTaken = quarters[0].value;
      }

      if (!initValues.professor) {
        initValues.professor = isFirstRun.current[0].value;
      } else if (initValues.professor !== "Couldn't find my professor") {
        isFirstRun.current.unshift({ name: initValues.professor, value: initValues.professor });
      }
    }
  }, [status, setSuccess, professors, initValues]);

  const validate = {
    1: Yup.object({
      timeTaken: Yup.string("Invalid. Must be in form 'Spring 2016'").required('Required'),
      resources: Yup.array().min(1, 'Required').max(resources.length).required('Required'),
      difficulty: Yup.number().integer().min(1).max(ratings.length).required('Required'),
      hoursPerWeek: Yup.number('Invalid. Must be a valid number')
        .min(1, 'Must be >= 1')
        .max(40, 'Must be <= 40')
        .required('Required')
    }),
    2: Yup.object({
      mandatoryAttendance: Yup.boolean().required('Required'),
      professor: Yup.string().required('Required'),
      profResponsiveness: Yup.number().integer().min(1).max(ratings.length),
      staffRating: Yup.number().integer().min(1).max(ratings.length)
    }),
    3: Yup.object({
      examDifficulty: Yup.number().integer().min(1).max(ratings.length).required('Required'),
      projectHeavy: Yup.boolean(),
      fairDeadlines: Yup.boolean(),
      quizFrequency: Yup.string()
    }),
    4: Yup.object({
      rating: Yup.number().integer().min(1).max(ratings.length).required('Required'),
      wouldTakeAgain: Yup.boolean().required('Required'),
      content: Yup.string()
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

      if (cleanedData.professor === "Couldn't find my professor") {
        cleanedData.professor = cleanedData.profName;
      }

      if (initValues._id) {
        dispatch(updateReviewById({ id: initValues._id, formData: cleanedData })).then(() => {
          if (status === STATUS.success) {
            setSuccess(STATUS.success);
          } else if (status === STATUS.failed) {
            setSuccess(STATUS.failed);
          }
        });
      } else {
        dispatch(createReview({ ...cleanedData, courseId: course._id })).then(() => {
          if (status === STATUS.success) {
            setSuccess(STATUS.success);
          } else if (status === STATUS.failed) {
            setSuccess(STATUS.failed);
          }
        });
      }
      setOpen(false);
    } else {
      setStep(step + 1);
    }
    setSubmitting(false);
  };

  return (
    <div>
      <div className="border-b-2 mb-2 py-4 w-full flex flex-wrap">
        {step === 1 && (
          <div className="text-2xl font-bold text-gray-700 flex gap-10">
            General Info <span className="text-sm text-red-500">* required</span>
          </div>
        )}
        {step === 2 && (
          <div className="text-2xl font-bold text-gray-700 flex gap-10">
            Course Structure <span className="text-sm text-red-500">* required</span>
          </div>
        )}
        {step === 3 && (
          <div className="text-2xl font-bold text-gray-700 flex gap-10">
            Assignments/Exams <span className="text-sm text-red-500">* required</span>
          </div>
        )}
        {step === 4 && (
          <div className="text-2xl font-bold text-gray-700 flex gap-10">
            Your Thoughts <span className="text-sm text-red-500">* required</span>
          </div>
        )}
        <div className="flex-grow" />

        <div className="flex items-center md:w-64">
          <div className="bg-gray-200 rounded-full mr-2 h-2 w-full">
            <div
              className={`${
                step === 4 ? 'w-full' : `w-${step}/4`
              } rounded-full bg-green-500 text-xs leading-none h-2 text-center text-black`}
            />
          </div>
          {step <= 4 && (
            <div className="text-xs w-10 text-gray-600">{Math.round((step / 4) * 100)}%</div>
          )}
        </div>
      </div>

      <Formik initialValues={initValues} validationSchema={validate[step]} r onSubmit={onSubmit}>
        {({ values }) => (
          <Form>
            {step === 1 && <Step1 formValues={values} />}
            {step === 2 && <Step2 formValues={values} professors={isFirstRun.current} />}
            {step === 3 && <Step3 formValues={values} />}
            {step === 4 && <Step4 formValues={values} />}

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
                        className="w-32 focus:outline-none border border-transparent py-2 px-5 rounded-lg shadow-sm text-center text-white bg-indigo-600 hover:bg-indigo-600 font-medium"
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
        )}
      </Formik>
    </div>
  );
}
