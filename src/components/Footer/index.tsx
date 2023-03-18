import React from 'react';
import Box from '@mui/material/Box';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <>
      <Box
        className={styles.footer}
        sx={{
          backgroundColor: 'primary.dark',
        }}>
        Footer
      </Box>
    </>
  );
};
export default Footer;
