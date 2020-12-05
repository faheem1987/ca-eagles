import React, { useState } from "react";
import PropTypes from "prop-types";
import PlayerUploader from "../uploaders/player-uploader";
import PlayersRankingForm from "../uploaders/player-rankings-form";
import VideoUpload from "../uploaders/video-upload";
import MatchResults from "../uploaders/match-results";
import Carousel from "../uploaders/carousel";
import Modal from "react-bootstrap/Modal";

const AdminConsole = (props) => {
  const [index, setIndex] = useState(null);
  const [title, setTitle] = useState("");
  const toggleModal = (i, title) => {
    props.resetSuccessMessage();
    setTitle(title);
    return i ? setIndex(i) : setIndex(null);
  };
  return (
    <div className="admin-console">
      <h2>Admin Console</h2>
      <div className="consoles">
        <div className="console">
          <div
            className="form-type"
            onClick={() => toggleModal(1, "Add Player")}
            aria-hidden="true"
          >
            Add Player
          </div>
        </div>

        <div className="console">
          <div
            className="form-type"
            onClick={() => toggleModal(2, "Upload Players Ranking")}
            aria-hidden="true"
          >
            Upload Players Ranking
          </div>
        </div>

        <div className="console">
          <div
            className="form-type"
            onClick={() => toggleModal(3, "Upload Match Result")}
            aria-hidden="true"
          >
            Upload Match Result
          </div>
        </div>

        <div className="console">
          <div
            className="form-type"
            onClick={() => toggleModal(4, "Upload Video")}
            aria-hidden="true"
          >
            Upload Video
          </div>
        </div>

        <div className="console">
          <div
            className="form-type"
            onClick={() => toggleModal(5, "Upload Carousel Image")}
            aria-hidden="true"
          >
            Upload Carousel Image
          </div>
        </div>
      </div>
      <Modal show={!!index} onHide={toggleModal}>
        <Modal.Header closeButton>{title}</Modal.Header>
        <Modal.Body>
          {index === 1 && <PlayerUploader />}
          {index === 2 && <PlayersRankingForm />}
          {index === 3 && <MatchResults />}
          {index === 4 && <VideoUpload />}
          {index === 5 && <Carousel />}
        </Modal.Body>
      </Modal>
    </div>
  );
};

AdminConsole.propTypes = {
  resetSuccessMessage: PropTypes.func,
};

export default AdminConsole;
