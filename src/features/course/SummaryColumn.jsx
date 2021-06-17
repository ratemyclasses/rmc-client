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
import { STATISTICS } from '../../app/constants';
import { rounded } from '../utils';
import { StatisticPill } from './StatisticPill';

export function SummaryColumn({ col, aggregate, compare }) {
  const fields = {
    Structure: {
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
        type: STATISTICS.percentage,
        ratingReverse: true
      }
    },
    'Assignments/Exams': {
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
        type: STATISTICS.list
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

  if (!aggregate) {
    return <div> Loading...</div>;
  }

  const renderRows = () => {
    let existCount = 0;
    const rows = Object.keys(fields[col]).map((key) => {
      if (fields[col][key].type === STATISTICS.rating && aggregate[key]) {
        existCount += 1;
        return (
          <SummaryRow
            key={key}
            field={fields[col][key]}
            value={aggregate[key]}
            condense={compare}
          />
        );
      }

      if (fields[col][key].type === STATISTICS.percentage && aggregate[key] !== null) {
        existCount += 1;
        return (
          <SummaryRow
            key={key}
            field={fields[col][key]}
            value={aggregate[key]}
            condense={compare}
          />
        );
      }

      if (fields[col][key].type === STATISTICS.majority && aggregate[key].length) {
        existCount += 1;
        return (
          <SummaryRow
            key={key}
            field={fields[col][key]}
            value={aggregate[key]}
            condense={compare}
          />
        );
      }

      if (fields[col][key].type === STATISTICS.list && aggregate[key].length) {
        existCount += 1;
        return (
          <SummaryRow
            key={key}
            field={fields[col][key]}
            value={aggregate[key]}
            condense={compare}
          />
        );
      }

      if (compare) {
        return (
          <div key={key} className="flex justify-center mb-2">
            <span className="px-2 py-2 flex items-center text-xs rounded-lg font-semibold text-gray-500 bg-gray-50">
              Inadequate Data
            </span>
          </div>
        );
      }

      return '';
    });

    return (
      <div>
        {rows}
        {existCount < rounded(0.5 * Object.keys(fields[col]).length) && !compare && (
          <p className="text-gray-500">
            {col === 'Structure'
              ? 'Share details about this course’s structure.'
              : 'Help us learn more about this course’s assignments/exams.'}
          </p>
        )}
      </div>
    );
  };

  return (
    <div>
      {!compare && <p className="font-bold text-xl mb-2">{col}</p>}
      {renderRows()}
    </div>
  );
}

function SummaryRow({ field, value, condense }) {
  const { icon, label } = field;
  return (
    <div className={`flex items-center ${condense ? 'justify-center' : ''} mb-2`}>
      {!condense && (
        <>
          <span className="rounded-md relative p-1 bg-purple-200 mr-2">{icon}</span>
          <div className="text-gray-700 mr-2">{label}:</div>
        </>
      )}

      <StatisticPill field={field} value={value} expand={condense} />
    </div>
  );
}
