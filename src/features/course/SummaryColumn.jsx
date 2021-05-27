import {
  AdjustmentsIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClipboardCheckIcon,
  PresentationChartBarIcon,
  UserIcon,
  UsersIcon
} from '@heroicons/react/solid';
import React from 'react';
import { useSelector } from 'react-redux';
import { STATISTICS } from '../../app/constants';
import { capitalize } from '../utils';
import { StatisticPill } from './StatisticPill';

export function SummaryColumn({ col }) {
  const fields = {
    structure: {
      avgProfResponsiveness: {
        icon: <UserIcon className="h-3 w-3 text-indigo-600" />,
        label: 'Professor Responsiveness',
        questionContent: null,
        type: STATISTICS.rating
      },
      avgStaffRating: {
        icon: <UsersIcon className="h-3 w-3 text-indigo-600" />,
        label: 'Course Staff',
        questionContent: null,
        type: STATISTICS.rating
      },
      attendancePercent: {
        icon: <ClipboardCheckIcon className="h-3 w-3 text-indigo-600" />,
        label: 'Attendance Mandatory',
        questionContent: null,
        type: STATISTICS.percentage
      }
    },
    assignments: {
      avgExamDifficulty: {
        icon: <AdjustmentsIcon className="h-3 w-3 text-indigo-600" />,
        label: 'Exam Difficulty',
        questionContent: null,
        type: STATISTICS.rating,
        ratingReverse: true
      },
      quizFrequencies: {
        icon: <CheckCircleIcon className="h-3 w-3 text-indigo-600" />,
        label: 'Quiz Frequency',
        questionContent: null,
        type: STATISTICS.majority
      },
      projHeavyPercent: {
        icon: <PresentationChartBarIcon className="h-3 w-3 text-indigo-600" />,
        label: 'Project Heavy',
        questionContent: null,
        type: STATISTICS.percentage,
        neutral: true
      },
      fairDeadlinesPercent: {
        icon: <CalendarIcon className="h-3 w-3 text-indigo-600" />,
        label: 'Fair Deadlines',
        questionContent: null,
        type: STATISTICS.percentage
      }
    }
  };

  const course = useSelector((state) => state.course.course);
  console.log(course);

  if (!course) {
    return <div> Loading...</div>;
  }

  return (
    <div>
      <p className="font-bold text-xl mb-2">{capitalize(col)}</p>
      {Object.keys(fields[col]).map((key) => (
        <SummaryRow field={fields[col][key]} value={course[key]} />
      ))}
    </div>
  );
}

function SummaryRow({ field, value }) {
  const { icon, label } = field;
  return (
    <div className="flex items-center mb-2">
      <span className="rounded-md relative p-1 bg-purple-200 mr-2">{icon}</span>
      <div className="text-gray-700 mr-2">{label}:</div>
      <StatisticPill field={field} value={value} />
      {/* <div className="text-gray-700">{value}</div> */}
    </div>
  );
}
