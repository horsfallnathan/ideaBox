import React from 'react' 
import Navbar from './Navbar'
import SubmittedIdeas from './SubmittedIdeas'
import ChallengePres from './ChallengePres'
import RelatedIdeas from './RelatedIdeas'


class Dashboard extends React.Component {


    render() {
        return (
            <div className="dashboard">
               <Navbar />
               <SubmittedIdeas />
               <ChallengePres />
               <RelatedIdeas challengeId={this.props.match.params.challengeId}/>
            </div>
        )
    }

}

export default Dashboard
