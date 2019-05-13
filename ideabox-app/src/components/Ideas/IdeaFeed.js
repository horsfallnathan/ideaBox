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

    render() {
        const { ideas } = this.state
        return (
            <div>
                <h1>Idea Feed</h1>
                {ideas.map((idea, i) => {
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
                })}
            </div>
        )
    }
}

export default IdeaFeed

