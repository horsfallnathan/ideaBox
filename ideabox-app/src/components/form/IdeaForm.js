import React, { Component } from "react";
import IdeaDescription from "./IdeaDescription";
import IdeaNeedBenefit from "./IdeaNeedBenefit";
import IdeaCompetition from "./IdeaCompetition";
import AddTeam from "./AddTeam";
import IdeaPrivacy from "./IdeaPrivacy";
import IdeaPreview from "./IdeaPreview";

export default class IdeaForm extends Component {
  state = {
    step: 1,
    title: "",
    category: 0,
    description: "",
    files: [],
    need: "",
    competition: "",
    benefit: "",
    estimatedResource: "",
    teamMember: [],
    teamMemberMessage: [],
    ideaPrivacy: ""
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
    console.log(event.target);
  };

  render() {
    const { step } = this.state;
    const {
      title,
      category,
      description,
      files,
      need,
      benefit,
      competition,
      estimatedResources,
      ideaPrivacy
    } = this.state;
    const values = {
      title,
      category,
      description,
      competition,
      files,
      need,
      benefit,
      estimatedResources,
      ideaPrivacy
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
            handleResourceChange={this.handleResourceChange}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 3:
        return (
          <IdeaCompetition
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 4:
        return (
          <AddTeam
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 5:
        return (
          <IdeaPrivacy
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleResourceChange={this.handleResourceChange}
            values={values}
          />
        );
      case 6:
        return <IdeaPreview values={values} />;
      default:
        return console.log("error");
    }
  }
}
