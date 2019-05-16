import React from 'react'
import {getAllIdeas} from '../../services/ideas'
import { Link } from 'react-router-dom'

class ManagerDashboardOpenIdeas extends React.Component {
    state = {
        ideas: [],
        filteredIdeas: [],
        searchText: '',
        filterButton1: false,
        filterButton2: false,
        filterButton3: false,
        filterButton4: false

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

    flipChallengeViewOpen = () => {
        this.setState({
          openView: true,
          leftBannerButton: false,
          rightBannerButton: true,
          filterButton: false
        });
      };
      flipChallengeViewInnovation = () => {
        this.setState({
          openView: false,
          leftBannerButton: true,
          rightBannerButton: false
        });
      };



    onClickFilter = event => { 
        const type = event.currentTarget.getAttribute('value')
        const { ideas } = this.state
        let ideasCopy = ideas.slice() 

        if (type === "Submitted") {
            let filteredIdeas = ideasCopy.filter(el => {
            return (el.status === "Submitted")
        })
        this.setState({filteredIdeas, filterButton1: true, filterButton2: false, filterButton3: false, filterButton4: false})
        }

        if (type === "Requesting more info") {
            let filteredIdeas = ideasCopy.filter(el => {
                return (el.status === "Requesting more info")
            })
            this.setState({filteredIdeas, filterButton2: true, filterButton1: false, filterButton3: false, filterButton4: false})
        }

        if (type === "Accepted") {
            let filteredIdeas = ideasCopy.filter(el => {
                return (el.status === "Accepted" || el.status === "Development" || el.status === "Implementation")  
            })
            this.setState({filteredIdeas, filterButton3: true, filterButton2: false, filterButton1: false, filterButton4: false})
        }

        if (type === "Rejected") {
            let filteredIdeas = ideasCopy.filter(el => {
                return (el.status === "Rejected")
            })
            this.setState({filteredIdeas, filterButton4: true, filterButton2: false, filterButton3: false, filterButton1: false})
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

    searchThroughIdeas = (event) => {
      const searchText = event.target.value
      
      event.preventDefault()
      const { ideas } = this.state
      let ideasCopy = ideas.slice()
      
      let filteredIdeas = ideasCopy.filter(el => {
          return (el.title.toLowerCase().includes(searchText.toLowerCase()) || el.description.toLowerCase().includes(searchText.toLowerCase()))
      });
      
      this.setState({
          searchText,
          filteredIdeas
      })
  }

render() {
    let ideas = this.state.filteredIdeas
    let displayIdeas = ideas.map((el, i) => {
        return (
            <div key={i} className="managerIdeaCard margin-bot-30">
              <div className="flexed-div nbannerCont flexed-end">
                <div className="notificationBanner">
                  <p>Pending Your Review</p>
                </div>
              </div>
              <Link to={`/idea/${el._id}`}>
                <h3>{el.title}</h3>
              </Link>
              <p>{el.description}</p>
              <p>Status: {el.status}</p>
              <div className="flexed-div spacedBetween margin-top-15">
                <div
                  className={`progressCircles ${
                    el.status === "Submitted" ? "activeStat" : " "
                  }`}
                >
                  1
                </div>
                <div
                  className={`progressCircles ${
                    el.status === "Validation" ? "activeStat" : " "
                  }`}
                >
                  2
                </div>
                <div
                  className={`progressCircles ${
                    el.status === "Development" ? "activeStat" : " "
                  }`}
                >
                  3
                </div>
                <div
                  className={`progressCircles ${
                    el.status === "Pitch" ? "activeStat" : " "
                  }`}
                >
                  4
                </div>
  
                <div
                  className={`progressCircles ${
                    el.status === "Implementation" ? "activeStat" : " "
                  }`}
                >
                  5
                </div>
              </div>
              <div className="flexed-div margin-top-15">
                <div className="flexed-div verticalCenter">
                  <img
                    src="https://res.cloudinary.com/nthnh/image/upload/v1557750841/ideaBox/baseline-create_new_folder-24px_1_vpiqrs.svg"
                    width="16px"
                    alt="up votes"
                  />
                  <p className="margin-left-15">{el.upVotes.length}</p>
                </div>
                <div className="flexed-div verticalCenter margin-left-30">
                  <img
                    src="https://res.cloudinary.com/nthnh/image/upload/v1557750841/ideaBox/baseline-create_new_folder-24px_1_vpiqrs.svg"
                    width="16px"
                    alt="up votes"
                  />
                  <p className="margin-left-15">{el.comments.length}</p>
                </div>
              </div>
            </div>
          );
    })
    return (
        <div>
        <div className={"flexed-div main-container flexed-col"}>
      <div className="bannerButtonsDiv flexed-div spacedEvenly">
      <Link
                  value="Submitted"
                  onClick={this.onClickFilter}
                  className={`allLinks subButtons textCenter filterButton1 ${
                    this.state.filterButton1 ? "active" : "inactive"
                  }`}
                  >
                  <h3>Ideas Pending Your Approval</h3>
                </Link>
                <Link
                  value="Accepted"
                  className={`allLinks subButtons textCenter filterButton3 ${
                    this.state.filterButton3 ? "active" : "inactive"
                  }`}
                  onClick={this.onClickFilter}
                >
                  <h3>Accepted Ideas</h3>
                </Link>
                <Link
                  value="Rejected"
                  className={`allLinks subButtons textCenter filterButton4 ${
                    this.state.filterButton4 ? "active" : "inactive"
                  }`}
                  onClick={this.onClickFilter}
                >
                  <h3>Rejected Ideas</h3>
                </Link>
                <Link
                  value="Requesting more info"
                  className={`allLinks subButtons textCenter filterButton2 ${
                    this.state.filterButton2? "active" : "inactive"
                  }`}
                  onClick={this.onClickFilter}
                >
                  <h3>Requesting More Info</h3>
                </Link>
              </div>
            </div>
            <div className="flexed-div flexed-center">
              <input
                className="margin-left-15"
                type="text"
                value={this.state.searchText}
                onChange={this.searchThroughIdeas}
                placeholder="Search"
              />
            </div>
            <div className="main-container flexed-div spacedBetween flexed-wrap">
              {displayIdeas}
            </div>
              </div>
        // <div>
        //     <div className="headBar">                 
        //         <Link to={'/managerDashboard'}><button>Innovation Challenge Idea Submissions</button></Link>   
        //         <button>Open Idea Submissions</button>  
        //     </div>
        //     <div className="main-container">
        //         <div className="filteringMIdeas">
        //             <button className="disabled" value="submitted" onClick={this.onClickFilter} >Ideas pending on approval</button>
        //             <button className="disabled" value="Accepted" onClick={this.onClickFilter}>Accepted Ideas</button>
        //             <button className="disabled" value="Rejected" onClick={this.onClickFilter}>Rejected Ideas</button>
        //             <button className="disabled" value="Requesting more Info" onClick={this.onClickFilter}>Requesting more Info</button>
        //             <div className="searchFieldMDashboard">
        //             <select onChange={this.handleSort} name="" id="" value="Sort by" >
        //                     <option value="z" hidden >Sort by</ option>
        //                     <option value="upVotes">UpVotes</option>
        //                     <option value="title">Names</option>
        //             </select>
        //             <SearchField placeholder="Search..." onSearchClick={this.onSearchClick} searchText=""
        //             className="test-class"/>
        //             </div>
                
        //         </div>
        //         <div>
        //         <Link to={`/managerDashboard/challengeForm`}>Create new Challenge</Link>    
        //         <Link to={`/managerDashboard/all-challenges`}>View upcoming challenges</Link>
        //         </div>
        //         <div className="ideasContainer">
        //         {displayIdeas}
        //         </div>
        //         </div>
        // </div>
        )
    }

}   

export default ManagerDashboardOpenIdeas