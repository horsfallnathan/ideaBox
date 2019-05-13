import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
// import Chip from "@material-ui/core/Chip";
// import PropTypes from "prop-types";
import CreatableSelect from "react-select/lib/Creatable";

const styles = theme => ({});
class IdeaNeedBenefit extends Component {
  nextStep = event => {
    event.preventDefault();
    this.props.nextStep();
  };
  prevStep = event => {
    event.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, handleChange, classes } = this.props;
    return (
      <div className={"ideaForm"}>
        <form>
          <div>
            <h3>Need</h3>
            <label htmlFor="need">Who is the target group for your idea?</label>
            <input
              type="text"
              name="need"
              value={values.need}
              onChange={handleChange}
            />
          </div>
          <div>
            <h3>Benefit</h3>
            <label htmlFor="benefit">
              How will the idea benefit this target group? What is the impact of
              your idea for the company?
            </label>
            <textarea
              style={{ width: "100%" }}
              rows="6"
              name="benefit"
              value={values.benefit}
              onChange={handleChange}
            />
          </div>
          <div>
            <h3>Estimated Resources</h3>
            <label htmlFor="estimatedResource">
              What resources do you think are needed to work on this idea?
            </label>
            <input
              type="text"
              name="estimatedResource"
              value={values.estimatedResource}
              onChange={this.props.handleResourceChange}
            />
            <div>
              {values.estimatedResources &&
                values.estimatedResources.map((resource, i) => {
                  return (
                    // <Chip
                    //   label={resource}
                    //   onDelete={() => this.props.handleResourceRemove(i)}
                    //   className={classes.chip}
                    //   color="secondary"
                    // />
                    <CreatableSelect
                      isMulti
                      // styles={colourStyles}
                      onChange={this.handleChange}
                      // options={colourOptions}
                    />
                  );
                })}
            </div>
          </div>
          <div className={"flexed-div spacedBetween"}>
            <button className={"ideaFormButton"} onClick={this.prevStep}>
              Back
            </button>
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
          </div>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(IdeaNeedBenefit);
