import React, { Component } from "react";
import { setDeadline } from "../../services/challenge";

export default class SetDeadline extends Component {
  state = {
    startDate: null,
    endDate: null
  };
  handleChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    setDeadline(this.state);
  };

  // const rightNow = new Date();
  // const res = rightNow.toISOString().slice(0,10).replace(/-/g,"");

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="startDate">Start Date</label>
          <input type="date" name="startDate" onChange={this.handleChange} />
          <label htmlFor="endDate">End Date</label>
          <input type="date" name="endDate" onChange={this.handleChange} />
          <input type="submit" />
        </form>
      </div>
    );
  }
}
