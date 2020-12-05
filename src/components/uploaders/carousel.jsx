import React from "react";
import { connect } from "react-redux";
import AlertSection from "../common/alert";

import { uploadCarouselImage } from "../../store/form/form.actions";

const Carousel = (props) => {
  const { successMessage, error, uploadCarouselImage } = props;
  const onSubmit = (image) => uploadCarouselImage(image);
  return (
    <div className="uploader">
      {(successMessage || error) && (
        <AlertSection successMessage={successMessage} error={error} />
      )}
      <input
        type="file"
        id="files"
        className="file-uploader"
        onChange={({ target }) => onSubmit(target.files[0])}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.formReducer.isLoading,
  successMessage: state.formReducer.successMessage,
  error: state.formReducer.error,
});

export default connect(mapStateToProps, {
  uploadCarouselImage,
})(Carousel);
