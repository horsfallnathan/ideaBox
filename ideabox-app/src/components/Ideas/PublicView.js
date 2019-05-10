import React, { Component } from 'react'
import { publicViewIdea } from '../../services/ideas'

class PublicViewIdea extends Component {
    state = {
        challenge: {},
        idea: {}
    }

    componentDidMount() {
        const { ideaId } = this.props.match.params
        publicViewIdea(ideaId).then(idea => {
            this.setState(idea.data)
        })
    }

    render() {
        const { title, description, upVotes, need, benefit, estimatedResources, competition, teamMembers } = this.state.idea
        const challengeTitle = this.state.challenge.title
        return (
            <div>
                <div>
                    <h1>The Innovation Challenge: {challengeTitle}</h1>
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

                    <h2>Comments</h2>
                    <h4>Manager Comments</h4>
                    <h4>Colleague Comments</h4>

                    <h2>Leave a comment</h2>
                </div>
            </div>
        )
    }
}

export default PublicViewIdea