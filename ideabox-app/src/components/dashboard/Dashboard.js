import React from 'react'
import { currentChallenge } from '../../services/challenge'
import CurrentChallengeIdeas from './CurrentChallengeIdeas'
import { Link } from 'react-router-dom'


class Dashboard extends React.Component {
    state = {
        currentChallenge: {}
    }

    componentDidMount() {
        currentChallenge().then(currentChallengeInfo => {
            this.setState({ currentChallenge: currentChallengeInfo.data })
        })
    }

    render() {
        return (
            <>
                <div className="dashboard">
                    <div className="headBar">
                        <button>Innovation Challenge Idea Submissions</button>
                        <button disabled>Open Idea Submissions</button>
                    </div>
                    <div className="challengePres">
                        <div className="main-container">
                            <div className="challengePresInnerDiv">
                                <div className="challengePresKata">
                                    <h2>#</h2>
                                </div>
                                <div className="challengePresTitleBtns">
                                    <div className="challengePresTitle">
                                        <h1>
                                            {this.state.currentChallenge && this.state.currentChallenge.title ? this.state.currentChallenge.title : <h1>No current challenge</h1>}
                                        </h1>
                                    </div>
                                    <div className="challengePresBtns">
                                        <button>Read more</button>
                                        <button><Link to="/submit-idea">Submit Idea</Link></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.state.currentChallenge && this.state.currentChallenge.title && <CurrentChallengeIdeas currentChallenge={this.props.currentChallenge} />}
                </div>
            </>
        )
    }
}

export default Dashboard
