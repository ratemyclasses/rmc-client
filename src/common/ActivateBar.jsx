import axios from 'axios';
import React, { useState } from 'react';
import { BASE_URL } from '../app/constants';

export function ActivateBar() {
  const [error, setError] = useState(null);

  const resendEmail = async () => {
    try {
      await axios.get(`${BASE_URL}/user/activate/resend`);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <nav className="bg-yellow-100">
      <div className="text-center py-2">
        Check your email to activate your account now and leave a review. Didn&apos;t receive an
        email?
        <button className="text-blue-500 ml-3" type="button" onClick={() => resendEmail()}>
          Resend Email
        </button>
        {error && <p className="text-red-500 text-sm">Internal error.</p>}
      </div>
    </nav>
  );
}
