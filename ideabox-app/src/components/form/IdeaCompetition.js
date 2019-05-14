import React, { Component } from "react";

class IdeaCompetition extends Component {
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
      <div className={"ideaForm"}>
        <form>
          <div>
            <h3>Competition</h3>
            <label htmlFor="competition">
              Are there any other products trying to solve the same problem?
            </label>
            <textarea
              style={{ width: "100%" }}
              rows="6"
              name="competition"
              value={values.competition}
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
export default IdeaCompetition;
