export interface IUserProps {
  id: number;
  name: string;
  phone: string;
  email: string;
  username: string;
  website: string;
  company: {
    name: string;
    bs: string;
    catchFrase: string;
  };
  address: {
    city: string;
    zipcode: string;
    street: string;
  };
}

export interface IUserAlbums {
  id: number;
  title: string;
  userId: number;
}

export interface IAlbumPhotos {
  id: number;
  albumId: number;
  thumbnailUrl: string;
  title: string;
  url: string;
}

export interface IPageLocation {
  location: {
    userId: null;
    userName: null;
    albumName: any;
  };
  setLocation: React.Dispatch<
    React.SetStateAction<{
      userId: null;
      userName: null;
      albumName: any;
    }>
  >;
}
