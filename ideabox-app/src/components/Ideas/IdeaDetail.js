import React, { Component } from "react";
import { publicViewIdea, deleteIdea } from "../../services/ideas";
import { Link } from "react-router-dom";

class IdeaDetail extends Component {
  state = {
    challenge: {},
    idea: {}
  };

  componentDidMount() {
    const { ideaId } = this.props.match.params;
    publicViewIdea(ideaId).then(idea => {
      this.setState(idea.data);
    });
  }

  deleteIdea = () => {
    const { ideaId } = this.props.match.params;
    deleteIdea(ideaId).then(() => {
      this.setState({ challenge: {}, idea: {} });
      this.props.history.push("/my-ideas");
    });
  };

  render() {
    const {
      title,
      description,
      upVotes,
      estimatedResources,
      teamMembers
    } = this.state.idea;
    const challengeTitle = this.state.challenge.title;
    const { ideaId } = this.props.match.params;
    console.log(ideaId);
    return (
      <div>
        <div className="Org">
          <h1>Idea Title: {title}</h1>
          {challengeTitle ? (
            <h1>Innovation Challenge: {challengeTitle}</h1>
          ) : (
            <h1>Open Idea</h1>
          )}
        </div>
        <div>
          <h2>Decision Panel</h2>

          <h1>Feedback</h1>

          <h2>My Idea Description</h2>
          <p>{description}</p>

          <h2>Estimated Resources</h2>
          <p>{estimatedResources}</p>

          <div className="Org">
            <h2>Comments</h2>
            <h4>Manager Comments</h4>
            <h4>Colleague Comments</h4>
          </div>

          <p>
            This idea has been up-voted by
            {{ upVotes } === 1
              ? ` ${upVotes} employee`
              : ` ${upVotes} employees`}
          </p>

          <h2>Team Members</h2>
          <p>{teamMembers}</p>
          <p>Add a team member</p>

          <Link to={`/edit-idea/${ideaId}`}>Edit idea</Link>
          <button onClick={this.deleteIdea}>Delete idea</button>
        </div>
      </div>
    );
  }
}

export default IdeaDetail;
