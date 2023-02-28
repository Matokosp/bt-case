const initialStore = {
  albumName: null,
  userId: null,
  userName: null,
};

const types = {
  updateAlbum: 'update album name',
  updateUser: 'update user id and name',
  cleanStore: 'clean store',
  prev: 'store',
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case types.updateBreadCrumbs:
      return {
        userId: action.payload.id,
        userName: action.payload.name,
        albumName: action.payload.title,
      }
    default:
      return state;
  }
};

export { initialStore, types };
export default storeReducer;
