import React, { Component } from "react";

export default class IdeaNeedBenefit extends Component {
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
            <h3>Need</h3>
            <label htmlFor="need">Who is the target group for your idea?</label>
            <input
              type="text"
              name="need"
              value={values.need}
              onChange={this.props.handleChange("need")}
            />
          </div>
          <div>
            <h3>Benefit</h3>
            <label htmlFor="benefit">
              How will the idea benefit this target group? What is the impact of
              your idea for the company?
            </label>
            <textarea
              type="TextArea"
              name="benefit"
              value={values.benefit}
              onChange={this.props.handleChange("benefit")}
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
                    <ul key={i}>
                      <li>{resource}</li>
                      <li>{i}</li>
                      <li>
                        <button
                          onClick={() => this.props.handleResourceRemove(i)}
                        >
                          Delete
                        </button>
                      </li>
                    </ul>
                  );
                })}
            </div>
          </div>
          <button onClick={this.prevStep}>Back</button>
          <button onClick={this.props.handleDraft}>Save as draft</button>
          <button onClick={this.nextStep}>Next</button>
        </form>
      </div>
    );
  }
}
