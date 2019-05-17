import React from "react";
import { getAllIdeas } from "../../services/ideas";
import { Link } from "react-router-dom";

class Dashboard extends React.Component {
  state = {
    ideas: [],
    filteredIdeas: [],
    searchText: ""
  };

  componentDidMount() {
    getAllIdeas().then(allIdeas => {
      let ideas = allIdeas.data;
      let openIdeas = ideas.filter(el => {
        return el.category === "Free Idea";
      });
      this.setState({ ideas: openIdeas, filteredIdeas: openIdeas });
    });
  }

  sortIdeas = event => {
    const type = event.target.value;
    const { ideas } = this.state;
    let ideasCopy = ideas.slice();

    let filteredIdeas = ideasCopy.sort((a, b) => {
      return b[type] - a[type];
    });
    if (type === "title") {
      ideasCopy.sort((a, b) => {
        return a.title.localeCompare(b.title);
      });
    }

    this.setState({
      filteredIdeas
    });
  };

  searchThroughIdeas = event => {
    const searchText = event.target.value;

    event.preventDefault();
    const { challenge } = this.state;
    const { ideas } = challenge;
    let ideasCopy = ideas.slice();

    let filteredIdeas = ideasCopy.filter(el => {
      return (
        el.title.toLowerCase().includes(searchText.toLowerCase()) ||
        el.description.toLowerCase().includes(searchText.toLowerCase())
      );
    });

    this.setState({
      searchText,
      filteredIdeas
    });
  };

  render() {
    let { filteredIdeas } = this.state;
    let displayIdeas = filteredIdeas.map((el, i) => {
      return (
        <div className="flexed-div flexed-wrap spacedBetween" key={i}>
          <div className="ideaCard marginBelowNavbar flexed-div flexed-col col-45">
            <Link to={`/idea/${el._id}`}>
              <h2>{el.title}</h2>
            </Link>
            <p>{el.description}</p>
            <h3 className="margin-top-15">Current Stage: {el.status}</h3>
            <div className="flexed-div spacedBetween margin-top-15">
              <div className="progressCircles">1</div>
              <div className="progressCircles activeStat">2</div>
              <div className="progressCircles">3</div>
              <div className="progressCircles">4</div>
              <div className="progressCircles">5</div>
            </div>
            <div className="flexed-div">
              <div className="flexed-div verticalCenter">
                <img
                  src="https://res.cloudinary.com/dxbwwhlc6/image/upload/v1557761454/like_d65yra.png"
                  width="16px"
                  alt="up votes"
                />
                <p className="margin-left-15">{`${el.upVotes} up-vote${
                  el.upVotes !== 1 ? "s" : ""
                }`}</p>
              </div>
              <div className="flexed-div verticalCenter margin-left-30">
                <img
                  src="https://res.cloudinary.com/nthnh/image/upload/v1557750841/ideaBox/baseline-create_new_folder-24px_1_vpiqrs.svg"
                  width="16px"
                  alt="up votes"
                />
                <p className="margin-left-15">{`${el.comments} comment${
                  el.comments !== 1 ? "s" : ""
                }`}</p>
              </div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div>
        <div className="flexed-div main-container flexed-wrap bannerContentCont flexed-center">
          <div className="challengeCountdown bannerContent flexed-div flexed-col textCenter">
            <h1 style={{ fontSize: "72px", color: "#ffffff" }}>
              {/* {value.day} */}
            </h1>
            <h4 className="colorWhite">
              {/* {value.day === 1 ? "day" : "days"} left to submit */}
            </h4>
          </div>
          <div className="bannerContent flexed-center">
            <h1 className="colorWhite">Ideas - without related Challenge</h1>
            <div className="flexed-div margin-top-15">
              {/* <button>
                  <Link
                    className="allLinks"
                    to="/current-challenge-information"
                  >
                    Read More
                  </Link>
                </button> */}
              <button className="margin-left-15">
                <Link className="allLinks" to="/submit-idea">
                  Submit Idea
                </Link>
              </button>
            </div>
          </div>
        </div>

        <main className="marginBelowNavbar main-container">
          <div className="flexed-div verticalCenter spacedBetween flexed-wrap">
            <h1>Discover Submitted Ideas</h1>
            <div>
              <select onChange={this.sortIdeas} value="Sort by">
                <option value="z" hidden>
                  Sort by
                </option>
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
          {displayIdeas}
        </main>
      </div>
    );
  }
}

export default Dashboard;
