import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../store/StoreProvider';
import { Link, useLocation } from 'react-router-dom';

import styles from './Breadcrumbs.module.scss';

export const Breadcrumbs = () => {
  const [store] = useContext<any | null>(StoreContext);
  const [locations, setLocations] = useState<any>();
  useEffect(() => {
    setLocations(store);
  }, [store]);
  return (
    <div className={styles.breadcrumbs}>
      <Link to="/" className={styles.users}>
        Users
      </Link>
      {locations?.userId && (
        <Link to={`user/${locations?.userId}`} className={styles.user}>
          {locations?.userName}
        </Link>
      )}

      {locations?.albumName && (
        <p className={styles.album}>{locations?.albumName}</p>
      )}
    </div>
  );
};
