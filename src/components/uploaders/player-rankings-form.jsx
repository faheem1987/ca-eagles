import React, { useState } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Dropdown from "react-dropdown";
import AlertSection from "../common/alert";
import FormInput from "../common/form-input";
import CustomButton from "../common/custom-button";

import { postRankings } from "../../store/form/form.actions";

const PlayerRankingsForm = (props) => {
  const {
    batters,
    bowlers,
    postRankings,
    isLoading,
    successMessage,
    error,
  } = props;
  const rankingList = ["1", "2", "3", "4", "5"];
  const [fullname, setFullname] = useState("");
  const [rankings, setRankings] = useState(rankingList);
  const [rankingDefaultValue, setRankingDefaultValue] = useState(
    "Select ranking"
  );
  const [typeDefaultValue, setTypeDefaultValue] = useState(
    "Select bowler/batman"
  );

  const handleChange = (e, func) => {
    const { value } = e.target;
    func(value);
  };

  const onChange = (option, ranking = null) => {
    const v = option.value;
    if (!ranking) {
      const updateRankings = (type) =>
        (rankingList || []).filter(
          (r) => !(type || []).some(({ ranking }) => r === ranking)
        );
      v === "Batsman"
        ? setRankings(updateRankings(batters))
        : setRankings(updateRankings(bowlers));
    }

    return ranking ? setRankingDefaultValue(v) : setTypeDefaultValue(v);
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    postRankings(
      { fullname, ranking: rankingDefaultValue },
      typeDefaultValue
    ).then(() => {
      setFullname("");
      setRankingDefaultValue("Select ranking");
      setTypeDefaultValue("Select bowler/batman");
    });
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
        handleChange={(e) => handleChange(e, setFullname)}
        label="Player Full Name"
        required
      />
      <Dropdown
        value={typeDefaultValue}
        options={["Batsman", "Bowler"]}
        onChange={(option) => onChange(option)}
        placeholder="Select bowler/batman123"
      />

      <Dropdown
        value={rankingDefaultValue}
        disabled={typeDefaultValue === "Select bowler/batman"}
        options={rankings}
        onChange={(option) => onChange(option, "ranking")}
        placeholder="Select ranking123"
      />

      <CustomButton text="Save" isLoading={isLoading} type="submit" />
    </form>
  );
};

const mapStateToProps = (state) => ({
  batters: state.firestore.ordered.battersRanking,
  bowlers: state.firestore.ordered.bowlersRanking,
  isLoading: state.formReducer.isLoading,
  successMessage: state.formReducer.successMessage,
  error: state.formReducer.error,
});

export default compose(
  connect(mapStateToProps, {
    postRankings,
  }),
  firestoreConnect([
    {
      collection: "battersRanking",
    },
    {
      collection: "bowlersRanking",
    },
  ])
)(PlayerRankingsForm);
