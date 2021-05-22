import React from 'react';

export function CourseInfo({ course }) {
  const vals = [
    {
      title: 'COURSE STRUCTURE',
      values: [
        `Professor Responsiveness:  ${course.avgProfResponsiveness || 'N/A'}`,
        `Course Staff Rating: ${course.staffRating || 'N/A'}`,
        `Mandatory Attendance: ${`${course.attendancePercent * 100}%` || 'N/A'}`
      ]
    },
    {
      title: 'RESOURCES',
      values: course.resources || []
    },
    {
      title: 'ASSIGNMENTS/EXAMS',
      values: [
        `Project Heavy: ${`${course.projHeavyPercent * 100}%` || 'N/A'}`,
        `Quiz Frequency: ${course.quizFrequencies || 'N/A'}`,
        `Exam Difficulty: ${course.avgExamDifficulty || 'N/A'}`,
        `Fair Deadlines: ${`${course.fairDeadlinesPercent * 100}%` || 'N/A'}`
      ]
    }
  ];

  return (
    <div className="flex items-center">
      {vals.map((col) => (
        <div key={col.title} className="w-64">
          <h2 className="font-medium title-font tracking-widest text-gray-900 mb-4 text-sm text-center sm:text-left">
            {col.title}
          </h2>
          <div className="flex flex-col sm:items-start sm:text-left text-center items-center -mb-1 space-y-2.5">
            {col.values.length
              ? col.values.map((value) => (
                  <div key={value} className="text-gray-700">
                    <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        className="w-3 h-3"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </span>
                    {value}
                  </div>
                ))
              : 'N/A'}
          </div>
        </div>
      ))}
    </div>
  );
}
