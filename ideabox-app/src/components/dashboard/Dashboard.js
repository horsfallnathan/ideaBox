import React from 'react' 
import Navbar from './Navbar'
import SubmittedIdeas from './SubmittedIdeas'
import ChallengePres from './ChallengePres'
import DiscoverIdeas from './DiscoverIdeas'


class Dashboard extends React.Component {


    render() {
        return (
            <div className="dashboard">
               <Navbar />
               <SubmittedIdeas />
               <ChallengePres />
               <DiscoverIdeas />
            </div>
        )
    }

}

export default Dashboard
