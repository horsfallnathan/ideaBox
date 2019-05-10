import React from 'react' 
import {challengeIdeas} from '../../services/challenge'
import { Link } from 'react-router-dom'

class RelatedIdeas extends React.Component {
    
    state = {
        challenge: {}
    }
    
    
    handleSort = event => {
        const type = event.target.value
        const {challenge} = this.state
        const {ideas} = challenge
        let ideasCopy = ideas.slice()

        ideasCopy.sort((a,b) => {
            return b[type] - a[type]
        })
        if (type === 'title') {
            ideasCopy.sort((a, b) => {
                return a.title.localeCompare(b.title) ;
            })  
        }
        
        this.setState({
            challenge: {...challenge, ideas: ideasCopy}
            // challenge is an object with all the keys of challenge, except for ideas, which will be replaced by ideasCopy
        })
    }

    componentDidMount() {
        let {challengeId} = this.props
        challengeIdeas(challengeId).then(challengeinfo => {
            this.setState({challenge: challengeinfo.data})
        })
    }

    
    render() {
        
        let ideasArr = this.state.challenge.ideas && this.state.challenge.ideas 
        let displayIdeas = ideasArr && ideasArr.map((el) => {
            return <div className="relatedIdeasBox">
                <div className="relatedIdeasBoxInnerDiv">
                    <div className="relatedIdeasBoxNameDescription">
                        <Link to={`/my-ideas/${el._id}`}>{el.title}</Link>
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
                <button onClick={() => this.handleSort('title')}>Sort by votes</button>
                 <div className="discoverIdeas">
                    <h2>Discover Ideas</h2>
                    <select onChange={this.handleSort} name="" id="" value="Sort by" >
                    <option value="z" hidden >Sort by</ option>
                    {/* <option value="disable selected">Durr</option> */}
                    <option value="upVotes">UpVotes</option>
                    <option value="title">Names</option>
                    </select>
                    <input type="text" placeholder="Search"/>
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


export default RelatedIdeas