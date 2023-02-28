import { Star } from '../../assets/Icons/Star';
import styles from './UserCard.module.scss';

type UserCardProps = {
  name: string;
  company: string;
  email: string;
  favourite?: boolean;
  id: number;
  favUsers: number[];
  setFavUsers: React.Dispatch<any>;
};

export const UserCard = ({
  name,
  company,
  email,
  favourite,
  favUsers,
  setFavUsers,
  id,
}: UserCardProps) => {
  const favUsersJson = localStorage.getItem('bt.favourite.users');
  let parsedFavUsers = favUsersJson !== null && JSON.parse(favUsersJson);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (!favUsers.includes(id)) {
      parsedFavUsers.push(id);
      localStorage.setItem(
        'bt.favourite.users',
        JSON.stringify(parsedFavUsers)
      );
      setFavUsers(parsedFavUsers);
    } else {
      const removed = parsedFavUsers.filter((userId: number) => {
        return userId !== id;
      });
      localStorage.setItem('bt.favourite.users', JSON.stringify(removed));
      setFavUsers(removed);
    }
  };

  return (
    <div className={styles.userCard}>
      <p>
        <b>{name}</b>
      </p>
      <p>{company}</p>
      <p>{email}</p>
      <div className={styles.favourite} onClick={(e) => [handleClick(e)]}>
        <Star stroke={'#cde5ff'} fill={favourite ? '#cde5ff' : 'transparent'} />
      </div>
    </div>
  );
};
