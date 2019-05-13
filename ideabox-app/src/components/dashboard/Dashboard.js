import React from 'react'
import Navbar from './Navbar'
import SubmittedIdeas from './SubmittedIdeas'
import CurrentChallengeIdeas from './CurrentChallengeIdeas'


class Dashboard extends React.Component {


    render() {
        return (
            <div className="dashboard">
                <Navbar />
                <SubmittedIdeas />
                {/* <ChallengePres /> */}
                <CurrentChallengeIdeas currentChallenge={this.props.currentChallenge} />
            </div>
        )
    }
}

export default Dashboard
