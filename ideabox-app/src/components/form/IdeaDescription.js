import React, { Component } from "react";
import { Button, Form, TextArea, Checkbox } from "semantic-ui-react";

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
        <Form>
          <h3>Title</h3>
          <input
            type="text"
            name="title"
            value={values.title}
            onChange={this.props.handleChange("title")}
          />
          <Form.Field />
          <h3>Category</h3>
          <Form.Field>
            <Checkbox
              radio
              label="Innovation Challenge"
              name="categoryRadio"
              value="Innovation Challenge"
              checked={values.category === "Innovation Challenge"}
              onChange={this.props.handleCategoryChange}
            />
            <p>Ideas only related to the current innovation challenge</p>
          </Form.Field>
          <Form.Field>
            <Checkbox
              radio
              label="Free Ideas"
              name="categoryRadio"
              value="Free Idea"
              checked={values.category === "Free Idea"}
              onChange={this.props.handleCategoryChange}
            />
            <p>Ideas on any topic of your choice</p>
          </Form.Field>
          <h3>Description</h3>
          <TextArea
            type="textArea"
            name="description"
            value={values.description}
            onChange={this.props.handleChange("description")}
          />
          <h3>Attach File</h3>
          <input
            type="file"
            name="files"
            value={values.files}
            onChange={this.props.handleChange("files")}
          />
          <Button onClick={this.nextStep}>Next</Button>
        </Form>
      </div>
    );
  }
}
