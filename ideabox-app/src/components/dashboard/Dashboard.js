import React from 'react'
import SubmittedIdeas from './SubmittedIdeas'
import ChallengePres from './ChallengePres'
import CurrentChallengeIdeas from './CurrentChallengeIdeas'


class Dashboard extends React.Component {

    render() {
        const { title } = this.props.currentChallenge
        return (
            <div className="dashboard">
                <h1>{title}</h1>
                <SubmittedIdeas />
                <ChallengePres />
                <CurrentChallengeIdeas currentChallenge={this.props.currentChallenge} />
            </div>
        )
    }
}

export default Dashboard
