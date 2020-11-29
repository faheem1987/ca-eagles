import React, { useState } from 'react';
import { connect } from 'react-redux';
import Dropdown from 'react-dropdown';
import DatePicker from "react-datepicker";
import CustomButton from '../common/custom-button';
import AlertSection from '../common/alert';
import FormInput from '../common/form-input';

import { uploadImage } from '../../store/form/form.actions';

const ImageUploader = (props) => {
  const {uploadImage, successMessage, error, isLoading} = props;


  const [playerName, setPlayerName] = useState("");
  const [DOB, setDOB] = useState(new Date());
  const [skill, setSkill] = useState("Skill");
  const [country, setCountry] = useState("Country");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    uploadImage({playerName, DOB, skill, country, image, bio})
      // .then(() => {
      //   setPlayerName("");
      //   setDOB("");
      //   setSkill("");
      //   setCountry("");
      //   setBio("");
      //   setImage("");
      // });
  };

  const handleChange = (e, func, hasTarget=true) => {
    return hasTarget ? func(e.target.value) : func(e.value)
  };
  
  return (
    <form className="uploader" onSubmit={onSubmit}>
      {(successMessage || error) &&
        <AlertSection successMessage={successMessage} error={error} />
      }
      <FormInput 
        type="text" 
        name='player name' 
        value={playerName} 
        handleChange={(e) => {handleChange(e, setPlayerName)}}
        label='Player name'
        required
      />
      <label htmlFor="dob" className="dob-label">DOB</label>
      <DatePicker id="dob" selected={DOB} onChange={(d) => setDOB(d)} />
      <Dropdown 
        value={skill}
        options={["Batsman", "Bowler", "Alrounder"]} 
        onChange={(e) => {handleChange(e, setSkill, false)}} 
        placeholder="Select bowler/batman123" />
      <Dropdown 
        value={country}
        options={["India", "Pakistan", "Westindies", "Srilanka"]} 
        onChange={(e) => {handleChange(e, setCountry, false)}} 
        placeholder="Select country" />
      <textarea name="player bio" rows="5" cols="50" onChange={(e) => {handleChange(e, setBio)}} />
      <input 
        type="file" 
        id="files" 
        className="file-uploader"
        onChange= {(e) => {setImage(e.target.files[0])}}/>
      <label 
        className="custom-button btn btn-primary uploader-label" 
        htmlFor="files">
        Select file</label>
      <CustomButton isLoading={isLoading} text="Save" type="submit"/>
    </form>
  )
}

const mapStateToProps = state => {
  return {
    isLoading: state.formReducer.isLoading,
    successMessage: state.formReducer.successMessage,
    error: state.formReducer.error
  }
}

export default connect(mapStateToProps, {
  uploadImage
})(ImageUploader);


