import React, { Component } from "react";
import { currentChallenge } from "../../services/challenge";

class CurrentChallengeInfo extends Component {
  state = {
    currentChallenge: []
  };

  componentDidMount() {
    currentChallenge().then(challengeInfo => {
      this.setState({ currentChallenge: challengeInfo.data });
    });
  }

  render() {
    const {
      title,
      description,
      startDate,
      deadline
    } = this.state.currentChallenge;
    return (
      <div className={"marginBelowNavbar main-container"}>
        <h1>Current Challenge Info</h1>
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
          <p>Start Date: {startDate}</p>
          <p> Deadline: {deadline} </p>
        </div>
      </div>
    );
  }
}

export default CurrentChallengeInfo;
