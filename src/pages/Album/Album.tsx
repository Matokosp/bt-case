import { useContext, useEffect, useState } from 'react';
import { Container } from '../../components/Container/Container';
import { Header } from '../../sections/Header/Header';
import { IAlbumPhotos } from '../../models/models';
import { useLocation, useParams } from 'react-router-dom';

import styles from './Album.module.scss';
import { Gallery } from '../../components/Gallery/Gallery';
// @ts-ignore
import { types } from '../../store/storeReducer';
// @ts-ignore
import { StoreContext } from '../../store/StoreProvider';
import { Loading } from '../../components/Loading/Loading';
import { Error } from '../../components/Error/Error';

export const Albums = () => {
  const [error, setError] = useState<null | any>(null);
  const [loading, setLoading] = useState<null | any>(true);
  const [store, dispatch] = useContext<any | null>(StoreContext);

  const [photos, setPhotos] = useState<IAlbumPhotos[] | null>();
  const { albumId } = useParams();
  const location = useLocation().pathname;

  useEffect(() => {
    if (!(store.userId && store.userName && store.albumName)) {
      const locationList = location.split('/');
      const userId = Number(locationList[2]);
      const albumId = Number(locationList[4]);
      Promise.all([
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`),
        fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`),
        fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`),
      ])
        .then(([resUser, resAlbums, resPhotos]) =>
          Promise.all([resUser.json(), resAlbums.json(), resPhotos.json()])
        )
        .then(([dataUser, dataAlbums, dataPhotos]) => {
          const albumName = dataAlbums.filter((e) => e.id === albumId)[0].title;
          setPhotos(dataPhotos);
          dispatch({
            type: types.updateBreadCrumbs,
            payload: {
              id: dataUser.id,
              name: dataUser.name,
              title: albumName,
            },
          });
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
        });
    } else {
      fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setPhotos(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
        });
    }
  }, [setPhotos]);

  return (
    <main>
      {loading && !error && <Loading />}
      {!loading && !error ? (
        <section className={styles.album}>
          <Container grid className={styles.header}>
            <Header centered>
              <h2>{store.albumName}</h2>
              <div>
                <p>{photos?.length} photos</p>
              </div>
            </Header>
          </Container>
          <Gallery photos={photos} />
        </section>
      ) : error ? (
        <Error />
      ) : null}
    </main>
  );
};
