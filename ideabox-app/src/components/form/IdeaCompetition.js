import React, { Component } from "react";

export default class IdeaCompetition extends Component {
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
          <div>
            <h3>Competition</h3>
            <label htmlFor="need">
              Are there any other products trying to solve the same problem?
            </label>
            <textarea
              type="TextArea"
              name="competition"
              value={values.competition}
              onChange={this.props.handleChange("competition")}
            />
          </div>
          <button onClick={this.prevStep}>Back</button>
          <button onClick={this.props.handleDraft}>Save as draft</button>
          <button onClick={this.nextStep}>Next</button>
        </form>
      </div>
    );
  }
}
