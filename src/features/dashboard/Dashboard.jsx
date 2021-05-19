import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { logout } from "../../app/actions/auth.actions";
import { getCollegeByTag } from "../../app/actions/college.actions";
import { getDepartments } from "../../app/actions/department.actions";
import { STATUS } from "../../app/constants";
import CenteredContent from "../../common/layout/CenteredContent";
import { Navbar } from "../../common/Navbar";
import { DashboardContents } from "./DashboardContents";

export function Dashboard() {
  const dispatch = useDispatch();
  const college = useSelector((state) => state.college.college);
  const status = useSelector((state) => state.college.status);
  const user = useSelector((state) => state.user.user);

  const { tag } = useParams();
  useEffect(() => {
    if (status === STATUS.idle) {
      dispatch(
        getCollegeByTag(tag)
      );
    }
  });
  console.log(tag);
  console.log(college);

  if (!user) {

    return (
      <div><Navbar />Dashboard: No User</div>);
  }

  return (
    <div>
      <Navbar />
      <CenteredContent centeredComponent={<DashboardContents />} />
    </div>
  );
}
