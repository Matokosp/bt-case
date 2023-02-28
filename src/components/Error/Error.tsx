import styles from './Error.module.scss';

export const Error = () => {
  return (
    <div className={styles.errorWrapper}>
      <div className={styles.error}>
        <p>Ooops, there was an error! Try again</p>
      </div>
    </div>
  );
};
