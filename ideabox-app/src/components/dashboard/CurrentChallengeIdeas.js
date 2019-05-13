import React from 'react'
import { challengeIdeas } from '../../services/challenge'
import { Link } from 'react-router-dom'
import SearchField from "react-search-field";

class CurrentChallengeIdeas extends React.Component {

    state = {
        challenge: {},
        filteredIdeas: []
    }


    handleSort = event => {
        const type = event.target.value
        const { challenge } = this.state
        const { ideas } = challenge
        let ideasCopy = ideas.slice()

        ideasCopy.sort((a, b) => {
            return b[type] - a[type]
        })
        if (type === 'title') {
            ideasCopy.sort((a, b) => {
                return a.title.localeCompare(b.title);
            })
        }

        this.setState({
            filteredIdeas: ideasCopy
            // challenge is an object with all the keys of challenge, except for ideas, which will be replaced by ideasCopy
        })
    }

    componentDidUpdate(prevProp){
        if(prevProp.currentChallenge !== this.props.currentChallenge)
        {
            
            let { currentChallenge } = this.props
            challengeIdeas(currentChallenge._id).then(challengeinfo => {
                this.setState({ challenge: challengeinfo.data, filteredIdeas: challengeinfo.data.ideas })
            })
        }
    }
    
    onSearchClick = (searchText) => {
        const { challenge } = this.state
        const { ideas } = challenge
        let ideasCopy = ideas.slice()
        
        let filteredIdeas = ideasCopy.filter(el => {
            return (el.title.includes(searchText) || el.description.includes(searchText))
        });
        
        this.setState({
            filteredIdeas
        })
    }
    
    
    render() {
        const challengeTitle = this.state.challenge.title
        let ideasArr = this.state.filteredIdeas
        
       
        let displayIdeas = ideasArr && ideasArr.map((el, i) => {
            return <div className="relatedIdeasBox" key={i}>
                        <div className="relatedIdeasBoxInnerDiv">
                            
                                <Link to={`/idea/${el._id}`}><h4>{el.title}</h4></Link>
                                <p>{el.description}</p>
                            
                            <div className="relatedIdeasBoxStatus">
                                <p>Current stage: {el.status}</p>
                            </div>
                            
                                <div className="relatedIdeasBoxVotes"><img src="https://res.cloudinary.com/dpcx0po55/image/upload/v1557762758/IdeaBox/like_giijkj.png" alt=""/><p> {el.upVotes} up-votes</p></div>
                                
                                <p>{el.comments.length}comments</p>
                            
                        </div>
                    </div>
        })


        return (

            <div >
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
                                    <h1>{challengeTitle}</h1>
                                </div>
                                <div className="challengePresBtns">
                                    <button>Read more</button>
                                    <button>Submit Idea</button>
                                </div>
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


export default CurrentChallengeIdeas