import React from 'react'
import {getAllIdeas} from '../../services/ideas'
import { Link } from 'react-router-dom'
import SearchField from "react-search-field";

class ManagerDashboardOpenIdeas extends React.Component {
    state = {
        ideas: [],
        filteredIdeas: []
    }

    componentDidMount() {
        getAllIdeas().then(allIdeas => {
            let ideas = allIdeas.data
            let openIdeas = ideas.filter((el) =>{
                return (el.category === 'Free Idea')
            })
            this.setState({ideas: openIdeas, filteredIdeas: openIdeas})
        })
    }

    onClickFilter = event => { 
        const type = event.target.value
        const { ideas } = this.state
        let ideasCopy = ideas.slice() 

        if (type === "submitted") {
            let filteredIdeas = ideasCopy.filter(el => {
            return (el.status === "submitted")
        })
        this.setState({filteredIdeas})
        }

        if (type === "Requesting more Info") {
            let filteredIdeas = ideasCopy.filter(el => {
                return (el.status === "Requesting more Info")
            })
            this.setState({filteredIdeas})
        }

        if (type === "Accepted") {
            let filteredIdeas = ideasCopy.filter(el => {
                return (el.status === "Accepted" || "Development" || "Implementation")  
            })
            this.setState({filteredIdeas})
        }

        if (type === "Rejected") {
            let filteredIdeas = ideasCopy.filter(el => {
                return (el.status === "Rejected")
            })
            this.setState({filteredIdeas})
        }
        
    }

    handleSort = event => {
        const type = event.target.value
        const { ideas } = this.state 
        let ideasCopy = ideas.slice()
        
        let filteredIdeas = ideasCopy.sort((a, b) => {
            return b[type] - a[type]
        })
        if (type === 'title') {
            ideasCopy.sort((a, b) => {
                return a.title.localeCompare(b.title);
            })
        }
        
        this.setState({
            filteredIdeas
        })
    }

    onSearchClick = (searchText) => {
        const { ideas } = this.state
        let ideasCopy = ideas.slice()
        
        let filteredIdeas = ideasCopy.filter(el => {
            return (el.title.toLowerCase().includes(searchText.toLowerCase()) || el.description.toLowerCase().includes(searchText.toLowerCase()))
        });
        
        this.setState({
            filteredIdeas
        })
    }

render() {
    let ideas = this.state.filteredIdeas
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
                <Link to={'/managerDashboard'}><button>Innovation Challenge Idea Submissions</button></Link>   
                <button>Open Idea Submissions</button>  
            </div>
            <div className="main-container">
                <div className="filteringMIdeas">
                    <button className="disabled" value="submitted" onClick={this.onClickFilter} >Ideas pending on approval</button>
                    <button className="disabled" value="Accepted" onClick={this.onClickFilter}>Accepted Ideas</button>
                    <button className="disabled" value="Rejected" onClick={this.onClickFilter}>Rejected Ideas</button>
                    <button className="disabled" value="Requesting more Info" onClick={this.onClickFilter}>Requesting more Info</button>
                    <div className="searchFieldMDashboard">
                    <select onChange={this.handleSort} name="" id="" value="Sort by" >
                            <option value="z" hidden >Sort by</ option>
                            <option value="upVotes">UpVotes</option>
                            <option value="title">Names</option>
                    </select>
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

export default ManagerDashboardOpenIdeas