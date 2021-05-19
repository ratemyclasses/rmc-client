import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CenteredContent from '../../common/layout/CenteredContent';
import { Navbar } from '../../common/Navbar';
import { DashboardContents } from './DashboardContents';

export function Dashboard() {
  const college = useSelector((state) => state.college.college);
  const status = useSelector((state) => state.college.status);
  const user = useSelector((state) => state.user.user);

  const { tag } = useParams();

  console.log(tag, college, status);

  if (!user) {
    return (
      <div>
        <Navbar />
        Dashboard: No User
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <CenteredContent centeredComponent={<DashboardContents />} />
    </div>
  );
}
