import React from 'react';
import { AdminPwaSetup } from './AdminPwaSetup';

export const AdminShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <AdminPwaSetup />
      {children}
    </>
  );
};
