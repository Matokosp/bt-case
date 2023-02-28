import styles from './Container.module.scss';

interface ContainerProps {
  children?: React.ReactNode;
  noPadding?: boolean;
  className?: string;
  grid?: boolean;
  innerRef?: any;
  ref?: any;
}

export const Container = ({
  children,
  noPadding,
  className,
  grid,
}: ContainerProps) => {
  const classes = [styles.container];

  if (noPadding) {
    classes.push(styles.noPadding);
  }
  if (grid) {
    classes.push(styles.grid);
  }
  if (className) {
    classes.push(className);
  }

  return <div className={classes.join(' ')}>{children}</div>;
};
