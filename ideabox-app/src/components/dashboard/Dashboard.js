import React from 'react'
import { currentChallenge } from '../../services/challenge'
import CurrentChallengeIdeas from './CurrentChallengeIdeas'
import { Link } from 'react-router-dom'


class Dashboard extends React.Component {
    state = {
        currentChallenge: {},
        filteredIdes: []
    }


    componentDidMount() {

        currentChallenge().then(currentChallengeInfo => {
            this.setState({ currentChallenge: currentChallengeInfo.data})
            console.log(currentChallengeInfo)
        })
    }

    render() {
        return (
            <>
                <div className="dashboard">
                    <div className="headBar">
                        <button>Innovation Challenge Idea Submissions</button>
                        <Link to="/open-ideas"><button>Open Idea Submissions</button></Link>
                    </div>
                    <div className="challengePres">
                        <div className="main-container">
                            <div className="challengePresInnerDiv">
                                <div className="challengePresKata">
                                    <h2>#</h2>
                                </div>
                                <div className="challengePresTitleBtns">
                                    <div className="challengePresTitle">

                                        <h1>{this.state.currentChallenge && this.state.currentChallenge.title ? this.state.currentChallenge.title : "No current challenge"}</h1>

                                    </div>
                                    {this.state.currentChallenge && this.state.currentChallenge.title &&
                                        <div className="challengePresBtns">
                                            <button><Link to="/current-challenge-information">Read more</Link></button>
                                            <button><Link to="/submit-idea">Submit Idea</Link></button>
                                        </div>}
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
