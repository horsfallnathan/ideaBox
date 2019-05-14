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
        <div key={i}>
          <Link to={`/my-ideas/${_id}`}>{title}</Link>
          <p>{description}</p>
          <p>Current stage: {status}</p>
          <p>{upVotes} up-votes</p>
          <p>{comments.length} comments</p>
        </div>
      );
    })
  }

  render() {
    const { ideas } = this.state;
    return (
      <div>
        <h1>My Submitted Ideas</h1>
        {ideas && ideas.length > 0 ? this.mapIdeas() : <><h4>You haven't submitted any ideas yet</h4> <Link to="/submit-idea">Submit New Idea</Link></>}
      </div>
    );
  }
}

export default MyIdeas;
