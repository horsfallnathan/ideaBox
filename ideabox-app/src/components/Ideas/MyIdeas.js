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
      const {
        title,
        description,
        status,
        upVotes,
        comments,
        _id
      } = idea;
      return (
        <div className="relatedIdeasBox">
          <div key={i} className="relatedIdeasBoxInnerDiv" >
            <Link to={`/my-ideas/${_id}`}>{title}</Link>
            <p>{description}</p>
            <p>Current stage: {status}</p>
            <div className="relatedIdeasBoxVotes"><img src="https://res.cloudinary.com/dxbwwhlc6/image/upload/v1557761454/like_d65yra.png" width="26px" height="auto" alt="upvotes-icon" /><p>{upVotes} up-votes</p></div>
            <p>{comments.length} comments</p>
          </div>
        </div>
      );
    })
  }

  render() {
    const { ideas } = this.state;
    return (
      <div className="main-container">
        <h1>My Submitted Ideas</h1>
        {ideas && ideas.length > 0 ? this.mapIdeas() : <><h4>You haven't submitted any ideas yet</h4> <Link to="/submit-idea">Submit New Idea</Link></>}
      </div>
    );
  }
}

export default MyIdeas;
