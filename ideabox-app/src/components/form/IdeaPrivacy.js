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
      <div>
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
                  label="Make Idea Public"
                />
                {/* <p>Ideas only related to the current innovation challenge</p> */}
                <FormControlLabel
                  value="Private"
                  control={<Radio />}
                  label="Keep Idea Private"
                />
              </RadioGroup>
            </FormControl>
            <p>
              Only you, your selected team members, and managers can view this
            </p>
          </div>
          <div className={"flexed-div flexed-end"}>
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
        </form>
      </div>
    );
  }
}
