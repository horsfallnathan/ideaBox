import React from 'react' 
import { Link } from 'react-router-dom'
import SearchField from "react-search-field";
// import challengeForm from "../manager-dashboard/challengeForm"

class ManagerDashboard extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <h2>Ideas submitted to me</h2>
                    <h2>All employees submissions</h2>
                </div>
                <div>
                    <button>Ideas pending your approval</button>
                    <button>Accepted Ideas</button>
                    <button>Rejected Ideas</button>
                    <button>Requesting more Info</button>
                    <SearchField placeholder="Search..." onSearchClick={this.onSearchClick} searchText=""
                    className="test-class"/>
                </div>
                <div>
                <Link to={`/managerDashboard/challengeForm`}>Create new Challenge</Link>
                <button>Create new Challenge</button>
                <button>View current Challenge</button>

                </div>
            </div>
        )
    }
}

export default ManagerDashboard;