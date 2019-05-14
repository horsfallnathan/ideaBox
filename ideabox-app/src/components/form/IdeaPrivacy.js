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
                <p className={"disabledTest"}>
                  {/* Ideas only related to the current innovation challenge */}
                </p>
              </RadioGroup>
            </FormControl>
            {/* <input
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
            /> */}
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
