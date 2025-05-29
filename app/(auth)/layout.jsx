import DebugToken from '@/components/DebugToken';
import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <>
      <DebugToken />
      <div className="flex justify-center pt-20">{children}</div>
    </>
  );
};

export default AuthLayout;
