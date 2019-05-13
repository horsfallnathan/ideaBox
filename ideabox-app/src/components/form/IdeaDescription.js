import React, { Component } from "react";

export default class IdeaDescription extends Component {
  state = {
    value: this.props.values.category
  };
  nextStep = event => {
    event.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values } = this.props;
    return (
      <div>
        <form>
          <h3>Title</h3>
          <input
            type="text"
            name="title"
            value={values.title}
            onChange={this.props.handleChange("title")}
          />
          <div />
          <h3>Category</h3>
          <div>
            <input
              radio
              label="Innovation Challenge"
              name="categoryRadio"
              value="Innovation Challenge"
              checked={values.category === "Innovation Challenge"}
              onChange={this.props.handleCategoryChange}
            />
            <p>Ideas only related to the current innovation challenge</p>
          </div>
          <div>
            <input
              radio
              label="Free Ideas"
              name="categoryRadio"
              value="Free Idea"
              checked={values.category === "Free Idea"}
              onChange={this.props.handleCategoryChange}
            />
            <p>Ideas on any topic of your choice</p>
          </div>
          <h3>Description</h3>
          <textarea
            type="textArea"
            name="description"
            value={values.description}
            onChange={this.props.handleChange("description")}
          />
          <h3>Attach File</h3>
          <input
            type="file"
            name="files"
            onChange={this.props.handleFileUpload}
          />
          {values.fileNames &&
            values.fileNames.map((file, i) => {
              return (
                <ul key={i}>
                  <li>{file}</li>
                  <li>
                    <button onClick={() => this.props.handleFileRemove(i)}>
                      Delete
                    </button>
                  </li>
                </ul>
              );
            })}
          <button onClick={this.props.handleDraft}>Save as draft</button>
          <button onClick={this.nextStep}>Next</button>
        </form>
      </div>
    );
  }
}
