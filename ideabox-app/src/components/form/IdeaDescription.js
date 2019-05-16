import React, { Component } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

class IdeaDescription extends Component {
  state = {
    value: this.props.values.category
  };
  nextStep = event => {
    event.preventDefault();
    this.props.nextStep();
  };

  render() {
    const {
      values,
      handleChange,
      handleFileUpload,
      addCurrentChallenge
    } = this.props;
    return (
      <div className={" ideaForm flexed-div flexed-col"}>
        <form>
          <div>
            <h3>Title</h3>
            <input
              type="text"
              name="title"
              value={values.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <h3>Category</h3>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="Category"
                name="category"
                value={values.category}
                onChange={addCurrentChallenge}
              >
                <FormControlLabel
                  value="Innovation Challenge"
                  control={<Radio />}
                  label="Innovation Challenge"
                />
                <FormControlLabel
                  value="Free Idea"
                  control={<Radio />}
                  label="Free Idea"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div>
            <h3>Description</h3>
            <textarea
              style={{ width: "100%" }}
              rows="6"
              name="description"
              value={values.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <div className={"flexed-div verticalCenter"}>
              <div className={"attachFileIcon"}> </div>
              <div>
                <input
                  type="file"
                  name="files"
                  id="files"
                  className="inputfile"
                  onChange={handleFileUpload}
                />
                <label htmlFor={"files"}>
                  <h3>Attach Files</h3>
                </label>
              </div>
            </div>
          </div>
          <div>
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
          </div>
          <div className={"flexed-div flexed-end"}>
            <button
              className={"ideaFormButton"}
              onClick={this.props.handleDraft}
            >
              Save as draft
            </button>
            <button
              className={"ideaFormButton margin-left-15"}
              onClick={this.nextStep}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default IdeaDescription;
