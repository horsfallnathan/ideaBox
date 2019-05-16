import React from "react";
// import { currentChallenge } from "../../services/challenge";
// import CurrentChallengeIdeas from "./CurrentChallengeIdeas";
import { challengeIdeas } from "../../services/challenge";
import { Link } from "react-router-dom";

class ManagerDashboard extends React.Component {
  state = {
    filteredIdes: [],
    challenge: {},
    openView: false,
    leftBannerButtonState: "active",
    rightBannerButtonState: "inactive"
  };

  componentDidUpdate(prevProp) {
    if (prevProp.currentChallenge !== this.props.currentChallenge) {
      let { currentChallenge } = this.props;
      challengeIdeas(currentChallenge._id).then(challengeinfo => {
        this.setState({
          challenge: challengeinfo.data,
          filteredIdeas: challengeinfo.data.ideas
        });
      });
    }
  }

  //   componentDidMount() {
  //     currentChallenge().then(currentChallengeInfo => {
  //       this.setState({ currentChallenge: currentChallengeInfo.data });
  //       console.log(currentChallengeInfo);
  //     });
  //   }
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
    const ideasArr = this.state.filteredIdeas;
    const displayIdeas =
      ideasArr &&
      ideasArr.map((el, i) => {
        return (
          <div key={i} className="managerIdeaCard margin-bot-30">
            <div className="flexed-div nbannerCont flexed-end">
              <div className="notificationBanner">
                <p>Pending Your Review</p>
              </div>
            </div>
            <h3>{el.title}</h3>
            <p>{el.description}</p>
            <div className="flexed-div spacedBetween margin-top-15">
              <div
                className={`progressCircles ${
                  el.status === "Submitted" ? "activeStat" : " "
                  }`}
              >
                1
              </div>
              <div
                className={`progressCircles ${
                  el.status === "Validation" ? "activeStat" : " "
                  }`}
              >
                2
              </div>
              <div
                className={`progressCircles ${
                  el.status === "Development" ? "activeStat" : " "
                  }`}
              >
                3
              </div>
              <div
                className={`progressCircles ${
                  el.status === "Pitch" ? "activeStat" : " "
                  }`}
              >
                4
              </div>

              <div
                className={`progressCircles ${
                  el.status === "Implementation" ? "activeStat" : " "
                  }`}
              >
                5
              </div>
            </div>
            <div className="flexed-div margin-top-15">
              <div className="flexed-div verticalCenter">
                <img
                  src="https://res.cloudinary.com/nthnh/image/upload/v1557750841/ideaBox/baseline-create_new_folder-24px_1_vpiqrs.svg"
                  width="16px"
                  alt="up votes"
                />
                <p className="margin-left-15">{el.upVotes.length}</p>
              </div>
              <div className="flexed-div verticalCenter margin-left-30">
                <img
                  src="https://res.cloudinary.com/nthnh/image/upload/v1557750841/ideaBox/baseline-create_new_folder-24px_1_vpiqrs.svg"
                  width="16px"
                  alt="up votes"
                />
                <p className="margin-left-15">{el.comments.length}</p>
              </div>
            </div>
          </div>
        );
      });

    return (
      <React.Fragment>
        <div
          className={"flexed-div marginBelowNavbar main-container flexed-col"}
        >
          <div className="bannerButtonsDiv flexed-div spacedBetween margin-top-30">
            <Link
              onClick={this.flipChallengeViewInnovation}
              className={`allLinks bannerButtons greenBorder textCenter ${
                this.state.leftBannerButton ? "active" : "inactive"
                }`}
            >
              <h2>Innovation Challenge Idea Submissions</h2>
            </Link>
            <Link
              className={`allLinks bannerButtons greenBorder textCenter ${
                this.state.rightBannerButton ? "active" : "inactive"
                }`}
              onClick={this.flipChallengeViewOpen}
            >
              <h2>Open Idea Submissions</h2>
            </Link>
          </div>
        </div>
        <div className={"flexed-div main-container flexed-col"}>
          <div className="bannerButtonsDiv flexed-div spacedEvenly">
            <Link
              onClick={this.flipChallengeViewInnovation}
              className={`allLinks subButtons textCenter ${
                this.state.leftBannerButton ? "active" : "inactive"
                }`}
            >
              <h2>Ideas Pending Your Approval</h2>
            </Link>
            <Link
              className={`allLinks subButtons textCenter ${
                this.state.rightBannerButton ? "active" : "inactive"
                }`}
              onClick={this.flipChallengeViewOpen}
            >
              <h2>Accepted Ideas</h2>
            </Link>
            <Link
              className={`allLinks subButtons textCenter ${
                this.state.rightBannerButton ? "active" : "inactive"
                }`}
              onClick={this.flipChallengeViewOpen}
            >
              <h2>Rejected Ideas</h2>
            </Link>
            <Link
              className={`allLinks subButtons textCenter ${
                this.state.rightBannerButton ? "active" : "inactive"
                }`}
              onClick={this.flipChallengeViewOpen}
            >
              <h2>Requesting More Info</h2>
            </Link>
          </div>
        </div>
        <div className="flexed-div flexed-center">
          <input
            type="text"
            onChange={this.handleSearch}
            placeholder="Search Idea"
          />
        </div>
        <div className="main-container flexed-div spacedBetween flexed-wrap">
          {displayIdeas}
        </div>
      </React.Fragment>
    );
  }
}
export default ManagerDashboard;

// import React from "react";
// import { Link } from "react-router-dom";
// import SearchField from "react-search-field";
// import { challengeIdeas } from "../../services/challenge";

// class ManagerDashboard extends React.Component {
//   state = {
//     challenge: {},
//     filteredIdeas: []
//   };

//   componentDidUpdate(prevProp) {
//     if (prevProp.currentChallenge !== this.props.currentChallenge) {
//       let { currentChallenge } = this.props;
//       challengeIdeas(currentChallenge._id).then(challengeinfo => {
//         this.setState({
//           challenge: challengeinfo.data,
//           filteredIdeas: challengeinfo.data.ideas
//         });
//       });
//     }
//   }

//   render() {
//     let ideasArr = this.state.filteredIdeas;
//     let displayIdeas =
//       ideasArr &&
//       ideasArr.map((el, i) => {
//         return (
//           <div className="mDashboardIdeaBox" key={i}>
//             <div className="mDashboardIdeaBoxTagOuterDiv">
//               <div className="mDashboardIdeaBoxTag">
//                 <p>Pending your review</p>
//               </div>
//             </div>
//             <div className="mDashboardIdeaBoxContent">
//               <div className="mDashboardIdeaBoxText">
//                 <h2>{el.title}</h2>
//                 <p>{el.description}</p>
//               </div>
//               <div className="mDashboardIdeaBoxStatus">status: {el.status}</div>
//               <div className="mDashboardIdeaBoxVotesComments">
//                 <div className="mDashboardIdeaBoxVotes">
//                   {" "}
//                   {el.upVotes}{" "}
//                   <img src="/public/Sketch-images/like.png" alt="votes" />{" "}
//                 </div>
//                 <div className="mDashboardIdeaBoxComments">
//                   {" "}
//                   {el.comments.length} <img src="" alt="" />{" "}
//                 </div>
//               </div>
//             </div>
//           </div>
//         );
//       });

//     return (
//       <div>
//         <div className="marginBelowNavbar">
//           <button>Innovation Challenge Idea Submissions</button>
//           <Link to={"/managerDashboard/open-ideas"}>
//             <button>Open Idea submissions</button>
//           </Link>
//         </div>
//         <div className="main-container">
//           <div className="filteringMIdeas">
//             <button className="disabled">Ideas pending on approval</button>
//             <button className="disabled">Accepted Ideas</button>
//             <button className="disabled">Rejected Ideas</button>
//             <button className="disabled">Requesting more Info</button>
//             <div className="searchFieldMDashboard">
//               <SearchField
//                 placeholder="Search..."
//                 onSearchClick={this.onSearchClick}
//                 searchText=""
//                 className="test-class"
//               />
//             </div>
//           </div>
//           <div>
//             <Link to={`/managerDashboard/all-challenges`}>
//               View upcoming challenges
//             </Link>
//           </div>
//           <div className="ideasContainer">{displayIdeas}</div>
//         </div>
//       </div>
//     );
//   }
// }

// export default ManagerDashboard;
