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

    componentDidMount() {
        let { currentChallenge } = this.props
        challengeIdeas(currentChallenge._id).then(challengeinfo => {
            this.setState({ challenge: challengeinfo.data, filteredIdeas: challengeinfo.data.ideas })
        })
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
                    <div className="relatedIdeasBoxNameDescription">
                        <Link to={`/idea/${el._id}`}>{el.title}</Link>
                        <p>{el.description}</p>
                    </div>
                    <div className="relatedIdeasBoxStatus">
                        <p>Current stage: {el.status}</p>
                    </div>
                    <div className="relatedIdeasBoxVotes">
                        <p>{el.upVotes} upVotes</p>
                        <p>{el.comments.length}comments</p>


                    </div>
                </div>
            </div>
        })


        return (
            <div>
                <div className="challengePres">
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
                <button onClick={() => this.handleSort('title')}>Sort by votes</button>
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
                    <div className="relatedIdeasInnerDiv">
                        {displayIdeas}
                    </div>
                </div>
            </div>
        )
    }

}


export default CurrentChallengeIdeas