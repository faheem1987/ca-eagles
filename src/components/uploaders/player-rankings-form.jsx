import React, { useState } from "react";
import { connect } from "react-redux";
import Dropdown from "react-dropdown";
import AlertSection from "../common/alert";
import FormInput from "../common/form-input";
import CustomButton from "../common/custom-button";

import { postRankings } from "../../store/form/form.actions";

const PlayerRankingsForm = (props) => {
  const { postRankings, isLoading, successMessage, error } = props;

  const [state, setState] = useState({
    fullname: "",
    type: "",
    wickets: "",
    runs: "",
  });

  const handleChange = (v, feild) => {
    setState({
      ...state,
      [feild]: v,
    });
  };

  const onChange = (v) => {
    setState({
      ...state,
      type: v,
    });
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    postRankings({
      ...state,
    });
  };
  const { fullname, type, runs, wickets } = state;
  const isBatsman = type === "Batsman";

  const getLabel = () => {
    if (!type) {
      return "Enter runs/wickets";
    }
    if (type === "Batsman") {
      return "Enter total runs scored in current series";
    }

    return "Enter total wickets taken in current series";
  };

  return (
    <form className="players-ranking-form uploader" onSubmit={handleSumbit}>
      {(successMessage || error) && (
        <AlertSection successMessage={successMessage} error={error} />
      )}

      <FormInput
        type="text"
        name="fullname"
        value={fullname}
        handleChange={({ target }) => handleChange(target.value, "fullname")}
        label="Player Full Name"
        required
      />
      <Dropdown
        value={type}
        options={["Batsman", "Bowler"]}
        onChange={(option) => onChange(option.value)}
        placeholder="Select bowler/batman"
      />
      <FormInput
        type="text"
        value={isBatsman ? runs : wickets}
        handleChange={({ target }) =>
          handleChange(target.value, isBatsman ? "runs" : "wickets")
        }
        label={getLabel()}
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
  postRankings,
})(PlayerRankingsForm);
