import React from 'react'
import { Link } from 'react-router-dom'
import SearchField from "react-search-field";
import { challengeIdeas } from '../../services/challenge'

class ManagerDashboard extends React.Component {

    state = {
        challenge: {},
        filteredIdeas: []
    }

    componentDidUpdate(prevProp) {
        if (prevProp.currentChallenge !== this.props.currentChallenge) {

            let { currentChallenge } = this.props
            challengeIdeas(currentChallenge._id).then(challengeinfo => {
                this.setState({ challenge: challengeinfo.data, filteredIdeas: challengeinfo.data.ideas })
            })
        }
    }

    render() {
        let ideasArr = this.state.filteredIdeas
        let displayIdeas = ideasArr && ideasArr.map((el, i) => {
            return <div className="mDashboardIdeaBox" key={i}>
                <div className="mDashboardIdeaBoxTagOuterDiv">
                    <div className="mDashboardIdeaBoxTag">
                        <p>Pending your review</p>
                    </div>
                </div>
                <div className="mDashboardIdeaBoxContent">
                    <div className="mDashboardIdeaBoxText">
                        <h2>{el.title}</h2>
                        <p>{el.description}</p>
                    </div>
                    <div className="mDashboardIdeaBoxStatus">status: {el.status}</div>
                    <div className="mDashboardIdeaBoxVotesComments">
                        <div className="mDashboardIdeaBoxVotes"> {el.upVotes} <img src="/public/Sketch-images/like.png" alt="votes" /> </div>
                        <div className="mDashboardIdeaBoxComments"> {el.comments.length} <img src="" alt="" /> </div>
                    </div>
                </div>
            </div>


        })

        return (
            <div>
                <div className="headBar">                
                     <button>Innovation Challenge Idea Submissions</button>  
                     <Link to={'/managerDashboard/open-ideas'}><button>Open Idea submissions</button></Link>  
                </div>
                <div className="main-container">
                    <div className="filteringMIdeas">
                        <button className="disabled">Ideas pending on approval</button>
                        <button className="disabled">Accepted Ideas</button>
                        <button className="disabled">Rejected Ideas</button>
                        <button className="disabled">Requesting more Info</button>
                        <div className="searchFieldMDashboard">
                            <SearchField placeholder="Search..." onSearchClick={this.onSearchClick} searchText=""
                                className="test-class" />
                        </div>

                    </div>
                    <div>
                        <Link to={`/managerDashboard/all-challenges`}>View upcoming challenges</Link>
                    </div>
                    <div className="ideasContainer">
                        {displayIdeas}
                    </div>
                </div>
            </div>
        )
    }
}

export default ManagerDashboard;