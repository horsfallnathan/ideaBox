import React, { Component } from "react";
import CreatableSelect from "react-select/lib/Creatable";
import makeAnimated from "react-select/lib/animated";

// const components = {
//   DropdownIndicator: null,
//   makeAnimated: makeAnimated()
// };

const colorStyles = {
  control: styles => ({
    ...styles,
    backgroundColor: "white",
    borderColor: "#40aaaa",
    borderRadius: "2px",
    ":onFocus": {
      backgroundColor: "black"
    },
    ":hover": {
      borderColor: "#40aaaa"
    }
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
            <CreatableSelect
              className={"margin-top-15"}
              components={makeAnimated()}
              inputValue={values.estimatedResource}
              isClearable
              isMulti
              menuIsOpen={false}
              onChange={this.props.handleResourceChange}
              onInputChange={this.props.handleInputChange}
              onKeyDown={this.props.handleKeyDown}
              placeholder="Type something and press enter..."
              value={values.estimatedResources}
              styles={colorStyles}
              theme={theme => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary: "#40aaaa"
                }
              })}
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

export default IdeaNeedBenefit;
