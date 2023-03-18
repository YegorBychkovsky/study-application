import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';

import styles from './MainLayout.module.scss';

export const MainLayout: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
