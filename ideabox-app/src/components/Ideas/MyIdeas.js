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

  render() {
    const { ideas } = this.state;
    return (
      <div>
        <h1>My Submitted Ideas</h1>
        {ideas.map((idea, i) => {
          const {
            title,
            description,
            status,
            upVotes,
            comments,
            feedback,
            _id
          } = idea;
          return (
            <div key={i}>
              <Link to={`/my-ideas/${_id}`}>{title}</Link>
              <p>{description}</p>
              <p>Current stage: {status}</p>
              <p>{upVotes} up-votes</p>
              <p>{comments.length} comments</p>
              <p>{feedback.length} feedback</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default MyIdeas;
