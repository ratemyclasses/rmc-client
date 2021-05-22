import React from 'react';

export function IndividualRatings({ avgDifficulty, avgHoursPerWeek, wtaPercent }) {
  const calcBarFraction = (num, max) => Math.round((num / max) * 12);

  const diff = calcBarFraction(avgDifficulty, 5);
  const hours = calcBarFraction(avgHoursPerWeek, 30);
  const wta = Math.round(wtaPercent * 12);

  let diffClass = diff !== 0 ? `${diff}/12` : 0;
  let hoursClass = hours !== 0 ? `${hours}/12` : 0;
  let wtaClass = wta !== 0 ? `${wta}/12` : 0;

  diffClass = diff === 12 ? 'w-full' : diffClass;
  hoursClass = hours === 12 ? 'w-full' : hoursClass;
  wtaClass = wta === 12 ? 'w-full' : wtaClass;

  return (
    <div className="w-full md:w-full p-1 dark:bg-gray-800 text-gray-700 dark:text-gray-100 relative overflow-hidden">
      <a href="/" className="w-full h-full block">
        <div className="w-full">
          <div className="flex items-center justify-between text-gray-400 text-sm">
            <p>Difficulty</p>
            <p>{avgDifficulty}</p>
          </div>
          <div className="w-full h-2 bg-green-100 rounded-full mb-4">
            <div
              className={`w-${diffClass} h-full text-center text-xs text-white bg-green-400 rounded-full`}
            />
          </div>
          <div className="flex items-center justify-between text-gray-400 text-sm">
            <p>Hrs / Week</p>
            <p>{avgHoursPerWeek}</p>
          </div>
          <div className="w-full h-2 bg-indigo-100 rounded-full mb-4">
            <div
              className={`w-${hoursClass} h-full text-center text-xs text-white bg-indigo-400 rounded-full`}
            />
          </div>
          <div className="flex items-center justify-between text-gray-400 text-sm">
            <p>Would Take Again</p>
            <p>{wtaPercent * 100}%</p>
          </div>
          <div className="w-full h-2 bg-blue-100 rounded-full mb-4">
            <div
              className={`w-${wtaClass} h-full text-center text-xs text-white bg-blue-400 rounded-full`}
            />
          </div>
        </div>
      </a>
    </div>
  );
}
