import React from 'react';

import Box from '@mui/material/Box';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <Box
      className={styles.header}
      sx={{
        backgroundColor: 'primary.dark',
      }}>
      <h1>Let's study !</h1>
    </Box>
  );
};
export default Header;
