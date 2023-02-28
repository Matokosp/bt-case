import { useEffect, useState, useCallback, useRef } from 'react';
import { Container } from '../Container/Container';
import { IAlbumPhotos } from '../../models/models';

import styles from './Gallery.module.scss';
import { Arrow } from '../../assets/Icons/Arrow';

interface GalleryProps {
  photos: IAlbumPhotos[] | null | undefined;
}

interface SliderProps {
  photos: IAlbumPhotos[] | null | undefined;
  inScene: null | number;
  setInScene: React.Dispatch<React.SetStateAction<number>>;
}

export const Gallery = ({ photos }: GalleryProps) => {
  const [inScene, setInScene] = useState<number>(-1);
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  const [boundRect, setBoundRect] = useState<any>();
  const [isFeaturing, setIsFeaturing] = useState<boolean>(false);
  const [isOpening, setIsOpening] = useState(false);

  const Slider = ({ photos, inScene }: SliderProps) => {
    return (
      <div
        className={`${styles.slider} ${isFeaturing ? styles.show : null}`}
        onClick={() => [setInScene(-1), setIsFeaturing(false)]}
      >
        <div
          onClick={(e) => handleNav(e, 'previous')}
          className={`${styles.previous} ${styles.nav}`}
        >
          <Arrow stroke="#cde5ff" fill="#cde5ff" />
        </div>
        {inScene !== null && photos && (
          <figure className={styles.figureWrapper}>
            <img src={photos[inScene].url} alt={photos[inScene].title} />
            <figcaption>{photos[inScene].title}</figcaption>
          </figure>
        )}
        <div
          onClick={(e) => handleNav(e, 'next')}
          className={`${styles.next} ${styles.nav}`}
        >
          <Arrow stroke="#cde5ff" fill="#cde5ff" />
        </div>
      </div>
    );
  };

  const handleNav = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    type: string
  ) => {
    e.stopPropagation();
    if (photos) {
      switch (type) {
        case 'previous':
          setInScene((a) => (a - 1 < 0 ? photos.length - 1 : a - 1));
          setIsOpening(false);
          break;
        case 'next':
          setInScene((a) => (a + 1 > photos.length - 1 ? 0 : a + 1));
          setIsOpening(false);
          break;
      }
    }
  };

  const changeChild = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && photos) {
        setInScene((a) => (a - 1 < 0 ? photos.length - 1 : a - 1));
        setIsOpening(false);
      } else if (e.key === 'ArrowRight' && photos) {
        setInScene((a) => (a + 1 > photos.length - 1 ? 0 : a + 1));
        setIsOpening(false);
      } else if (e.key === 'Escape') {
        setInScene(-1);
        setIsFeaturing(false);
        setBoundRect(null);
      }
    },
    [photos]
  );

  useEffect(() => {
    document.addEventListener('keydown', changeChild);
    return function cleanup() {
      document.removeEventListener('keydown', changeChild);
    };
  });

  const handleFeatured = (
    idx: number,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setIsOpening(true);
    const node = e.target as HTMLElement;
    const coord = node.getBoundingClientRect();
    setBoundRect(coord);
    setInScene(idx);
    setIsFeaturing(true);
  };

  return (
    <div className={styles.gallery}>
      {isFeaturing && (
        <div
          className={`${styles.sliderWrapper} ${
            isOpening ? styles.openAnimation : ''
          }`}
        >
          <Slider photos={photos} inScene={inScene} setInScene={setInScene} />
        </div>
      )}
      <Container grid>
        {photos?.map((img, idx) => {
          return (
            <div
              key={img.id}
              className={styles.image}
              onClick={(e) => handleFeatured(idx, e)}
            >
              <img
                src={img.url}
                alt={img.title}
                style={{
                  transition:
                    inScene === idx && isOpening && isFeaturing ? '0.6s' : '0s',
                  width:
                    inScene === idx && isOpening && isFeaturing
                      ? '600px'
                      : null,
                  zIndex:
                    inScene === idx && isOpening && isFeaturing ? '2' : null,
                  transform:
                    inScene === idx && isOpening && isFeaturing
                      ? `translate(
                    ${(windowSize.current[0] - 600) / 2 - boundRect.left}px,
                    ${(windowSize.current[1] - 600) / 2 - boundRect.top}px
                  )`
                      : null,
                }}
              />
              <img
                alt={img.title}
                className={inScene === idx ? styles.show : ''}
                src={inScene === idx ? img.url : ''}
              />
            </div>
          );
        })}
      </Container>
    </div>
  );
};
