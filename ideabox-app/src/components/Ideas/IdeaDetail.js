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
    const managerCC = comments.filter(el => el.createdBy.role === "manager" || el.createdBy.role === "super-manager");
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
      <div className="flexed-col main-container">
        <div>
          <h2>Idea Title: </h2><p> {title}</p>
          {challengeTitle ? (
            <>
              <h2>Innovation Challenge: </h2> <p>{challengeTitle}</p>
            </>
          ) : (
              <h2>Open Idea</h2>
            )}
        </div>
        <div className="idea-detail-bottom">
          <h2>Decision Panel</h2>

          <h2>My Idea Description</h2>
          <p>{description}</p>

          <h2>Estimated Resources</h2>
          <ul>{estimatedResources && estimatedResources.map((resource, i) => {
            return (
              <li key={i}>{resource}</li>
            )
          })}</ul>

          <div>
            <h2>Comments</h2>

            <button onClick={this.handleManagToggle}>Manager Comments ( {comments && comments.filter(el => el.createdBy.role === "manager").length} )</button>
            <button onClick={this.handleColleagueToggle}>Collegue Comments ( {comments && comments.filter(el => el.createdBy.role === "employee").length} ) </button>
            <div className="single-idea-public-comment-box">
              {comments && this.state.managComm && (this.managerComments().length > 0 ? this.managerComments() : <p>No manager comments yet</p>)}
              {comments && !this.state.managComm && (this.colleagueComments().length > 0 ? this.colleagueComments() : <p>No colleague comments yet</p>)}
            </div>
          </div>

          <p>
            <img src="https://res.cloudinary.com/dxbwwhlc6/image/upload/v1557761454/like_d65yra.png" width="26px" height="auto" alt="upvotes-icon" />
            This idea has been up-voted by
            {{ upVotes } === 1
              ? ` ${upVotes} employee`
              : ` ${upVotes} employees`}
          </p>

          <h2>Team Members</h2>
          {teamMembers && teamMembers.map((member, i) => {
            return (
              <>
                <img src={member.profileImage} alt="team-member" />
                <p key={i}>{member.firstName}{member.lastName}</p>
              </>
            )
          })}
          <p>Add a team member</p>

          <Link to="/">Edit idea</Link>
          <button onClick={this.deleteIdea}>Delete idea</button>
        </div>
      </div>
    );
  }
}

export default IdeaDetail;
