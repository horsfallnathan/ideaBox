import React, { Component } from "react";
import { Button, Form, TextArea, Checkbox, FormField } from "semantic-ui-react";

export default class IdeaDescription extends Component {
  nextStep = event => {
    event.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values } = this.props;
    return (
      <div>
        <Form>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={values.title}
            onChange={this.props.handleChange("title")}
          />
          <FormField>
            <Checkbox
              radio
              label="Innovation Challenge"
              name="category"
              value={1}
              checked={values.category === true}
              onChange={this.props.handleChange("category")}
            />
            <p>Ideas only related to the current innovation challenge</p>
          </FormField>
          <FormField>
            <Checkbox
              radio
              label="Free Ideas"
              name="category"
              value={2}
              checked={values.category === true}
              onChange={this.props.handleChange("category")}
            />
            <p>Ideas on any topic of your choice</p>
          </FormField>
          <label htmlFor="description">Description</label>
          <TextArea
            type="textArea"
            name="description"
            value={values.description}
            onChange={this.props.handleChange("description")}
          />
          <label htmlFor="files">Add file</label>
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