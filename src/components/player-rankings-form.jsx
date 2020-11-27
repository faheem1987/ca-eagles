import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Dropdown from 'react-dropdown'
import FormInput from './form-input';
import CustomButton from './custom-button';

import { postRankings } from '../store/form/form.actions';

class PlayerRankingsForm extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleSumbit = this.handleSumbit.bind(this);
    this.getRankings = this.getRankings.bind(this);
    this.state = {
      fullname: "",
      ranking: 0,
      rankings: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      type: ["Batsman", "Bowler"]
    }
  }

  handleChange(e) {
    const { value, name } = e.target;
    this.setState({ [name]: value })
  }

  onChange(option) {
    this.setState({ranking: option.value})
  }

  handleSumbit(e) {
    const { fullname, ranking } = this.state;
    e.preventDefault();
    this.props.postRankings({fullname, ranking})
  }

  getRankings() {
    const rankings = this.state.rankings.filter(r => !(this.props.batters || []).some(({ranking}) => r === ranking))
    return rankings;
  }

  render() {
    return (
      <div className="players-ranking-form">
        <FormInput 
          type="text" 
          name='fullname' 
          value={this.state.fullname} 
          handleChange={this.handleChange}
          label='Full Name'
          required
        />
        <Dropdown 
          options={this.getRankings()} 
          onChange={this.onChange} 
          placeholder="Select ranking" />
        <Dropdown 
          options={this.state.type} 
          onChange={() => {}} 
          placeholder="Select type" />
        <CustomButton className="btn btn-primary" onClick={this.handleSumbit}>
          Save
        </CustomButton>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    batters: state.firestore.ordered.battersRanking
  }
}

export default compose(
  connect(mapStateToProps, {
    postRankings
  }),
  firestoreConnect([{
    collection: 'battersRanking'
  }])
)(PlayerRankingsForm);
