import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { getCourses } from '../../app/actions/course.actions';
import { Paginator } from '../../common/Paginator';
import { CourseListItem } from '../course/CourseListItem';

export function CourseList({ searchTerm, pageNum }) {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.course.courses);
  const total = useSelector((state) => state.course.totalCount);
  const college = useSelector((state) => state.college.college);
  const perPage = 7;
  const [offset, setOffset] = useState(pageNum * perPage);
  const limit = total ? Math.min(perPage, total - offset) : perPage;
  const curPageNum = Math.round(offset / perPage) + 1;

  useEffect(() => {
    if (college) {
      dispatch(
        getCourses({
          collegeId: college._id,
          params: {
            limit,
            offset,
            sortBy: ['score:-1', 'shortName:1'],
            fields: ['name', 'shortName', 'aggregate.avgRating', 'aggregate.reviewCount'],
            searchTerm
          }
        })
      );
    }

    const queryParams = new URLSearchParams(location.search);

    if (queryParams.has('pageNum')) {
      queryParams.set('pageNum', curPageNum);
      history.replace({
        search: queryParams.toString()
      });
    } else {
      queryParams.set('pageNum', curPageNum);
      history.push({
        pathname: location.pathname,
        search: queryParams.toString()
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [college, searchTerm, offset, dispatch]);

  if (!courses.length) {
    return <div>Loading courses...</div>;
  }

  return (
    <div className="mb-8 bg-white h-screen overflow-y-auto">
      <div className="mt-3 ml-3">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{offset + 1}</span> to{' '}
          <span className="font-medium">{Math.min(offset + 7, total)}</span> of{' '}
          <span className="font-medium">{total}</span> results
        </p>
      </div>
      {courses.map((course) => (
        <CourseListItem key={course._id} course={course} />
      ))}
      <Paginator
        setOffset={setOffset}
        offset={offset}
        perPage={perPage}
        curPageNum={curPageNum}
        total={total}
      />
    </div>
  );
}
