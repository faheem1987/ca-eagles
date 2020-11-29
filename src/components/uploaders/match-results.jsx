import React, { useState } from 'react';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import FormInput from '../common/form-input';
import CustomButton from '../common/custom-button';
import AlertSection from '../common/alert';

import { postMatchResult } from '../../store/form/form.actions';

const MatchResults = (props) => {
  const { isLoading, successMessage, error } = props;
  const [matchDate, setMatchDate] = useState(new Date());
  const [looser, setLooser] = useState("");
  const [winner, setWinner] = useState("");
  const [scoreboard, setScoreBoardURL] = useState("");

  const handleChange = (e, func) => 
    func(e.target.value);


  const onSubmit = (e) => {
    e.preventDefault();
    props.postMatchResult({matchDate, looser, winner, url: scoreboard});
    setMatchDate(new Date());
    setLooser("");
    setWinner("");
    setScoreBoardURL("");
  }

  return (
    <form className="uploader match-results-uploader" onSubmit={onSubmit}>
      <h4>BACA Winter 2020/2021</h4>
      {(successMessage || error) &&
        <AlertSection successMessage={successMessage} error={error} />
      }
      <DatePicker selected={matchDate} onChange={(d) => setMatchDate(d)} />
      <FormInput 
        type="text" 
        name='winner' 
        value={winner} 
        handleChange={(e) => handleChange(e, setWinner)}
        label='Winner'
        required
      />
      
      <FormInput 
        type="text" 
        name='looser' 
        value={looser} 
        handleChange={(e) => handleChange(e, setLooser)}
        label='Looser'
        required
      />
      <FormInput 
        type="text" 
        name="scoreboard"
        value={scoreboard} 
        handleChange={(e) => handleChange(e, setScoreBoardURL)}
        label='Scoreboard'
        required
      />
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

export default connect(mapStateToProps, 
  {
    postMatchResult
  })(MatchResults);