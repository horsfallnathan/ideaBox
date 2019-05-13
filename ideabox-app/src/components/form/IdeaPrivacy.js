import React, { Component } from "react";

export default class IdeaPrivacy extends Component {
  nextStep = event => {
    event.preventDefault();
    this.props.nextStep();
  };
  prevStep = event => {
    event.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values } = this.props;
    return (
      <div>
        <form>
          <h3>Who should see this idea?</h3>
          <div>
            <input
              label="Make Idea Public"
              name="ideaPrivacy"
              value="false"
              checked={!values.privacy}
              onChange={this.props.handlePrivacyChange}
            />
            <p>Your idea will be shared with all Siemens employees</p>
          </div>
          <div>
            <input
              label="Keep Idea Private"
              name="ideaPrivacy"
              value="true"
              checked={values.privacy}
              onChange={this.props.handlePrivacyChange}
            />
            <p>
              Only you, your selected team members, and managers can view this
            </p>
          </div>
          <button onClick={this.prevStep}>Back</button>
          <button onClick={this.props.handleDraft}>Save as draft</button>
          <button onClick={this.nextStep}>Next</button>
        </form>
      </div>
    );
  }
}
