import React from 'react';

import styles from './Header.module.scss';

type HeaderProps = {
  section?: boolean;
  centered?: boolean;
  className?: string;
  children: any;
};

export const Header = ({ centered, children, className }: HeaderProps) => {
  const classes = [styles.header];
  if (className) {
    classes.push(className);
  }
  return (
    <header
      className={`${classes.join(' ')} ${
        centered ? styles.centered : styles.section
      }`}
    >
      {children}
    </header>
  );
};
