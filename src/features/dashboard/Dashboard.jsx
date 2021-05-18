import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../app/actions/auth.actions";
import { getReviews } from "../../app/actions/review.actions";
import { STATUS } from "../../app/constants";

export function Dashboard() {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.review.reviews);
  const status = useSelector((state) => state.review.status);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (status === STATUS.idle) {
      dispatch(
        getReviews({
          courseId: "608e2f3a12dee4ea740927d7",
        })
      );
    }
  });

  console.log(reviews, user);

  if (!user) {
    return <div>Dashboard: No User</div>;
  }

  return (
    <div>
      <div>Dashboard: No User</div>
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
