import { useDispatch } from "react-redux";
import { logout } from "../auth/auth.actions";

export function Dashboard() {
  const dispatch = useDispatch();

  return (
    <div>
      WELCOME TO THE DASHBOARD
      <button
        className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => dispatch(logout())}
      >
        Logout
      </button>
    </div>
  );
}
