import React, { Component } from 'react';
import { currentChallenge } from '../../services/challenge';

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
    const { title, description, startDate, deadline } = this.state.currentChallenge;
    return (
      <div className={'marginBelowNavbar main-container'}>
        <div className="flexed-div verticalCenter flexed-center fullvh">
          <div className="infoBox flexed-div flexed-col ">
            <h1>{title}</h1>

            <>
              <p className="infoBoxDescription">{description}</p>
              <div className="flexed-div spaceAround">
                <p>Start Date: {startDate && startDate.substring(0, 10)}</p>
                <p> Deadline: {deadline && deadline.substring(0, 10)} </p>
              </div>
            </>
          </div>
        </div>
      </div>
    );
  }
}

export default CurrentChallengeInfo;
