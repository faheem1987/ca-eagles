import React, {useState} from 'react';
import ImageUploader from '../uploaders/image-uploader';
import PlayersRankingForm from '../uploaders/player-rankings-form';
import VideoUpload from "../uploaders/video-upload";
import MatchResults from "../uploaders/match-results";

const AdminForm = (props) => {
  const [index, setIndex] = useState(null);
  const showForm = (i) => {
    index == i ? setIndex(null) : setIndex(i)
  };
  return (
    <div className="admin-form content">
      <h2>Admin Console</h2>
      <div className="consoles">
        <div className="console">
          <div className="form-type" onClick={() => showForm(1)}>
            Upload Player Image
          </div>
          {index === 1 && <ImageUploader/>}
        </div>

        <div className="console">
          <div className="form-type" onClick={() => showForm(2)}>
            Update players ranking
          </div>
          {index === 2 && <PlayersRankingForm />}
        </div>

        <div className="console">
          <div className="form-type" onClick={() => showForm(3)}>
            Match result
          </div>
          {index === 3 && <MatchResults />}
        </div>

        <div className="console">
          <div className="form-type" onClick={() => showForm(4)}>
            Upload video
          </div>
          {index === 4 && <VideoUpload />}
        </div>
      </div>
    </div>
  )
};

export default AdminForm;