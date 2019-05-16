import React from "react";
import { currentChallenge } from "../../services/challenge";
import CurrentChallengeIdeas from "./CurrentChallengeIdeas";
import { Link, Redirect } from "react-router-dom";
import OpenIdeas from "./OpenIdeas";

class Dashboard extends React.Component {
  state = {
    currentChallenge: {},
    openView: false,
    leftBannerButtonState: "active",
    rightBannerButtonState: "inactive",
   
  };

  componentDidMount() {
    return this.props.user ? (
      <Redirect to={{ pathname: "/" }} />
    ) : (
        currentChallenge().then(currentChallengeInfo => {
          this.setState({ currentChallenge: currentChallengeInfo.data });
        })
      );
  }

  flipChallengeViewOpen = () => {
    this.setState({
      openView: true,
      leftBannerButton: false,
      rightBannerButton: true
    });
  };
  flipChallengeViewInnovation = () => {
    this.setState({
      openView: false,
      leftBannerButton: true,
      rightBannerButton: false
    });
  };

  
  render() {
    // // just to test
    // const value = {
    //   day: 5
    // };
    // const currentStage = "Development";
    // const upVotes = 6;
    // // just to test

    return (
      <React.Fragment>
        <div className={"dashboardBanner"}>
          <div className={"flexed-div marginBelowNavbar flexed-col"}>
            <div className="bannerButtonsDiv flexed-div spacedBetween width-100">
              <Link
                onClick={this.flipChallengeViewInnovation}
                className={`allLinks bannerButtons textCenter ${
                  this.state.leftBannerButton ? "active" : "inactive"
                  }`}
              >
                <h2>Innovation Challenge Idea Submissions</h2>
              </Link>
              <Link
                className={`allLinks bannerButtons textCenter ${
                  this.state.rightBannerButton ? "active" : "inactive"
                  }`}
                onClick={this.flipChallengeViewOpen}
              >
                <h2>Open Idea Submissions</h2>
              </Link>
            </div>
            {this.state.openView ? (
              <div>
                <OpenIdeas />
              </div>
            ) : (
                <CurrentChallengeIdeas
                  currentChallenge={this.props.currentChallenge}
                />
              )}
          </div>
          <div />
        </div>
      </React.Fragment>
    );
  }
}
export default Dashboard;

//             <>
//                 <div className="dashboard">
//                     <div className="headBar">
//                         <button>Innovation Challenge Idea Submissions</button>
//                         <button disabled> <Link to="/open-ideas">Open Idea Submissions</Link></button>
//                     </div>
//                     <div className="challengePres">
//                         <div className="main-container">
//                             <div className="challengePresInnerDiv">
//                                 <div className="challengePresKata">
//                                     <h2>#</h2>
//                                 </div>
//                                 <div className="challengePresTitleBtns">
//                                     <div className="challengePresTitle">

//                                         <h1>{this.state.currentChallenge && this.state.currentChallenge.title ? this.state.currentChallenge.title : "No current challenge"}</h1>

//                                     </div>
//                                     {this.state.currentChallenge && this.state.currentChallenge.title &&
//                                         <div className="challengePresBtns">
//                                             <button><Link to="/current-challenge-information">Read more</Link></button>
//                                             <button><Link to="/submit-idea">Submit Idea</Link></button>
//                                         </div>}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     {this.state.currentChallenge && this.state.currentChallenge.title && <CurrentChallengeIdeas currentChallenge={this.props.currentChallenge} />}
//                 </div>
//             </>
//         )
//     }
// }
