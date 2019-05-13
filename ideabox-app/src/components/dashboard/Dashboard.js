import React from 'react'

import CurrentChallengeIdeas from './CurrentChallengeIdeas'


class Dashboard extends React.Component {

    render() {
        const { title } = this.props.currentChallenge
        return (
            <div className="dashboard">
            
                <CurrentChallengeIdeas currentChallenge={this.props.currentChallenge} />
            </div>
        )
    }
}

export default Dashboard
