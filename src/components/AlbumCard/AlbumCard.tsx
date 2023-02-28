import { IUserAlbums } from '../../models/models';
import styles from './AlbumCard.module.scss';

interface AlbumCardProps {
  album: IUserAlbums;
}

export const AlbumCard = ({ album }: AlbumCardProps) => {
  return <div className={styles.albumCard}>{album.title}</div>;
};
