import { StarIcon } from '@heroicons/react/solid';
import React from 'react';
import { STATISTICS } from '../../app/constants';
// import { mode } from '../utils';

export function StatisticPill({ field, value }) {
  const { type, ratingReverse, neutral } = field;

  const determinePillColor = () => {
    if (neutral) {
      return 'blue';
    }

    if (type === STATISTICS.rating) {
      if (value < 3) {
        return ratingReverse ? 'red' : 'green';
      }

      if (value < 4) {
        return 'yellow';
      }

      return ratingReverse ? 'green' : 'red';
    }

    if (type === STATISTICS.percentage) {
      return value > 0.5 ? 'green' : 'red';
    }

    return 'blue';
  };

  if (type === STATISTICS.rating) {
    return (
      <span
        className={`px-2 py-1 flex items-center text-sm rounded-lg font-semibold text-${determinePillColor()}-500 bg-${determinePillColor()}-50`}
      >
        <StarIcon className="h-3 w-3 mr-1" /> {value}
      </span>
    );
  }

  if (type === STATISTICS.percentage) {
    return (
      <span
        className={`px-2 py-1 flex items-center text-sm rounded-lg font-semibold text-${determinePillColor()}-500 bg-${determinePillColor()}-50`}
      >
        {value > 0.5 ? 'Yes' : 'No'}
      </span>
    );
  }

  if (type === STATISTICS.majority) {
    console.log(value);
    return (
      <span
        className={`px-2 py-1 flex items-center text-sm rounded-lg font-semibold text-${determinePillColor()}-500 bg-${determinePillColor()}-50`}
      >
        {value}
      </span>
    );
  }

  return (
    <span className="px-2 py-1 flex items-center text-sm rounded-lg font-semibold text-blue-500 bg-blue-50">
      Value
    </span>
  );
}
