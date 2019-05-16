import React, { Component } from "react";
import { myIdeas } from "../../services/ideas";
import { Link } from "react-router-dom";

class MyIdeas extends Component {
  state = {
    ideas: []
  };

  componentDidMount() {
    myIdeas().then(userInfo => {
      this.setState({ ideas: userInfo.data.ideas });
    });
  }

  mapIdeas = () => {
    const { ideas } = this.state;
    return ideas.map((idea, i) => {
      const { title, description, status, upVotes, comments, _id } = idea;
      return (
        <div
          key={i}
          className="ideaCard marginBelowNavbar flexed-div flexed-col col-45"
        >
          <Link className="allLinks" to={`/my-ideas/${_id}`}>
            <h2>{title}</h2>
          </Link>
          <p>{description}</p>
          <h3 className="margin-top-15">Current Stage: {status}</h3>
          <div className="flexed-div spacedBetween margin-top-15">
            <div
              className={`progressCircles ${
                status === "Submitted" ? "activeStat" : " "
              }`}
            >
              1
            </div>
            <div
              className={`progressCircles ${
                status === "Validation" ? "activeStat" : " "
              }`}
            >
              2
            </div>
            <div
              className={`progressCircles ${
                status === "Development" ? "activeStat" : " "
              }`}
            >
              3
            </div>
            <div
              className={`progressCircles ${
                status === "Pitch" ? "activeStat" : " "
              }`}
            >
              4
            </div>

            <div
              className={`progressCircles ${
                status === "Implementation" ? "activeStat" : " "
              }`}
            >
              5
            </div>
          </div>
          <div className="flexed-div">
            <div className="flexed-div verticalCenter">
              <img
                src="https://res.cloudinary.com/dxbwwhlc6/image/upload/v1557761454/like_d65yra.png"
                width="16px"
                alt="up votes"
              />
              <p className="margin-left-15">{`${upVotes &&
                upVotes.length} up-vote${upVotes.length !== 1 ? "s" : ""}`}</p>
            </div>
            <div className="flexed-div verticalCenter margin-left-30">
              <img
                src="https://res.cloudinary.com/nthnh/image/upload/v1557750841/ideaBox/baseline-create_new_folder-24px_1_vpiqrs.svg"
                width="16px"
                alt="comments"
              />
              <p className="margin-left-15">{`${comments &&
                comments.length} comment${
                comments.length !== 1 ? "s" : ""
              }`}</p>
            </div>
          </div>
        </div>
      );
    });
  };

  render() {
    const { ideas } = this.state;
    return (
      <div className="marginBelowNavbar main-container">
        <h1>My Submitted Ideas</h1>
        {ideas && ideas.length > 0 ? (
          <div className="flexed-div flexed-wrap spacedBetween">
            {this.mapIdeas()}
          </div>
        ) : (
          <>
            <h4>You haven't submitted any ideas yet</h4>{" "}
            <Link to="/submit-idea">Submit New Idea</Link>
          </>
        )}
      </div>
    );
  }
}

export default MyIdeas;
