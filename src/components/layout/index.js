import React from 'react';
import { useSelector } from 'react-redux';

import MainLayout from '../../ui/mainLayout';

const Layout = ({ children }) => {
  const { profile } = useSelector((state) => state);
  console.log(profile)

  return (
    <div>
      <MainLayout mainUser={profile.name} signOut={signOut} handleGoToProfile={onHandleGoToProfile}>
        {children}
      </MainLayout>
    </div>
  )
}

export default Layout;
