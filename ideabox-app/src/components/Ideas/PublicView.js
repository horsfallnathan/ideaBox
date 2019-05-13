import React, { Component } from 'react'
import { getSingleIdea } from '../../services/ideas'
import { createComment } from '../../services/comments'

class PublicViewIdea extends Component {
    state = {
        challenge: {},
        idea: {},
        commentContent: '',
        managComm: true
    }

    componentDidMount() {
        const { ideaId } = this.props.match.params
        getSingleIdea(ideaId).then(ideainfo => {
            const { challenge } = ideainfo.data
            const { idea } = ideainfo.data
            this.setState({ challenge, idea, commentContent: "" })
        })
    }

    handleChange = event => {
        const { value, name } = event.target;
        this.setState({ [name]: value })
    }

    handleSubmit = event => {
        event.preventDefault()
        let info = { content: this.state.commentContent, ideaId: this.state.idea._id, createdBy: this.props.loggedIn }
        createComment(info)

        let copyComm = this.state.idea.comments
        copyComm.push(info);

        this.setState({
            idea: { comments: copyComm },
            commentContent: ''
        })
    }

    managerComments = () => {
        const { comments } = this.state.idea;
        const managerCC = comments.filter(el => el.createdBy.role === "manager");
        return managerCC.map((comment, i) => {
            const { profileImage, firstName, lastName } = comment.createdBy
            return (
                <div key={i}>
                    <h4> <img
                        src={profileImage}
                        width="30px"
                        alt="ProfileImage"
                    />
                        {firstName} {lastName}</h4>
                    <p>{comment.content}</p>
                </div>
            );
        });
    };

    colleagueComments = () => {
        const { comments } = this.state.idea;
        const colleagueCC = comments.filter(el => el.createdBy.role === "employee");
        return colleagueCC.map((comment, i) => {
            const { profileImage, firstName, lastName } = comment.createdBy
            return (
                <div key={i}>

                    <h4><img
                        src={profileImage}
                        width="30px"
                        alt="ProfileImage"
                    />
                        {firstName} {lastName}</h4>
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
        const { title, description, upVotes, need, benefit, estimatedResources, competition, teamMembers, comments } = this.state.idea
        const challengeTitle = this.state.challenge.title
        return (
            <div>
                <div className="flexed-div single-idea-public-col-container">
                    <div className="single-idea-public-col single-idea-public-col-left">
                        {challengeTitle ? <h1>The Innovation Challenge: {challengeTitle}</h1> : <h1>Open Idea</h1>}
                        <div id="triangle-right"></div>
                    </div>
                    <div className="single-idea-public-col single-idea-public-col-right">
                        <h1>Submitted Idea: {title}</h1>
                    </div>
                </div>
                <div className="main-container single-idea-public-bottom">
                    <h2>Engagement</h2>
                    <img src="https://res.cloudinary.com/dxbwwhlc6/image/upload/v1557761454/like_d65yra.png" width="26px" alt="upvotes-icon" />
                    {{ upVotes } === 1 ? <><h2 className="single-idea-public-inline">{upVotes}</h2> <p className="upvotes single-idea-public-inline">Up-Vote</p></> : <> <h2 className="single-idea-public-inline">{upVotes}</h2> <p className="upvotes single-idea-public-inline">Up-Votes</p> </>}

                    <h2>Idea Description</h2>
                    <p>{description}</p>

                    <h2 className="single-idea-public-inline">Need</h2>
                    <p className="single-idea-public-inline"><i className="specifications-single-idea-public">Who is the target group for your idea?</i></p>
                    <p>{need}</p>

                    <h2 className="single-idea-public-inline">Benefit</h2>
                    <p className="single-idea-public-inline"><i className="specifications-single-idea-public">How will the idea benefit the target group? </i></p>
                    <p>{benefit}</p>

                    <h2 className="single-idea-public-inline">Estimated Resources</h2>
                    <p className="single-idea-public-inline"><i className="specifications-single-idea-public">Which resources do you think are needed to work on this idea?</i></p>
                    <p>{estimatedResources}</p>

                    <h2 className="single-idea-public-inline">Competition</h2>
                    <p className="single-idea-public-inline"><i className="specifications-single-idea-public">Are there any other products trying to solve the same problem?</i></p>
                    <p>{competition}</p>

                    <h2>Idea Team</h2>
                    <p>{teamMembers}</p>

                    <div>
                        <h2>Comments</h2>
                        <button onClick={this.handleManagToggle}>Manager Comments ( {comments && comments.filter(el => el.createdBy.role === "manager").length} )</button>
                        <button onClick={this.handleColleagueToggle}>Collegue Comments ( {comments && comments.filter(el => el.createdBy.role === "employee").length} ) </button>
                        <div className="single-idea-public-comment-box">
                            {comments && this.state.managComm && (this.managerComments().length > 0 ? this.managerComments() : <p>No manager comments yet</p>)}
                            {comments && !this.state.managComm && (this.colleagueComments().length > 0 ? this.colleagueComments() : <p>No colleague comments yet</p>)}
                        </div>
                    </div>

                    <form onSubmit={this.handleSubmit}>
                        <img src={this.props.loggedIn.profileImage} alt="loggedIn-user" />
                        <input type="text" placeholder="Leave a comment..." value={this.state.commentContent} name="commentContent" onChange={this.handleChange} />
                    </form>
                </div>
            </div >

        )
    }
}

export default PublicViewIdea
