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
import { currentChallenge } from "../../services/challenge";

const createOption = label => ({
  label,
  value: label
});

export default class IdeaForm extends Component {
  state = {
    users: [],
    challengeValue: "",
    challenge: "",
    challengeName: "",
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
    estimatedResource: "",
    teamMember: "",
    teamMembers: [],
    message: "",
    privacy: ""
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
      const users = response.map(user => {
        return {
          firstName: user.firstName,
          lastName: user.lastName,
          id: user._id
        };
      });
      this.setState({
        users
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
      console.log("here");
      updateDraft(this.state.draftId, values).then({});
    } else {
      createDraft(values).then(draft => {
        console.log("second here");
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

  addCurrentChallenge = event => {
    const { name, value } = event.target;
    if (value === "Innovation Challenge") {
      currentChallenge().then(response => {
        response.data
          ? this.setState({
              challenge: response.data._id,
              [name]: value,
              challengeName: response.data.title
            })
          : alert("No current Challenge");
      });
    }
    if (value === "Free Idea") {
      this.setState({
        [name]: value
      });
    }
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

  handleTeamChange = (value, actionMeta) => {
    this.setState({
      teamMembers: value
    });
  };
  handleTeamInputChange = inputValue => {
    this.setState({
      teamMember: inputValue
    });
  };
  handleTeamKeyDown = event => {
    const { teamMember, teamMembers } = this.state;
    if (!teamMember) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        this.setState({
          teamMember: "",
          teamMembers: [...teamMembers.value]
        });
        event.preventDefault();
        break;
      default:
    }
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleKeyDown = event => {
    const { estimatedResource, estimatedResources } = this.state;
    if (!estimatedResource) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        this.setState({
          estimatedResource: "",
          estimatedResources: [
            ...estimatedResources,
            createOption(estimatedResource)
          ]
        });
        event.preventDefault();
        break;
      default:
    }
  };

  handleResourceChange = (value, actionMeta) => {
    this.setState({
      estimatedResources: value
    });
  };
  handleInputChange = inputValue => {
    this.setState({
      estimatedResource: inputValue
    });
  };

  submitForm = event => {
    event.preventDefault();
    this.showAlert(event);
    const estimatedResources = this.state.estimatedResources.map(el => {
      return el.value;
    });
    const teamMembers = this.state.teamMembers.map(el => {
      return el.value;
    });
    const {
      title,
      challenge,
      category,
      description,
      files,
      need,
      benefit,
      competition,
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
    ).then(idea => {});
  };

  render() {
    const { step } = this.state;
    const {
      title,
      category,
      challengeName,
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
      privacy,
      vertical,
      horizontal,
      open
    } = this.state;
    const values = {
      vertical,
      horizontal,
      open,
      title,
      category,
      challengeName,
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
            className={
              "main-container flexed-div flexed-col verticalCenter marginBelowNavbar"
            }
          >
            <div className={"ideaForm"}>
              <h1>Idea Submission</h1>
            </div>
            <IdeaDescription
              nextStep={this.nextStep}
              handleCategoryChange={this.handleCategoryChange}
              handleChange={this.handleChange}
              values={values}
              addCurrentChallenge={this.addCurrentChallenge}
              handleDraft={this.handleDraft}
              handleFileUpload={this.handleFileUpload}
              handleFileRemove={this.handleFileRemove}
            />
          </div>
        );
      case 2:
        return (
          <div
            className={
              "main-container flexed-div flexed-col verticalCenter marginBelowNavbar"
            }
          >
            <div className={"ideaForm"}>
              <h1>Idea Submission</h1>
            </div>
            <IdeaNeedBenefit
              nextStep={this.nextStep}
              prevStep={this.prevStep}
              handleDraft={this.handleDraft}
              handleInputChange={this.handleInputChange}
              handleKeyDown={this.handleKeyDown}
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
            className={
              "main-container flexed-div flexed-col verticalCenter marginBelowNavbar"
            }
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
            className={
              "main-container flexed-div flexed-col verticalCenter marginBelowNavbar"
            }
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
              handleChange={this.handleChange}
              handleDraft={this.handleDraft}
              handleTeamChange={this.handleTeamChange}
              handleTeamInputChange={this.handleTeamInputChange}
              handleTeamKeyDown={this.handleTeamKeyDown}
              values={values}
            />
          </div>
        );
      case 5:
        return (
          <div
            className={
              "main-container flexed-div flexed-col verticalCenter marginBelowNavbar"
            }
          >
            <div className={"ideaForm"}>
              <h1>Idea Submission</h1>
            </div>
            <IdeaPrivacy
              nextStep={this.nextStep}
              prevStep={this.prevStep}
              handleDraft={this.handleDraft}
              handleChange={this.handleChange}
              values={values}
            />
          </div>
        );
      case 6:
        return !this.props.match.params.ideaId ? (
          <div
            className={
              "main-container flexed-div flexed-col verticalCenter marginBelowNavbar"
            }
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
            className={
              "main-container flexed-div flexed-col verticalCenter marginBelowNavbar"
            }
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
        );
      default:
        return console.log("error");
    }
  }
}
