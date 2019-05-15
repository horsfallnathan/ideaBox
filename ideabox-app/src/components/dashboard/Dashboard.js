import React from "react";
import { currentChallenge } from "../../services/challenge";
import CurrentChallengeIdeas from "./CurrentChallengeIdeas";
import { Link } from "react-router-dom";

class Dashboard extends React.Component {
  state = {
    currentChallenge: {},
    filteredIdes: [],
    openView: false,
    leftBannerButtonState: "active",
    rightBannerButtonState: "inactive"
  };

  componentDidMount() {
    currentChallenge().then(currentChallengeInfo => {
      this.setState({ currentChallenge: currentChallengeInfo.data });
      console.log(currentChallengeInfo);
    });
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
    // just to test
    const value = {
      day: 5
    };
    const currentStage = "Development";
    const upVotes = 6;
    // just to test
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
                <h1>Show Something Elese oooo</h1>
              </div>
            ) : (
              <div className="flexed-div main-container flexed-wrap bannerContentCont flexed-center">
                <div className="challengeCountdown bannerContent flexed-div flexed-col textCenter">
                  <h1 style={{ fontSize: "72px", color: "#ffffff" }}>
                    {value.day}
                  </h1>
                  <h4 className="colorWhite">
                    {value.day === 1 ? "day" : "days"} left to submit
                  </h4>
                </div>
                <div className="bannerContent flexed-center">
                  <h1 className="colorWhite">
                    How can we find great talent for Siemens?
                  </h1>
                  <div className="flexed-div margin-top-15">
                    <button>
                      <Link
                        className="allLinks"
                        to="/current-challenge-information"
                      >
                        Read More
                      </Link>
                    </button>
                    <button className="margin-left-15">
                      <Link className="allLinks" to="/submit-idea">
                        Submit Idea
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div />
        </div>
        <main className="marginBelowNavbar main-container">
          <div className="flexed-div verticalCenter spacedBetween flexed-wrap">
            <h1>Discover Submitted Ideas</h1>
            <div>
              <input
                type="text"
                onchange={this.handleChange}
                placeholder="Sort"
              />
              <input
                className="margin-left-15"
                type="text"
                onchange={this.handleChange}
                placeholder="Search"
              />
            </div>
          </div>
          <div className="flexed-div flexed-wrap spacedBetween">
            <div className="ideaCard marginBelowNavbar flexed-div flexed-col col-45">
              <h2>Take part in more job fairs</h2>
              <p>
                My Idea would be for Siemens to go to more job fairs to discover
                people that we would usually not encounter. There would also be
                many other companies there to interact with.
              </p>
              <h3 className="margin-top-15">Current Stage: {currentStage}</h3>
              <div className="flexed-div spacedBetween margin-top-15">
                <div className="progressCircles">1</div>
                <div className="progressCircles activeStat">2</div>
                <div className="progressCircles">3</div>
                <div className="progressCircles">4</div>
                <div className="progressCircles">5</div>
              </div>
              <div className="flexed-div">
                <div className="flexed-div verticalCenter">
                  <img
                    src="https://res.cloudinary.com/nthnh/image/upload/v1557750841/ideaBox/baseline-create_new_folder-24px_1_vpiqrs.svg"
                    width="16px"
                    alt="up votes"
                  />
                  <p className="margin-left-15">{`${upVotes} up-vote${
                    upVotes !== 1 ? "s" : ""
                  }`}</p>
                </div>
                <div className="flexed-div verticalCenter margin-left-30">
                  <img
                    src="https://res.cloudinary.com/nthnh/image/upload/v1557750841/ideaBox/baseline-create_new_folder-24px_1_vpiqrs.svg"
                    width="16px"
                    alt="up votes"
                  />
                  <p className="margin-left-15">{`${upVotes} comment${
                    upVotes !== 1 ? "s" : ""
                  }`}</p>
                </div>
              </div>
            </div>
            <div className="ideaCard marginBelowNavbar flexed-div flexed-col col-45">
              <h2>Take part in more job fairs</h2>
              <p>
                My Idea would be for Siemens to go to more job fairs to discover
                people that we would usually not encounter. There would also be
                many other companies there to interact with.
              </p>
              <h3 className="margin-top-15">Current Stage: {currentStage}</h3>
              <div className="flexed-div spacedBetween margin-top-15">
                <div className="progressCircles">1</div>
                <div className="progressCircles activeStat">2</div>
                <div className="progressCircles">3</div>
                <div className="progressCircles">4</div>
                <div className="progressCircles">5</div>
              </div>
              <div className="flexed-div">
                <div className="flexed-div verticalCenter">
                  <img
                    src="https://res.cloudinary.com/nthnh/image/upload/v1557750841/ideaBox/baseline-create_new_folder-24px_1_vpiqrs.svg"
                    width="16px"
                    alt="up votes"
                  />
                  <p className="margin-left-15">{`${upVotes} up-vote${
                    upVotes !== 1 ? "s" : ""
                  }`}</p>
                </div>
                <div className="flexed-div verticalCenter margin-left-30">
                  <img
                    src="https://res.cloudinary.com/nthnh/image/upload/v1557750841/ideaBox/baseline-create_new_folder-24px_1_vpiqrs.svg"
                    width="16px"
                    alt="up votes"
                  />
                  <p className="margin-left-15">{`${upVotes} comment${
                    upVotes !== 1 ? "s" : ""
                  }`}</p>
                </div>
              </div>
            </div>
          </div>
        </main>
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
