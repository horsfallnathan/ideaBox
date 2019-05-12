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
            <div>
                <h1>All Challenges</h1>
                {challenges.map((challenge, i) => {
                    const { title, description, startDate, deadline, challengeNumber } = challenge
                    return (
                        <div key={i}>
                            <h2>{challengeNumber}{title}</h2>
                            <p>{description}</p>
                            <p>Start Date: {startDate}</p>
                            <p>Deadline: {deadline}</p>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default AllChallenges