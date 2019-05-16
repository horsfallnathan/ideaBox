import React, { Component } from "react";
import Select from "react-select";
import makeAnimated from "react-select/lib/animated";

const customStyle = {
  control: styles => ({
    ...styles,
    backgroundColor: "white",
    marginTop: "1.5rem",
    marginBottom: "3rem",
    borderColor: "#40aaaa",
    borderRadius: "2px",
    ":onFocus": {
      backgroundColor: "black"
    },
    ":hover": {
      borderColor: "#40aaaa"
    }
  }),
  indicatorSeparator: styles => ({
    backgroundColor: "#ffffff"
  }),
  multiValue: (styles, { data }) => {
    return {
      ...styles,
      borderRadius: 50,
      padding: "0.5rem",
      backgroundColor: "#40aaaa"
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: "#ffffff"
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    borderRadius: 50,
    color: "white",
    ":hover": {
      backgroundColor: "#00646e",
      color: "white"
    }
  })
};

export default class AddTeam extends Component {
  nextStep = event => {
    event.preventDefault();
    this.props.nextStep();
  };
  prevStep = event => {
    event.preventDefault();
    this.props.prevStep();
  };
  componentWillMount() {
    this.props.getUserList();
  }
  render() {
    const { values } = this.props;
    const userList = this.props.users.map(el => {
      return { value: el.id, label: el.firstName };
    });
    console.log(userList);
    return (
      <div className={"ideaForm"}>
        <form>
          <div>
            <h3 style={{ marginBottom: "1rem" }}>Add Team Members</h3>
            <label htmlFor="teamMember">
              Choose team members to work with you on this idea
            </label>
            <Select
              closeMenuOnSelect={false}
              components={makeAnimated()}
              isMulti
              value={values.teamMembers}
              onInputChange={this.props.handleTeamInputChange}
              onKeyDown={this.props.handleTeamKeyDown}
              onChange={this.props.handleTeamChange}
              options={userList}
              styles={customStyle}
            />
            <label htmlFor="message">
              Leave them a message! They will receive it as soon as you submit
              your idea.
            </label>
            <textarea
              style={{ width: "100%" }}
              rows="6"
              type="TextArea"
              name="message"
              value={values.message}
              onChange={this.props.handleChange}
            />
          </div>
          <div className={"flexed-div spacedBetween margin-top-15"}>
            <button className={"ideaFormButton"} onClick={this.prevStep}>
              Back
            </button>
            <div className={"flexed-div flexed-end "}>
              <button
                className={"ideaFormButton"}
                onClick={this.props.handleDraft}
              >
                Save as draft
              </button>
              <button
                className={"ideaFormButton margin-left-15"}
                onClick={this.nextStep}
              >
                Next
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
