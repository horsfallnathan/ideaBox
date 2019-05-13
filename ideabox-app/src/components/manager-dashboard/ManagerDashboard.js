import React from 'react' 
import { Link } from 'react-router-dom'
import SearchField from "react-search-field";
import { challengeIdeas } from '../../services/challenge'
// import challengeForm from "../manager-dashboard/challengeForm"

class ManagerDashboard extends React.Component {

    state = {
        challenge: {},
        filteredIdeas: []
    }

    componentDidMount() {
        let { currentChallenge } = this.props
        console.log(this.props)
        challengeIdeas(currentChallenge._id).then(challengeinfo => {
            this.setState({ challenge: challengeinfo.data, filteredIdeas: challengeinfo.data.ideas })
           
        })
    }


    render() {

        let ideasArr = this.state.filteredIdeas
        let displayIdeas = ideasArr && ideasArr.map((el, i) => {
            console.log(ideasArr)
            console.log(this.state.filteredIdeas)
            return <div className="mDashboardIdeaBox">
                <div className="mDashboardIdeaBoxTag"></div>
                <div className="mDashboardIdeaBoxContent">
                <h2>Title</h2>
                <p>description</p>
                <div className="mDashboardIdeaBoxStatus">Status</div>
                <div className="mDashboardIdeaBoxVotesComments"></div>
                </div>
            </div>


        })

        return (
            <div className="main-container">
                <div className="headBar">                
                     <button>Ideas submitted to me</button>  
                     <button disabled>All employees submissions</button>  
                </div>
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
                <button>View current Challenge</button>
                </div>
                <div className="ideasContainer">
                {displayIdeas}

                </div>
            </div>
        )
    }
}

export default ManagerDashboard;