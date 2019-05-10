import React from 'react' 
import {challengeIdeas} from '../../services/challenge'
import SearchField from "react-search-field";
import { Link } from 'react-router-dom'

class ManagerDashboardChallenge extends React.Component {

    state = {
        challenge: {},
        filteredIdeas: []
    }

    componentDidMount() {
        let {challengeId} = this.props
        challengeIdeas(challengeId).then(challengeinfo => {
            this.setState({challenge: challengeinfo.data, filteredIdeas: challengeinfo.data.ideas})
            console.log(challengeinfo.data)
        })
    }

    onSearchClick = (searchText) => {
        const {challenge} = this.state
        const {ideas} = challenge
        let ideasCopy = ideas.slice()

        let filteredIdeas = ideasCopy.filter(el => {
           return (el.title.includes(searchText) || el.description.includes(searchText)) 
        });

        this.setState({
            filteredIdeas
        })
    }

    render() {
        let ideasArr = this.state.filteredIdeas
        console.log(ideasArr)
        let displayIdeas = ideasArr && ideasArr.map((el) => {
            return <div className="mDashboardIdeaBox">
                <Link to={`/my-ideas/${el._id}`}>{el.title}</Link>
                <p>{el.description}</p>
                <p>{el.upVotes} upVotes</p>
                <p>{el.comments.length}comments</p>
            </div>
        })

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
                    {displayIdeas}
                </div>
                <div>

                </div>
            </div>
        )
    }

}

export default ManagerDashboardChallenge
