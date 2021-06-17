import { StarIcon } from '@heroicons/react/solid';
import parse from 'html-react-parser';
import React from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { determinePillColor, rounded } from '../utils';

export function CourseListItem({ course }) {
  const { url } = useRouteMatch();
  const { search } = useLocation();
  const history = useHistory();

  const getHighlightedFields = (highlights = []) =>
    highlights.reduce((acc, highlight) => {
      const { texts } = highlight;
      const replacements = texts
        .map((text) => {
          if (text.type === 'hit') {
            return `<span class='text-indigo-600 underline' style="text-underline-offset:0.2em">${text.value}</span>`;
          }
          return text.value;
        })
        .join('');
      const originals = texts.map((text) => text.value).join('');
      return { ...acc, [highlight.path]: course[highlight.path].replace(originals, replacements) };
    }, {});

  const highlightedCourse = getHighlightedFields(course.highlights);

  return (
    <button
      onClick={() => history.push({ pathname: `${url}/${course._id}`, search })}
      className="w-full py-2 px-2 hover:bg-gray-200 focus:outline-none focus:ring focus:ring-purple-200 border-b"
      type="button"
      title={`${course.shortName}: ${course.name}`}
    >
      <div className="overflow-ellipsis overflow-hidden relative py-4 px-4 flex items-start justify-between">
        <div className="py-2 w-2/3 text-left">
          <p className="float-left text-lg font-bold text-gray-900">
            {highlightedCourse.shortName ? parse(highlightedCourse.shortName) : course.shortName}
          </p>
          {/* <p className="float-left text-sm font-bold text-gray-900">{course.score}</p> */}
          <p className="float-left text-md font-regular leading-5 text-gray-500 w-full truncate">
            {highlightedCourse.name ? parse(highlightedCourse.name) : course.name}
          </p>
          {/* <dd className="text-gray-500 font-semibold">
                        <span>
                            Hongye Liu
                        </span>
                    </dd> */}
        </div>
        {course.aggregate.reviewCount > 0 && (
          <span
            className={`px-3 py-1 flex items-center text-2xl rounded-lg font-bold text-${determinePillColor(
              rounded(course.aggregate.avgRating)
            )}-500 bg-${determinePillColor(rounded(course.aggregate.avgRating))}-50`}
          >
            <StarIcon className="h-6 w-6 mr-1" /> {rounded(course.aggregate.avgRating)}
          </span>
        )}
      </div>
    </button>
  );
}
