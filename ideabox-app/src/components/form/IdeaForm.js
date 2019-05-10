import React, { Component } from "react";
import IdeaDescription from "./IdeaDescription";
import IdeaNeedBenefit from "./IdeaNeedBenefit";
import IdeaCompetition from "./IdeaCompetition";
import AddTeam from "./AddTeam";
import IdeaPrivacy from "./IdeaPrivacy";
import IdeaPreview from "./IdeaPreview";
import { submitIdea, fileUpload } from "../../services/ideaSubmission";
import { getUsers } from "../../services/ideaSubmission";
import { createDraft, updateDraft } from "../../services/drafts";

export default class IdeaForm extends Component {
  state = {
    users: [],
    step: 1,
    title: "",
    category: "",
    description: "",
    files: [],
    fileNames: [],
    need: "",
    competition: "",
    benefit: "",
    draftId: "",
    estimatedResources: [],
    estimatedResource: [],
    teamMembers: [],
    teamMemberMessage: "",
    ideaPrivacy: ""
  };
  getUserList = () => {
    getUsers().then(response => {
      this.setState({
        users: response
      });
    });
  };
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };
  handleDraft = event => {
    const {
      title,
      category,
      description,
      files,
      need,
      benefit,
      competition,
      estimatedResources,
      ideaPrivacy,
      teamMembers
    } = this.state;
    const values = {
      title,
      category,
      description,
      files,
      need,
      benefit,
      competition,
      estimatedResources,
      ideaPrivacy,
      teamMembers
    };
    if (this.state.draftId !== "") {
      console.log(this.state.draftId);
      updateDraft(this.state.draftId, values).then({});
    } else {
      createDraft(values).then(draft => {
        const { _id } = draft.data;
        this.setState({
          draftId: _id
        });
      });
    }
  };
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  handleFileUpload = event => {
    const fileName = event.target.files[0].name;
    const file = event.target.files[0];
    const data = new FormData();
    data.append("files", file);
    fileUpload(data).then(response => {
      this.setState({
        files: [...this.state.files, response],
        fileNames: [...this.state.fileNames, fileName]
      });
    });
  };
  handleFileRemove = index => {
    const newFileList = this.state.files.slice(index + 1);
    const newFileNameList = this.state.fileNames.slice(index + 1);
    this.setState({
      files: newFileList,
      fileNames: newFileNameList
    });
  };
  handleCategoryChange = (e, { value }) => {
    this.setState({
      category: value
    });
  };
  handlePrivacyChange = (e, { value }) => {
    this.setState({
      ideaPrivacy: value
    });
  };
  handleTeamChange = (e, option) => {
    const { value } = option;
    this.setState({
      teamMembers: value
    });
  };

  handleChange = input => event => {
    this.setState({
      [input]: event.target.value
    });
  };

  handleResourceChange = event => {
    event.preventDefault();
    console.log(event);
    const { value } = event.target;
    console.log(event.key);
    if (value.includes(",")) {
      const newValue = value.slice(0, -1);
      this.setState({
        estimatedResources: [...this.state.estimatedResources, newValue],
        estimatedResource: ""
      });
    } else {
      this.setState({
        estimatedResource: value
      });
    }
  };

  handleResourceRemove = index => {
    const newResourceList = this.state.estimatedResources.slice(index + 1);
    console.log(index, newResourceList);
    this.setState({
      estimatedResources: newResourceList
    });
  };
  submitForm = event => {
    event.preventDefault();
    const {
      title,
      category,
      description,
      files,
      need,
      benefit,
      competition,
      estimatedResources,
      ideaPrivacy,
      teamMembers
    } = this.state;
    submitIdea(
      title,
      category,
      description,
      files,
      need,
      benefit,
      competition,
      estimatedResources,
      ideaPrivacy,
      teamMembers
    ).then(idea => {
      console.log(idea);
    });
  };

  render() {
    const { step } = this.state;
    const {
      title,
      category,
      description,
      files,
      fileNames,
      need,
      benefit,
      competition,
      teamMembers,
      teamMemberMessage,
      estimatedResource,
      estimatedResources,
      ideaPrivacy
    } = this.state;
    const values = {
      title,
      category,
      description,
      competition,
      teamMembers,
      files,
      fileNames,
      need,
      benefit,
      teamMemberMessage,
      estimatedResource,
      estimatedResources,
      ideaPrivacy
    };
    switch (step) {
      case 1:
        return (
          <IdeaDescription
            nextStep={this.nextStep}
            handleCategoryChange={this.handleCategoryChange}
            handleChange={this.handleChange}
            values={values}
            handleDraft={this.handleDraft}
            handleFileUpload={this.handleFileUpload}
            handleFileRemove={this.handleFileRemove}
          />
        );
      case 2:
        return (
          <IdeaNeedBenefit
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleDraft={this.handleDraft}
            handleResourceChange={this.handleResourceChange}
            handleResourceRemove={this.handleResourceRemove}
            handleChange={this.handleChange}
            handlexChange={this.handlexChange}
            values={values}
          />
        );
      case 3:
        return (
          <IdeaCompetition
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleDraft={this.handleDraft}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 4:
        return (
          <AddTeam
            draftId={this.draftId}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            getUserList={this.getUserList}
            users={this.state.users}
            handleDraft={this.handleDraft}
            handleTeamChange={this.handleTeamChange}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 5:
        return (
          <IdeaPrivacy
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleDraft={this.handleDraft}
            handlePrivacyChange={this.handlePrivacyChange}
            handleResourceChange={this.handleResourceChange}
            values={values}
          />
        );
      case 6:
        return (
          <IdeaPreview
            values={values}
            submitForm={this.submitForm}
            prevStep={this.prevStep}
            handleDraft={this.handleDraft}
          />
        );
      default:
        return console.log("error");
    }
  }
}
