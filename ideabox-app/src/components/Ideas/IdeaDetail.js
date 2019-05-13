import React, { Component } from "react";
import { getSingleIdea, deleteIdea } from "../../services/ideas";
import { Link } from "react-router-dom";

class IdeaDetail extends Component {
  state = {
    challenge: {},
    idea: {},
    managComm: true
  };

  componentDidMount() {
    const { ideaId } = this.props.match.params;
    getSingleIdea(ideaId).then(idea => {
      this.setState(idea.data);
    });
  }

  deleteIdea = () => {
    const { ideaId } = this.props.match.params;
    deleteIdea(ideaId).then(() => {
      this.setState({ challenge: {}, idea: {}, managComm: true });
      this.props.history.push("/my-ideas");
    });
  };

  managerComments = () => {
    const { comments } = this.state.idea;
    const managerCC = comments.filter(el => el.createdBy.role === "manager");
    return managerCC.map((comment, i) => {
      return (
        <div key={i}>
          <h4>Comment</h4>
          <p>{comment.content}</p>
        </div>
      );
    });
  };

  colleagueComments = () => {
    const { comments } = this.state.idea;
    const colleagueCC = comments.filter(el => el.createdBy.role === "employee");
    return colleagueCC.map((comment, i) => {
      return (
        <div key={i}>
          <h4>Comment</h4>
          <p>{comment.content}</p>
        </div>
      );
    });
  };

  handleManagToggle = () => {
    this.setState({ managComm: true });
  };

  handleColleagueToggle = () => {
    this.setState({ managComm: false });
  };

  render() {
    const {
      title,
      description,
      upVotes,
      estimatedResources,
      teamMembers,
      comments
    } = this.state.idea;
    const challengeTitle = this.state.challenge.title;
    return (
      <div>
        <div>
          <h1>Idea Title: {title}</h1>
          {challengeTitle ? (
            <h1>Innovation Challenge: {challengeTitle}</h1>
          ) : (
              <h1>Open Idea</h1>
            )}
        </div>
        <div>
          <h2>Decision Panel</h2>

          <h2>My Idea Description</h2>
          <p>{description}</p>

          <h2>Estimated Resources</h2>
          <p>{estimatedResources}</p>

          <div>
            <h2>Comments</h2>

            <button onClick={this.handleManagToggle}>Manager Comments ( {comments && comments.filter(el => el.createdBy.role === "manager").length} )</button>
            <button onClick={this.handleColleagueToggle}>Collegue Comments ( {comments && comments.filter(el => el.createdBy.role === "employee").length} ) </button>
            <div className="single-idea-public-comment-box">
              {comments && this.state.managComm && this.managerComments()}
              {comments && !this.state.managComm && this.colleagueComments()}
            </div>
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

          <Link to="/">Edit idea</Link>
          <button onClick={this.deleteIdea}>Delete idea</button>
        </div>
      </div>
    );
  }
}

export default IdeaDetail;
