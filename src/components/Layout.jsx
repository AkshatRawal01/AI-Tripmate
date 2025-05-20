import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './custom/Header';
import { Toaster } from './ui/sonner';

function Layout() {
  return (
    <>
      <Header />
      <Toaster />
      <Outlet />
    </>
  );
}

export default Layout; 