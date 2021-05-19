import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { logout } from "../../app/actions/auth.actions";
import { getCollegeByTag } from "../../app/actions/college.actions";
import { getDepartments } from "../../app/actions/department.actions";
import { STATUS } from "../../app/constants";
import { Navbar } from "../../common/Navbar";

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
      <div>Dashboard: User</div>
      Welcome to RMC, {user.firstName} {user.lastName}
      <button
        className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => dispatch(logout())}
      >
        Logout
      </button>
    </div>
  );
}
