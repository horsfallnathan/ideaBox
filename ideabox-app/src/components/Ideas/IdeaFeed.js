import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getAllIdeas } from "../../services/ideas";

class IdeaFeed extends Component {
  state = {
    ideas: [],
    filteredIdeas: [],
    searchText: ''
  };



  componentDidMount() {
    getAllIdeas().then(ideas => {
      this.setState({ ideas: ideas.data, filteredIdeas: ideas.data });
    });
  }

  sortIdeas = event => {
    
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

  mapIdeas = () => {
    const { filteredIdeas } = this.state;

    return filteredIdeas.map((idea, i) => {
      const { title, description, status, upVotes, comments, _id } = idea;
      return (
        <React.Fragment>
          <div className="ideaCard marginBelowNavbar flexed-div flexed-col col-45">
            <h2>
              <Link className="allLinks" to={`/idea/${_id}`}>
                {title}
              </Link>
            </h2>
            <p>{description}</p>
            <h3 className="margin-top-15">Current Stage: {status}</h3>
            <div className="flexed-div spacedBetween margin-top-15">
              <div
                className={`progressCircles ${
                  status === "Submitted" ? "activeStat" : " "
                }`}
              >
                1
              </div>
              <div
                className={`progressCircles ${
                  status === "Validation" ? "activeStat" : " "
                }`}
              >
                2
              </div>
              <div
                className={`progressCircles ${
                  status === "Development" ? "activeStat" : " "
                }`}
              >
                3
              </div>
              <div
                className={`progressCircles ${
                  status === "Pitch" ? "activeStat" : " "
                }`}
              >
                4
              </div>

              <div
                className={`progressCircles ${
                  status === "Implementation" ? "activeStat" : " "
                }`}
              >
                5
              </div>
            </div>
            <div className="flexed-div">
              <div className="flexed-div verticalCenter">
                <img
                  src="https://res.cloudinary.com/nthnh/image/upload/v1557750841/ideaBox/baseline-create_new_folder-24px_1_vpiqrs.svg"
                  width="16px"
                  alt="up votes"
                />
                <p className="margin-left-15">{`${upVotes} up-vote${
                  upVotes !== 1 ? "s" : ""
                }`}</p>
              </div>
              <div className="flexed-div verticalCenter margin-left-30">
                <img
                  src="https://res.cloudinary.com/nthnh/image/upload/v1557750841/ideaBox/baseline-create_new_folder-24px_1_vpiqrs.svg"
                  width="16px"
                  alt="up votes"
                />
                <p className="margin-left-15">{`${comments.length} comment${
                  comments.length !== 1 ? "s" : ""
                }`}</p>
              </div>
            </div>
          </div>
        </React.Fragment>
        // <div className="relatedIdeasBox" >
        //     <div key={i} className="relatedIdeasBoxInnerDiv" >
        //         <Link to={`/idea/${_id}`}>{title}</Link>
        //         <p>{description}</p>
        //         <div className="relatedIdeasBoxStatus"><p>Current stage: {status}</p></div>
        //         <p>{upVotes} up-votes</p>
        //         <p>{comments.length} comments</p>
        //     </div>
        // </div>
      );
    });
  };

  render() {
    const { ideas } = this.state;
    return (
      <div className="marginBelowNavbar main-container">
        <div className="flexed-div verticalCenter spacedBetween flexed-wrap">
          <h1>Idea Feed</h1>
          <div>
              <select onChange={this.sortIdeas} value="Sort by" >
                   <option value="z" hidden >Sort by</ option>
                   <option value="upVotes">UpVotes</option>
                   <option value="title">Names</option>
              </select>
              <input
                className="margin-left-15"
                type="text"
                value={this.state.searchText}
                onChange={this.searchThroughIdeas}
                placeholder="Search"
              />
          </div>
        </div>
        {ideas && ideas.length && ideas.length > 0 ? (
          <div className="flexed-div flexed-wrap spacedBetween">
            {this.mapIdeas()}
          </div>
        ) : (
          <>
            <h4>No ideas available to show in the feed</h4>
            <Link to="/submit-idea">Click here to submit a new idea</Link>
          </>
        )}
      </div>
    );
  }
}

export default IdeaFeed;
