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
    const managerCC = comments.filter(
      el =>
        el.createdBy.role === "manager" || el.createdBy.role === "super-manager"
    );
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
      <>
        <div className="ideaDetailBanner marginBelowNavbar flexed-div flexed-col main-container alignedCenter verticalCenter">
          <div className="flexed-div ideaDetailBanner-cont">
            <div className="col-50 idbc-item flexed-div verticalCenter flexed-col">
              <h2>Idea Title: </h2>
              <h1 className="margin-top-15"> {title}</h1>
            </div>
            {challengeTitle ? (
              <>
                <div className="col-50 idbc-item flexed-div alignedCenter flexed-col">
                  <h2 className="colorWhite">Innovation Challenge: </h2>
                  <h1 className="colorWhite margin-top-15">{challengeTitle}</h1>
                </div>
              </>
            ) : (
              <div className="col-50 idbc-item flexed-div verticalCenter flexed-col">
                <h2 className="colorWhite">Open Idea</h2>
              </div>
            )}
          </div>
        </div>
        <div className="idea-detail-bottom main-container margin-top-30">
          <h2>Decision Panel</h2>

          <h2 className="margin-top-30">My Idea Description</h2>
          <p className="margin-top-15">{description}</p>

          <h2 className="margin-top-30">Estimated Resources</h2>

          {estimatedResources &&
            estimatedResources.map((resource, i) => {
              return (
                <p className="margin-top-15" key={i}>
                  {i + 1}:<span className="margin-left-15">{resource}</span>
                </p>
              );
            })}

          <div>
            <h2 className="margin-top-30">Comments</h2>
            <div className="flexed-div margin-top-30">
              <button onClick={this.handleManagToggle} className="bSpecial">
                Manager Comments ({" "}
                {comments &&
                  comments.filter(el => el.createdBy.role === "manager")
                    .length}{" "}
                )
              </button>
              <button onClick={this.handleColleagueToggle} className="bSpecial">
                Colleague Comments ({" "}
                {comments &&
                  comments.filter(el => el.createdBy.role === "employee")
                    .length}{" "}
                ){" "}
              </button>
            </div>
            <div className="single-idea-public-comment-box">
              {comments &&
                this.state.managComm &&
                (this.managerComments().length > 0 ? (
                  this.managerComments()
                ) : (
                  <p>No manager comments yet</p>
                ))}
              {comments &&
                !this.state.managComm &&
                (this.colleagueComments().length > 0 ? (
                  this.colleagueComments()
                ) : (
                  <p>No colleague comments yet</p>
                ))}
            </div>
          </div>
          <div className="flexed-div margin-top-15 aligned-end">
            <img
              src="https://res.cloudinary.com/dxbwwhlc6/image/upload/v1557761454/like_d65yra.png"
              width="24px"
              height="auto"
              alt="upvotes-icon"
            />
            <p className="margin-left-15">
              This idea has been up-voted by
              {{ upVotes } === 1
                ? ` ${upVotes} employee`
                : ` ${upVotes} employees`}
            </p>
          </div>
          <h2 className="margin-top-30">Team Members</h2>
          <div className="flexed-div flexed-wrap margin-top-15">
            {teamMembers &&
              teamMembers.map((member, i) => {
                return (
                  <>
                    <div className="flexed-div flexed-col alignedCenter margin-left-15">
                      <img
                        src={member.profileImage}
                        alt="team-member"
                        width="50rem"
                      />
                      <p key={i}>
                        {member.firstName}
                        {member.lastName}
                      </p>
                    </div>
                  </>
                );
              })}
          </div>
          {/* <p>Add a team member</p> */}

          <button className="margin-top-30" to="/">
            Edit idea
          </button>
          <button className="margin-left-30" onClick={this.deleteIdea}>
            Delete idea
          </button>
        </div>
        {/* </div> */}
      </>
    );
  }
}

export default IdeaDetail;
