import React from 'react'
import {getAllIdeas} from '../../services/ideas'
import { Link } from 'react-router-dom'
import SearchField from "react-search-field";

class AllEmployeeSubmissions extends React.Component {
    state = {
        ideas: [],
        filteredIdeas: []
    }

    componentDidMount() {
        getAllIdeas().then(allIdeas => {
            console.log(allIdeas.data)
            this.setState({ideas: allIdeas.data})
        })
    }

render() {
    let ideas = this.state.ideas
    let displayIdeas = ideas.map((el, i) => {
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
                    <div className="mDashboardIdeaBoxComments"> {el.comments.length} <img src="" alt=""/> </div>
                </div>
                </div>
            </div>
    })
    return (
        <div>
            <div className="headBar">                 
                <Link to={'/managerDashboard'}><button>Ideas submitted to me</button></Link>   
                <button>All employees submissions</button>  
            </div>
            <div className="main-container">
                <div className="filteringMIdeas">
                    <button disabled>Ideas pending your approval</button>
                    <button disabled>Accepted Ideas</button>
                    <button disabled>Rejected Ideas</button>
                    <button disabled>Requesting more Info</button>
                    <div className="searchFieldMDashboard">
                    <SearchField placeholder="Search..." onSearchClick={this.onSearchClick} searchText=""
                    className="test-class"/>
                    </div>
                
                </div>
                <div>
                <Link to={`/managerDashboard/challengeForm`}>Create new Challenge</Link>    
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

export default AllEmployeeSubmissions