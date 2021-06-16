import { StarIcon } from '@heroicons/react/solid';
import React from 'react';
import { STATISTICS } from '../../app/constants';
import { capitalize, mode, rounded } from '../utils';

export function StatisticPill({ field, value }) {
  const { type, ratingReverse, neutral } = field;

  const determinePillColor = () => {
    if (neutral) {
      return 'blue';
    }

    if (type === STATISTICS.rating) {
      if (value < 3) {
        return ratingReverse ? 'green' : 'red';
      }

      if (value < 4) {
        return 'yellow';
      }

      return ratingReverse ? 'red' : 'green';
    }

    if (type === STATISTICS.percentage) {
      if (value > 0.5) {
        return ratingReverse ? 'red' : 'green';
      }
      return ratingReverse ? 'green' : 'red';
    }

    return 'blue';
  };

  if (type === STATISTICS.rating) {
    return (
      <span
        className={`px-2 py-1 flex items-center text-sm rounded-lg font-semibold text-${determinePillColor()}-500 bg-${determinePillColor()}-50`}
      >
        <StarIcon className="h-3 w-3 mr-1" /> {rounded(value)}
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
    return (
      <span
        className={`px-2 py-1 flex items-center text-sm rounded-lg font-semibold text-${determinePillColor()}-500 bg-${determinePillColor()}-50`}
      >
        {capitalize(mode(value).toLowerCase())}
      </span>
    );
  }

  if (type === STATISTICS.list) {
    return value.map((val) => (
      <span
        key={val}
        className={`px-2 py-1 mr-2 flex items-center text-sm rounded-lg font-semibold text-${determinePillColor()}-500 bg-${determinePillColor()}-50`}
      >
        {capitalize(val.toLowerCase())}
      </span>
    ));
  }

  return (
    <span className="px-2 py-1 flex items-center text-sm rounded-lg font-semibold text-blue-500 bg-blue-50">
      Value
    </span>
  );
}
