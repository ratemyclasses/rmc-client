import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "./auth.actions";
import { STATUS } from "../features.constants";

export function Auth() {
  const authenticated = useSelector(({ auth }) => auth.authenticated);
  const status = useSelector(({ auth }) => auth.status);
  const dispatch = useDispatch();

  //   useEffect(() => {
  //     if (status === STATUS.idle) {
  //       dispatch(login({ email: "sguduguntla@berkeley.edu", password: "12345" }));
  //     }
  //   });

  if (status === STATUS.pending) {
    return <div>Loading...</div>;
  }

  return (
    <div class="px-8 pt-6 pb-8 mb-4 flex flex-col">
      <div class="mb-4">
        <label
          class="block text-grey-darker text-sm font-bold mb-2"
          for="email"
        >
          Email
        </label>
        <input
          class="border rounded w-full py-2 px-3 text-grey-darker"
          id="username"
          type="text"
          placeholder="Email"
        />
      </div>
      <div class="mb-6">
        <label
          class="block text-grey-darker text-sm font-bold mb-2"
          for="password"
        >
          Password
        </label>
        <input
          class="border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
          id="password"
          type="password"
          placeholder="******************"
        />
        <p class="text-red text-xs italic">Please choose a password.</p>
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
          type="button"
        >
          Log In
        </button>
        <a
          class="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker"
          href="#"
        >
          Forgot Password?
        </a>
      </div>
    </div>
  );

  {
    /* <div>
      <h1>HIII {authenticated ? "AUTH" : ""}</h1>
      <button
        class="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
        onClick={() =>
          dispatch(
            login({ email: "sguduguntla@berkeley.edu", password: "12345" })
          )
        }
      >
        Login
      </button>{" "}
      <button
        class="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
        onClick={() => dispatch(logout())}
      >
        Logout
      </button>{" "}
    </div> */
  }
}
