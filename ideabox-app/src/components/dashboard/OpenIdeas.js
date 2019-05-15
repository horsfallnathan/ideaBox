import React from 'react'
import {getAllIdeas} from '../../services/ideas'
import { Link } from 'react-router-dom'
import SearchField from "react-search-field";

class Dashboard extends React.Component {
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
    
    
    
    render () {
        let {filteredIdeas} = this.state
        let displayIdeas = filteredIdeas.map((el, i) => {
            return <div className="relatedIdeasBox" key={i}>
            <div className="relatedIdeasBoxInnerDiv">
                <Link to={`/idea/${el._id}`}><h4>{el.title}</h4></Link>
                <p>{el.description}</p>
                <div className="relatedIdeasBoxStatus">
                    <p>Current stage: {el.status}</p>
                </div>
                <div className="relatedIdeasBoxVotes">
                    <img src="https://res.cloudinary.com/dpcx0po55/image/upload/v1557762758/IdeaBox/like_giijkj.png" alt="."></img>
                    <div><p>{el.upVotes} up-votes</p></div>
                    <img src="https://res.cloudinary.com/dpcx0po55/image/upload/v1557762768/IdeaBox/comment_schndj.png" alt="."></img>
                    <div><p>{el.comments.length} comments</p></div>
                </div>
            </div>
        </div>
        })

        return (
            <div className="openIdeas">
                    <div className="headBar">
                        <button disabled> <Link to="/">Innovation Challenge Idea Submissions</Link></button>
                        <button>Open Idea Submissions</button>
                    </div>
                    <div className="challengePres">
                        <div className="main-container">
                            <div className="challengePresInnerDiv">
                                <div className="challengePresTitleBtns">             
                                        <button><Link to="/submit-idea">Submit Idea</Link></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="main-container">
                    <div className="discoverIdeas">
                        <h2>Discover Ideas</h2>
                        <select onChange={this.handleSort} name="" id="" value="Sort by" >
                            <option value="z" hidden >Sort by</ option>
                            <option value="upVotes">UpVotes</option>
                            <option value="title">Names</option>
                        </select>
                        <SearchField
                            placeholder="Search..."
                            onSearchClick={this.onSearchClick}
                            searchText=""
                            className="test-class"
                        />
                    </div>

                    <div className="relatedIdeas">
                    {displayIdeas}
                    </div>
                    </div>
            </div>

        )
    }

}

export default Dashboard 