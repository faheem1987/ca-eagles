import * as types from './form.types';

const initialState = {
  showVideoUploader: false,
  isLoading: false,
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPLOAD_VIDEO_REQUEST:
    case types.POST_RANKING_REQUEST:
    case types.POST_MATCH_RESULT_REQUEST:
    case types.UPLOAD_IMAGE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.UPLOAD_VIDEO_SUCCESS:
    case types.POST_RANKING_SUCCESS:
    case types.POST_MATCH_RESULT_SUCCESS:
    case types.UPLOAD_IMAGE_SUCCESS:
      return {
        ...state,
        successMessage: 'Uploaded!',
        isLoading: false,
      };
    case types.UPLOAD_VIDEO_FAILURE:
    case types.POST_RANKING_FAILURE:
    case types.POST_MATCH_RESULT_FAILURE:
    case types.UPLOAD_IMAGE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: 'Something went wrong. Please try again later!',
      };
    default:
      return state;
  }
};

export default formReducer;
