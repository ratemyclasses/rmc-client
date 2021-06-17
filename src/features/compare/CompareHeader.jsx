import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCompareCourse } from '../../app/actions/course.actions';
import { CustomDropdown } from '../../common/CustomDropdown';

export function CompareHeader() {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.course.courses);
  const college = useSelector((state) => state.college.college);

  const options = [
    { name: 'Select Course', value: null },
    ...courses.map((course) => ({ name: course.shortName, value: course._id }))
  ];

  const onChange = (val) => {
    dispatch(toggleCompareCourse({ collegeId: college._id, courseId: val.value }));
  };

  return <CustomDropdown options={options} handleChange={onChange} />;
}
