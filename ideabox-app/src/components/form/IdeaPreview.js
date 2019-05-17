import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

export default class IdeaPreview extends Component {
  state = {
    open: false,
    redirect: false
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false, redirect: true });
  };

  internalSubmit = event => {
    this.props.submitForm(event);
    this.handleClick();
  };

  render() {
    const redirectDashboard = this.state.redirect;
    if (redirectDashboard === true) {
      return (
        <Redirect
          to={{
            pathname: "/dashboard",
            state: this.props.location
          }}
        />
      );
    }

    const {
      values: {
        title,
        category,
        challengeName,
        description,
        need,
        benefit,
        fileNames,
        estimatedResources,
        teamMembers,
        message,
        privacy,
        competition
      }
    } = this.props;
    return (
      <div
        className={
          "main-container flexed-div flexed-col verticalCenter marginBelowNavbar"
        }
      >
        <div className={"ideaForm margin-top-30 margin-bot-30"}>
          <h1>Idea Submission</h1>
        </div>
        <div className="ideaForm">
          <h3>Title</h3>
          <p>{title}</p>
          <h3>Category</h3>
          <p>
            {category}: {challengeName}
          </p>
          <h3>Description</h3>
          <p>{description}</p>
          <h3>Need</h3>
          <p>{need}</p>
          <h3>Benefit</h3>
          <p>{benefit}</p>
          <h3>Estimated Resources</h3>
          {estimatedResources &&
            estimatedResources.map((resource, i) => {
              return <p key={i}>{`${i + 1}: ${resource.value}`}</p>;
            })}
          <h3>Competition</h3>
          <p>{competition}</p>
          <h3>Team Members</h3>
          {teamMembers &&
            teamMembers.map((name, i) => {
              return <p key={i}>{`${i + 1}: ${name.label}`}</p>;
            })}
          <h3>Message</h3>
          <p>{message}</p>
          <h3>Visibility</h3>
          <p>{privacy}</p>
          <h3>Attached Files</h3>
          <p>{fileNames}</p>
          <p>{this.props.first}</p>
          <div className={"flexed-div spacedBetween margin-top-15"}>
            <div className={"flexed-div flexed-end"}>
              <button
                className={"ideaFormButton"}
                onClick={this.props.prevStep}
              >
                Edit Form
              </button>
              <button
                className={"ideaFormButton margin-left-15"}
                onClick={this.props.handleDraft}
              >
                Save as draft
              </button>
            </div>
            <div>
              <button
                className={"ideaFormButton"}
                onClick={this.internalSubmit}
              >
                Submit Form
              </button>
            </div>
          </div>
          <div>
            <Snackbar
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={this.state.open}
              autoHideDuration={6000}
              onClose={this.handleClose}
              ContentProps={{
                "aria-describedby": "message-id"
              }}
              message={<span id="message-id">Awesome Idea Submitted!</span>}
              action={[
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  onClick={this.handleClose}
                >
                  <CloseIcon />
                </IconButton>
              ]}
            />
          </div>
        </div>
      </div>
    );
  }
}
