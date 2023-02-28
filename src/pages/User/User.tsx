import { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '../../sections/Header/Header';
import { AlbumCard } from '../../components/AlbumCard/AlbumCard';
// @ts-ignore
import { StoreContext } from '../../store/StoreProvider';
// @ts-ignore
import { types } from '../../store/storeReducer';
import { IUserProps, IUserAlbums } from '../../models/models';

import styles from './User.module.scss';
import { Container } from '../../components/Container/Container';
import { Loading } from '../../components/Loading/Loading';
import { Error } from '../../components/Error/Error';

export const User = () => {
  const [error, setError] = useState<null | any>(null);
  const [loading, setLoading] = useState<null | any>(true);
  const [store, dispatch] = useContext<any | null>(StoreContext);
  const { id } = useParams();
  const [user, setUser] = useState<IUserProps | null>(null);
  const [userAlbums, setUserAlbums] = useState<IUserAlbums[] | null>(null);

  useEffect(() => {
    Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/albums?userId=${id}`),
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`),
    ])
      .then(([resAlbums, resUser]) =>
        Promise.all([resAlbums.json(), resUser.json()])
      )
      .then(([dataAlbums, dataUser]) => {
        setUserAlbums(dataAlbums);
        setUser(dataUser);
        dispatch({
          type: types.updateBreadCrumbs,
          payload: {
            id: dataUser.id,
            name: dataUser.name,
            title: null,
          },
        });
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  return (
    <main>
      {loading && !error && <Loading />}
      {!loading && !error ? (
        <section className={styles.user}>
          {user && (
            <Header centered>
              <h2>{user.name}</h2>
              <div>
                <p>{user.company.name}</p>
                <p>{user.email}</p>
                <p>
                  {user.address.street +
                    ', ' +
                    user.address.zipcode +
                    ' ' +
                    user.address.city}
                </p>
              </div>
            </Header>
          )}
          <Container grid className={styles.albums}>
            {userAlbums &&
              userAlbums.map((album: IUserAlbums, i: number) => {
                return (
                  <Link
                    key={album.id}
                    className={styles.albumCard}
                    to={`/user/${album.userId}/album/${album.id}`}
                    onClick={() => {
                      dispatch({
                        type: types.updateBreadCrumbs,
                        payload: {
                          id: store.userId,
                          name: store.userName,
                          title: album.title,
                        },
                      });
                    }}
                  >
                    <AlbumCard key={i} album={album} />
                  </Link>
                );
              })}
          </Container>
        </section>
      ) : error ? (
        <Error />
      ) : null}
    </main>
  );
};
