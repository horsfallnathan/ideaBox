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
        const { title, description, upVotes, need, benefit, estimatedResources } = this.state.idea
        const challengeTitle = this.state.challenge.title
        console.log(this.state.idea)
        return (
            <div>
                <h1>The Innovation Challenge: {challengeTitle}</h1>
                <h1>Submited Idea: {title}</h1>
                <h2>Engagement</h2>

                {{ upVotes } === 1 ? <p>{upVotes} Up-Vote</p> : <p>{upVotes} Up-Votes</p>}

                <h2>Idea Description</h2>
                <p>{description}</p>

                <h2>Need</h2>
                <p>{need}</p>

                <h2>Benefit</h2>
                <p>{benefit}</p>

                <h2>Estimated Resources</h2>
                <p>{estimatedResources}</p>
            </div>
        )
    }
}

export default PublicViewIdea
