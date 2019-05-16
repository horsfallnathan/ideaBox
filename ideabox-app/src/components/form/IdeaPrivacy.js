import React, { Component } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

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
    const { values, handleChange } = this.props;
    return (
      <div className={"ideaForm"}>
        <form>
          <h3>Who should see this idea?</h3>
          <div>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="Privacy"
                name="privacy"
                value={values.privacy}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="Public"
                  control={<Radio />}
                  label={`Make Idea Public (Your Idea will be shared with all Siemens employees)`}
                />
                <FormControlLabel
                  value="Private"
                  control={<Radio />}
                  label="Keep Idea Private (Only you, your selected team members, and managers can view this)"
                />
              </RadioGroup>
            </FormControl>
            <p />
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
