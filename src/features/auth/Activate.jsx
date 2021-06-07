import * as axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { BASE_URL } from '../../app/constants';

export function Activate() {
  const history = useHistory();
  const [error, setError] = useState(null);
  const { activationToken } = useParams();

  const authActivateToken = async (token) => {
    try {
      await axios.get(`${BASE_URL}/user/auth-activate/${token}`);
    } catch (err) {
      setError(err.response.data);
    }
  };

  useEffect(() => authActivateToken(activationToken), [activationToken]);

  return (
    <div className="max-w-md w-full space-y-8">
      <div>
        <img
          className="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {error && error.statusCode === 404
            ? 'Invalid Activation Link'
            : 'Your account has been activated!'}
        </h2>
      </div>
      {(!error || error.statusCode !== 404) && (
        <div>
          <button
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            type="button"
            onClick={() => history.push('/login')}
          >
            Back to Login
          </button>
        </div>
      )}
    </div>
  );
}
