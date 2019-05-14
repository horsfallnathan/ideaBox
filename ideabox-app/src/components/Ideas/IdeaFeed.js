import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { getAllIdeas } from "../../services/ideas"

class IdeaFeed extends Component {
    state = {
        ideas: []
    }

    componentDidMount() {
        getAllIdeas().then(ideas => {
            this.setState({ ideas: ideas.data })
        })
    }

    mapIdeas = () => {
        const { ideas } = this.state

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
        const { ideas } = this.state
        return (
            <div>
                <h1>Idea Feed</h1>
                {ideas && ideas.length && ideas.length > 0 ? this.mapIdeas() : <><h4>No ideas available to show in the feed</h4><Link to="/submit-idea">Click here to submit a new idea</Link></>}
            </div>
        )
    }
}

export default IdeaFeed

