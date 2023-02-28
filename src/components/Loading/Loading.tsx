import styles from './Loading.module.scss';

export const Loading = () => {
  return (
    <div className={styles.loadingWrapper}>
      <div className={styles.loading}>
        <div></div>
      </div>
    </div>
  );
};
