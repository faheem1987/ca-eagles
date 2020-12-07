import React, { useState } from "react";
import emailjs from "emailjs-com";
import { init } from "emailjs-com";

import AlertSection from "../common/alert";
import FormInput from "../common/form-input";
import CustomButton from "../common/custom-button";
init("user_FEX32l7tsqYpI2AbKvmid");

const Contact = () => {
  const [state, setState] = useState({
    from_name: "",
    message: "",
    reply_to: "",
    from_skill: "",
    successMessage: "",
    errorMessage: "",
    isLoading: "",
  });

  const handleChange = (v, stateType) => {
    return setState({
      ...state,
      [stateType]: v,
    });
  };

  const onSubmit = (e) => {
    setState({ ...state, isLoading: true });
    e.preventDefault();
    emailjs
      .send("service_6olv4u7", "template_rjln01p", { ...state })
      .then(() =>
        setState({
          ...state,
          isLoading: false,
          successMessage:
            "Thanks for contacting us! We will get back to you within 24 hours.",
        })
      )
      .catch(() =>
        setState({
          ...state,
          isLoading: false,
          error: "Something went wrong, please try again!",
        })
      );
  };

  const {
    from_name,
    message,
    reply_to,
    from_skill,
    successMessage,
    error,
    isLoading,
  } = state;
  return (
    <div className="content">
      <form className="contact" onSubmit={onSubmit}>
        <h4>Contact Us</h4>
        {(successMessage || error) && (
          <AlertSection successMessage={successMessage} error={error} />
        )}
        <FormInput
          type="text"
          name="Your Name"
          value={from_name}
          handleChange={({ target }) => {
            handleChange(target.value, "from_name");
          }}
          label="Your Name"
        />
        <FormInput
          type="text"
          name="Your Email"
          value={reply_to}
          handleChange={({ target }) => {
            handleChange(target.value, "reply_to");
          }}
          label="Your Email"
        />
        <FormInput
          type="text"
          name="Skill"
          value={from_skill}
          handleChange={({ target }) => {
            handleChange(target.value, "from_skill");
          }}
          label="Batsman/Bowler/Allrounder"
        />
        <textarea
          rows="5"
          cols="50"
          name="Your Message"
          value={message}
          onChange={({ target }) => {
            handleChange(target.value, "message");
          }}
          label="Your Message"
        />
        <CustomButton
          isLoading={isLoading}
          text="Send"
          type="submit"
          className="contact-btn"
        />
      </form>
    </div>
  );
};

export default Contact;
