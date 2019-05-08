import React, { Component } from "react";
import IdeaDescription from "./IdeaDescription";
import IdeaNeedBenefit from "./IdeaNeedBenefit";

export default class IdeaForm extends Component {
  state = {
    step: 1,
    title: "",
    category: 0,
    description: "",
    files: [],
    need: "",
    estimatedResource: ""
  };
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  handleChange = input => event => {
    if (input === "category") {
      this.setState({
        category: event.target.value
      });
    } else {
      this.setState({
        [input]: event.target.value
      });
    }
  };
  handleResourceChange = event => {
    event.preventDefault();
    const { value } = event.target.value;
    this.setState({
      estimatedResource: value
    });
  };

  render() {
    const { step } = this.state;
    const {
      title,
      category,
      description,
      files,
      need,
      estimatedResources
    } = this.state;
    const values = {
      title,
      category,
      description,
      files,
      need,
      estimatedResources
    };
    switch (step) {
      case 1:
        return (
          <IdeaDescription
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 2:
        return (
          <IdeaNeedBenefit
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            estimatedResourcesList={this.state.estimatedResourcesList}
            handleResourceChange={this.handleResourceChange}
            handleChange={this.handleChange}
            values={values}
          />
        );
      default:
        return console.log("error");
    }
  }
}
