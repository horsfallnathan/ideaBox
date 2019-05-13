import React, { Component } from "react";
import IdeaDescription from "./IdeaDescription";
import IdeaNeedBenefit from "./IdeaNeedBenefit";
import IdeaCompetition from "./IdeaCompetition";
import AddTeam from "./AddTeam";
import IdeaPrivacy from "./IdeaPrivacy";
import IdeaPreview from "./IdeaPreview";
import {
  submitIdea,
  fileUpload,
  getUsers,
  editIdea
} from "../../services/ideaSubmission";
import { createDraft, updateDraft } from "../../services/drafts";
import { getIdeaToEdit } from "../../services/ideas";

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
    message: "",
    privacy: true
  };
  componentDidMount() {
    this.props.match.params.ideaId &&
      getIdeaToEdit(this.props.match.params.ideaId).then(response => {
        const {
          title,
          challenge,
          category,
          description,
          files,
          need,
          benefit,
          estimatedResources,
          competition,
          teamMembers,
          message,
          privacy
        } = response.data;
        this.setState({
          title,
          challenge,
          category,
          description,
          files,
          need,
          benefit,
          estimatedResources,
          competition,
          teamMembers,
          message,
          privacy
        });
      });
  }
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
      challenge,
      category,
      description,
      files,
      need,
      benefit,
      estimatedResources,
      competition,
      teamMembers,
      message,
      privacy
    } = this.state;
    const values = {
      title,
      challenge,
      category,
      description,
      files,
      need,
      benefit,
      estimatedResources,
      competition,
      teamMembers,
      message,
      privacy
    };
    if (this.state.draftId !== "") {
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

  editForm = () => {
    console.log(this.state);
    const {
      title,
      challenge,
      category,
      description,
      files,
      need,
      benefit,
      estimatedResources,
      competition,
      teamMembers,
      message,
      privacy
    } = this.state;
    const values = {
      title,
      challenge,
      category,
      description,
      files,
      need,
      benefit,
      estimatedResources,
      competition,
      teamMembers,
      message,
      privacy
    };
    editIdea(this.props.match.params.ideaId, values).then(response => {
      console.log(this.props.match.params.ideaId, response);
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
    const bool = value === "true" ? true : false;
    console.log(bool);
    this.setState({
      privacy: bool
    });
  };
  handleTeamChange = (e, option) => {
    const { value } = option;
    this.setState({
      teamMembers: value
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    console.log("TCL: name, value", name, value);

    this.setState({
      [name]: value
    });
  };

  handleResourceChange = event => {
    // event.preventDefault();
    const { value } = event.target;
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
      challenge,
      category,
      description,
      files,
      need,
      benefit,
      estimatedResources,
      competition,
      teamMembers,
      message,
      privacy
    } = this.state;
    submitIdea(
      title,
      challenge,
      category,
      description,
      files,
      need,
      benefit,
      estimatedResources,
      competition,
      teamMembers,
      message,
      privacy
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
      message,
      estimatedResource,
      estimatedResources,
      privacy
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
      message,
      estimatedResource,
      estimatedResources,
      privacy
    };

    switch (step) {
      case 1:
        return (
          <div
            className={"main-container flexed-div flexed-col verticalCenter"}
          >
            <div className={"ideaForm"}>
              <h1>Idea Submission</h1>
            </div>
            <IdeaDescription
              nextStep={this.nextStep}
              handleCategoryChange={this.handleCategoryChange}
              handleChange={this.handleChange}
              values={values}
              handleDraft={this.handleDraft}
              handleFileUpload={this.handleFileUpload}
              handleFileRemove={this.handleFileRemove}
            />
          </div>
        );
      case 2:
        return (
          <div
            className={"main-container flexed-div flexed-col verticalCenter"}
          >
            <div className={"ideaForm"}>
              <h1>Idea Submission</h1>
            </div>
            <IdeaNeedBenefit
              nextStep={this.nextStep}
              prevStep={this.prevStep}
              handleDraft={this.handleDraft}
              handleResourceChange={this.handleResourceChange}
              handleResourceRemove={this.handleResourceRemove}
              handleChange={this.handleChange}
              values={values}
            />
          </div>
        );
      case 3:
        return (
          <div
            className={"main-container flexed-div flexed-col verticalCenter"}
          >
            <div className={"ideaForm"}>
              <h1>Idea Submission</h1>
            </div>
            <IdeaCompetition
              nextStep={this.nextStep}
              prevStep={this.prevStep}
              handleDraft={this.handleDraft}
              handleChange={this.handleChange}
              values={values}
            />
          </div>
        );
      case 4:
        return (
          <div
            className={"main-container flexed-div flexed-col verticalCenter"}
          >
            <div className={"ideaForm"}>
              <h1>Idea Submission</h1>
            </div>
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
          </div>
        );
      case 5:
        return (
          <div
            className={"main-container flexed-div flexed-col verticalCenter"}
          >
            <div className={"ideaForm"}>
              <h1>Idea Submission</h1>
            </div>
            <IdeaPrivacy
              nextStep={this.nextStep}
              prevStep={this.prevStep}
              handleDraft={this.handleDraft}
              handlePrivacyChange={this.handlePrivacyChange}
              handleResourceChange={this.handleResourceChange}
              values={values}
            />
          </div>
        );
      case 6:
        return !this.props.match.params.ideaId ? (
          <div
            className={"main-container flexed-div flexed-col verticalCenter"}
          >
            <div className={"ideaForm"}>
              <h1>Idea Submission</h1>
            </div>
            <IdeaPreview
              values={values}
              submitForm={this.submitForm}
              prevStep={this.prevStep}
              handleDraft={this.handleDraft}
            />
          </div>
        ) : (
          <div
            className={"main-container flexed-div flexed-col verticalCenter"}
          >
            <div className={"ideaForm"}>
              <h1>Idea Submission</h1>
            </div>
            <IdeaPreview
              values={values}
              submitForm={this.editForm}
              prevStep={this.prevStep}
              handleDraft={this.handleDraft}
            />
          </div>
        );
      default:
        return console.log("error");
    }
  }
}
