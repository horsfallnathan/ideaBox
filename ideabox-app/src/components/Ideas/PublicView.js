import React, { Component } from 'react'
import { publicViewIdea } from '../../services/ideas'
import { createComment } from '../../services/comments'

class PublicViewIdea extends Component {
    state = {
        challenge: {},
        idea: {},
        commentContent: ''
    }

    componentDidMount() {
        const { ideaId } = this.props.match.params
        publicViewIdea(ideaId).then(ideainfo => {
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
        let info = { content: this.state.commentContent, ideaId: this.state.idea._id }
        createComment(info)
        this.setState({ commentContent: '' })
    }

    render() {
        const { title, description, upVotes, need, benefit, estimatedResources, competition, teamMembers, comments } = this.state.idea
        const challengeTitle = this.state.challenge.title
        return (
            <div>
                <div>
                    {challengeTitle ? <h1>The Innovation Challenge: {challengeTitle}</h1> : <h1>Open Idea</h1>}
                    <h1>Submited Idea: {title}</h1>
                </div>
                <div>
                    <h2>Engagement</h2>
                    {{ upVotes } === 1 ? <p>{upVotes} Up-Vote</p> : <p>{upVotes} Up-Votes</p>}

                    <h2>Idea Description</h2>
                    <p>{description}</p>

                    <h2>Need</h2>
                    <p>Who is the target group for your idea?</p>
                    <p>{need}</p>

                    <h2>Benefit</h2>
                    <p>How will the idea benefit the target group? </p>
                    <p>{benefit}</p>

                    <h2>Estimated Resources</h2>
                    <p>Which resources do you think are needed to work on this idea?</p>
                    <p>{estimatedResources}</p>

                    <h2>Competition</h2>
                    <p>Are there any other products trying to solve the same problem?</p>
                    <p>{competition}</p>

                    <h2>Idea Team</h2>
                    <p>{teamMembers}</p>

                    <div className="Org">
                        <h2>Comments</h2>
                        <h4>Manager Comments</h4>
                        <h4>Colleague Comments</h4>

                        {comments && comments.map((comment, i) => {
                            return (
                                <div key={i}>
                                    <h4>Comment</h4>
                                    <p>{comment.content}</p>
                                </div>
                            )
                        })}

                        <form onSubmit={this.handleSubmit}>
                            <input type="text" placeholder="Leave a comment..." value={this.commentContent} name="commentContent" onChange={this.handleChange} />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default PublicViewIdea
