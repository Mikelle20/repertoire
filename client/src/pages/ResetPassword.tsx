import React from 'react';
import { useSelector } from 'react-redux';
import ResetForm from '../components/Reset/ResetForm';

function ResetPassword(): JSX.Element {
  interface ErrorInterface {
    error: {
      error: {
        isError: boolean
        error: string
      }
    }
  }
  const { error } = useSelector((store: ErrorInterface) => store.error);
  return (
    <div className="landingContainer">
      <div className="pageContainer">
        {error.isError ? <div className="loadingScreen">{error.error}</div> : <ResetForm />}
      </div>
    </div>
  );
}

export default ResetPassword;
