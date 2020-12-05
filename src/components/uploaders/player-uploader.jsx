import React, { useState } from "react";
import { connect } from "react-redux";
import Dropdown from "react-dropdown";
import CustomButton from "../common/custom-button";
import AlertSection from "../common/alert";
import FormInput from "../common/form-input";

import { uploadPlayer } from "../../store/form/form.actions";

const PlayerUploader = (props) => {
  const { uploadPlayer, successMessage, error, isLoading } = props;
  const helperObj = { value: "", error: null };
  const [state, setState] = useState({
    playerName: helperObj,
    DOB: helperObj,
    skill: helperObj,
    country: helperObj,
    bio: helperObj,
    image: helperObj,
    battingStyle: helperObj,
    bowlingStyle: helperObj,
    globalError: null,
    showBowlingStyle: false,
  });

  const validator = () => {
    const {
      playerName,
      skill,
      country,
      image,
      DOB,
      battingStyle,
      bowlingStyle,
    } = state;
    return [
      playerName,
      skill,
      country,
      image,
      DOB,
      battingStyle,
      bowlingStyle,
    ].filter((feild) => !feild.value);
  };

  const updateState = (updatedState) =>
    setState({
      ...state,
      ...updatedState,
    });

  const onSubmit = (e) => {
    e.preventDefault();
    const hasError = validator();
    const updatedState = {};
    if (hasError.length) {
      return (Object.keys(state) || []).forEach((key) => {
        if (key === "bio" || key === "globalError") return null;
        if (!state[key].value) {
          updatedState[key] = {
            value: state[key].value,
            error: true,
          };
          updateState({
            ...updatedState,
            globalError: "Please enter a value in highlighted feild/s",
          });
        }
      });
    }
    updateState({
      globalError: null,
    });

    const {
      playerName,
      DOB,
      skill,
      country,
      bio,
      image,
      battingStyle,
      bowlingStyle,
    } = state;

    return uploadPlayer({
      playerName: playerName.value,
      DOB: DOB.value,
      skill: skill.value,
      country: country.value,
      image: image.value,
      bio: bio.value,
      bowlingStyle: bowlingStyle.value,
      battingStyle: battingStyle.value,
    });
  };

  const handleChange = (v, stateType, isValidate) => {
    if (isValidate && !v.match(/^([a-zA-Z]+\s)*[a-zA-Z]+$/) && v !== "") {
      return setState({
        ...state,
        [stateType]: { value: null, error: "Please enter a valid value" },
      });
    }

    return setState({
      ...state,
      [stateType]: { value: v, error: null },
      ...((v === "Bowler" || v === "All-rounder") && {
        showBowlingStyle: true,
      }),
    });
  };
  const {
    playerName,
    DOB,
    skill,
    country,
    image,
    battingStyle,
    bowlingStyle,
    showBowlingStyle,
    globalError,
  } = state;
  return (
    <form className="uploader" onSubmit={onSubmit}>
      {(successMessage || error || globalError) && (
        <AlertSection
          successMessage={successMessage}
          error={error || globalError}
        />
      )}
      <FormInput
        className={playerName.error ? "danger" : ""}
        type="text"
        name="player name"
        value={playerName.value}
        handleChange={({ target }) => {
          handleChange(target.value, "playerName", true);
        }}
        error={playerName.error}
        label="Player name"
      />
      <input
        className={`input-picker ${DOB.error ? "danger" : ""}`}
        type="date"
        placeholder="DOB"
        onChange={({ target }) => {
          handleChange(target.value, "DOB");
        }}
      />
      <Dropdown
        className={skill.error ? "danger" : ""}
        value={skill.value}
        options={["Batsman", "Bowler", "All-rounder"]}
        onChange={({ value }) => {
          handleChange(value, "skill");
        }}
        placeholder="Select bowler/batman"
      />
      <Dropdown
        className={battingStyle.error ? "danger" : ""}
        value={battingStyle.value}
        options={["Right handed batter", "Left handed batter"]}
        onChange={({ value }) => {
          handleChange(value, "battingStyle");
        }}
        placeholder="Select batting style"
      />
      {showBowlingStyle && (
        <FormInput
          className={`${bowlingStyle.error ? "danger" : ""}`}
          type="text"
          name="bowling style"
          value={bowlingStyle.value}
          label="Enter bowling style"
          onChange={({ target }) => {
            handleChange(target.value, "bowlingStyle");
          }}
        />
      )}
      <Dropdown
        className={country.error ? "danger" : ""}
        value={country.value}
        options={["India", "Pakistan", "Westindies", "Srilanka", "USA"]}
        onChange={({ value }) => {
          handleChange(value, "country");
        }}
        placeholder="Select country"
      />
      <textarea
        name="player bio"
        rows="5"
        cols="50"
        onChange={({ target }) => {
          handleChange(target.value, "bio");
        }}
      />
      <input
        type="file"
        id="files"
        className={`file-uploader ${image.error ? "danger" : ""}`}
        onChange={({ target }) => {
          handleChange(target.files[0], "image");
        }}
      />
      <br />
      <br />
      <CustomButton
        isLoading={isLoading}
        text="Save"
        type="submit"
        className="p-uploder"
      />
    </form>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.formReducer.isLoading,
  successMessage: state.formReducer.successMessage,
  error: state.formReducer.error,
});

export default connect(mapStateToProps, {
  uploadPlayer,
})(PlayerUploader);
