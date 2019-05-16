import React, { Component } from 'react'
import { getAllChallenges } from '../../services/challenge'

class AllChallenges extends Component {
    state = {
        challenges: []
    }

    componentDidMount() {
        getAllChallenges().then(allChallenges => {
            this.setState({ challenges: allChallenges.data })
        })
    }

    render() {
        const { challenges } = this.state
        return (
            <div className="main-container marginBelowNavbar">
                <h1>All Challenges</h1>
                {challenges.map((challenge, i) => {
                    const { title, description, startDate, deadline, challengeNumber } = challenge
                    return (
                        <div key={i}>
                            <h2>{challengeNumber}{title}</h2>
                            <p>{description}</p>
                            <p>Start Date: {startDate.substring(0, 10)}</p>
                            <p>Deadline: {deadline.substring(0, 10)}</p>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default AllChallenges