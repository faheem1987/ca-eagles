import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import FormInput from './form-input';

import { toggleVideoUploader, uploadVideo } from '../store/form/form.actions';

const VideoUpload = (props) => {
  const { showVideoUploader,  toggleVideoUploader, uploadVideo, isLoading, successMessage, error } = props;
  const [url, setUrl] = useState("");
  const alertVariantMssg = successMessage || error;
  const handleChange = (e) => {
    setUrl(e.target.value);
  }
  const handleClose = () => toggleVideoUploader(false);
  const onSave = () => {
    uploadVideo(url)
    .then(() => setUrl(""))
  };
  console.log(" alertVariantMssg ", alertVariantMssg);
  return(
    <Modal show={showVideoUploader} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Upload video</Modal.Title>
      </Modal.Header>
      {(successMessage || error) &&
        <Alert variant={successMessage ? "success" : "danger"}>
          {alertVariantMssg}
        </Alert>
      }
      <Modal.Body>
        <FormInput 
          type="text" 
          name='video-link' 
          value={url} 
          handleChange={handleChange}
          label='Video link'
          required
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onSave}>
          {
            isLoading 
            ? <div className="spinner-border text-white" role="status" />
            : "Save"
          }
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

const mapStateToProps = state => {
  return {
    showVideoUploader: state.formReducer.showVideoUploader,
    isLoading: state.formReducer.isLoading,
    successMessage: state.formReducer.successMessage,
    error: state.formReducer.error
  }
}

export default connect(mapStateToProps, {
  toggleVideoUploader,
  uploadVideo
})(VideoUpload);
