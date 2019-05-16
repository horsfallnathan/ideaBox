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
          <>
            <h2>{title}</h2>
            <p>{description}</p>
            <p>Start Date: {startDate && startDate.substring(0, 10)}</p>
            <p> Deadline: {deadline && deadline.substring(0, 10)} </p>
          </>
        </div>
      </div>
    );
  }
}

export default CurrentChallengeInfo;
