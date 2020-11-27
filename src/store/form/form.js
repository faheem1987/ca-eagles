const initialState = {
  showVideoUploader: false,
  isLoading: false
};

const formReducer = (state=initialState, action) => {
  switch(action.type) {
    case 'SHOW_VIDEO_UPLOADER': 
      return {
        ...state,
        showVideoUploader: action.isOpen
      }
    case 'UPLOAD_VIDEO_REQUEST':
      return {
        ...state,
        isLoading: true,
      }
    case 'UPLOAD_VIDEO_SUCCESS':
      return {
        ...state,
        successMessage: "Your video has been uploaded successfully!",
        isLoading: false
      }
    case 'UPLOAD_VIDEO_FAILURE':
        return {
          ...state,
          isLoading: false,
          error: "Something went wrong. Please try again later!"
        }
  }
  return state;
}

export default formReducer;