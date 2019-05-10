import React, { Component } from "react";
import { drafts } from "../../services/drafts";
import { Link } from "react-router-dom";

class Drafts extends Component {
  state = {
    drafts: []
  };

  componentDidMount() {
    drafts().then(drafts => {
      this.setState({ drafts: drafts.data });
    });
  }

  render() {
    const { drafts } = this.state;
    return (
      <div>
        <h3>My Drafts</h3>
        {drafts.map((draft, i) => {
          const { title, _id } = draft;
          return (
            <div key={i}>
              <Link to={`/draft/${_id}`}>{title}</Link>
              <p>{title}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Drafts;
