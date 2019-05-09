import React from 'react' 
import Challenge from '../../'

class RelatedIdeas extends React.Component {

    
    render() {
    let ideaArr = [1,2,3,4,5,6]
    
    const displayIdeas = ideaArr.map (() => {
            return <div className="relatedIdeasBox">
                <div className="relatedIdeasBoxInnerDiv">
                    <div className="relatedIdeasBoxNameDescription">
                        <h4>Abc</h4>
                        <p>Description</p>
                    </div>
                    <div className="relatedIdeasBoxStatus">
                        <p>Current stage: development</p>
                    </div>
                    <div className="relatedIdeasBoxVotes">
                    <p># up-votes</p>
                    <p># comments</p>
                    </div>
            </div>
            </div>
        })
        
        
        return (
            <div>
                 <div className="discoverIdeas">
                    <h2>Discover Ideas</h2>
                    <select name="" id="" placeholder="Sort By"></select>
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