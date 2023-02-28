import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { IUserProps } from '../../models/models';
import styles from './Home.module.scss';
import { Header } from '../../sections/Header/Header';
import { UserCard } from '../../components/UserCard/UserCard';
import { Container } from '../../components/Container/Container';
import { Loading } from '../../components/Loading/Loading';
import { Error } from '../../components/Error/Error';
// @ts-ignore
import { StoreContext } from '../../store/StoreProvider';
// @ts-ignore
import { types } from '../../store/storeReducer';

export const Home = () => {
  const [error, setError] = useState<null | any>(null);
  const [loading, setLoading] = useState<null | any>(true);
  const [users, setUsers] = useState([]);
  const [favUsers, setFavUsers] = useState<number[]>([]);
  const [store, dispatch] = useContext<any | null>(StoreContext);

  const checkFavUsers = () => {
    const favUsersJson = localStorage.getItem('bt.favourite.users');
    favUsersJson === null
      ? localStorage.setItem('bt.favourite.users', JSON.stringify([]))
      : setFavUsers(JSON.parse(favUsersJson));
  };

  useEffect(() => {
    if (users.length === 0) {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setUsers(data);
          setLoading(false);
          dispatch({
            type: types.updateBreadCrumbs,
            payload: {
              id: null,
              name: null,
              title: null,
            },
          });
        })
        .catch((err) => {
          setError(err);
        });
    }
    checkFavUsers();
  }, [users]);

  return (
    <main>
      {loading && !error && <Loading />}
      {!loading && !error ? (
        <section className={styles.home}>
          <Container grid>
            <Header section>
              <h2>Favorites</h2>
            </Header>
            {users.map((user: IUserProps) => {
              const card = (
                <Link
                  to={`/user/${user.id}`}
                  className={styles.userCard}
                  key={user.name}
                >
                  <UserCard
                    name={user.name}
                    company={user.company.name}
                    email={user.email}
                    id={user.id}
                    favUsers={favUsers}
                    setFavUsers={setFavUsers}
                    favourite
                  />
                </Link>
              );
              return favUsers?.includes(user.id) ? card : null;
            })}
          </Container>
          <Container grid>
            <Header section>
              <h2>Users</h2>
            </Header>
            {users.map((user: IUserProps) => {
              const card = (
                <Link
                  to={`/user/${user.id}`}
                  className={styles.userCard}
                  key={user.name}
                >
                  <UserCard
                    name={user.name}
                    company={user.company.name}
                    email={user.email}
                    favUsers={favUsers}
                    setFavUsers={setFavUsers}
                    id={user.id}
                  />
                </Link>
              );
              return !favUsers?.includes(user.id) ? card : null;
            })}
          </Container>
        </section>
      ) : error ? (
        <Error />
      ) : null}
    </main>
  );
};
