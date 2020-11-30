import React, { useState } from "react";
import { connect } from "react-redux";
import CustomButton from "../common/custom-button";
import FormInput from "../common/form-input";
import AlertSection from "../common/alert";

import { uploadVideo } from "../../store/form/form.actions";

const VideoUpload = (props) => {
  const { uploadVideo, isLoading, successMessage, error } = props;
  const [url, setUrl] = useState("");

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  const onSave = (e) => {
    e.preventDefault();
    uploadVideo(url).then(() => setUrl(""));
  };
  return (
    <form className="uploader" onSubmit={onSave}>
      {(successMessage || error) && (
        <AlertSection successMessage={successMessage} error={error} />
      )}
      <FormInput
        type="text"
        name="video-link"
        value={url}
        handleChange={handleChange}
        label="Video link"
        required
      />
      <CustomButton text="Save" isLoading={isLoading} type="submit" />
    </form>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.formReducer.isLoading,
  successMessage: state.formReducer.successMessage,
  error: state.formReducer.error,
});

export default connect(mapStateToProps, {
  uploadVideo,
})(VideoUpload);
