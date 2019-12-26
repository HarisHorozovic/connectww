import { GalleryActionTypes } from './gallery.types';

const INITIAL_STATE = {
  images: [],
  galleryErrors: null,
  galleryLoading: true,
  changeSuccess: false
};

const galleryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GalleryActionTypes.UPLOAD_IMAGE:
      return {
        ...state,
        images: state.images.concat(action.payload),
        loading: false
      };
    case GalleryActionTypes.GET_GALLERY:
      return {
        ...state,
        images: action.payload,
        galleryLoading: false
      };
    case GalleryActionTypes.SET_GALLERY_ERROR:
      return {
        ...state,
        images: [],
        galleryErrors: action.payload,
        galleryLoading: false,
        changeSuccess: false
      };

    case GalleryActionTypes.UPDATE_MAIN_IMAGE:
      return {
        ...state,
        changeSuccess: true,
        galleryLoading: false
      };
    default:
      return state;
  }
};

export default galleryReducer;
