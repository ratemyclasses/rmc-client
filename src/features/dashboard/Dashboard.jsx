import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../app/actions/auth.actions";
import { getDepartments } from "../../app/actions/department.actions";
import { STATUS } from "../../app/constants";

export function Dashboard() {
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.department.departments);
  const status = useSelector((state) => state.department.status);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (status === STATUS.idle) {
      dispatch(
        getDepartments({
          sortBy: ["createdAt:-1"],
          populate: ["collegeId"],
        })
      );
    }
  });

  console.log(departments, user);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
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
