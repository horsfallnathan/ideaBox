import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

const styles = theme => ({});
class IdeaDescription extends Component {
  state = {
    value: this.props.values.category
  };
  nextStep = event => {
    event.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values, classes, handleChange, handleFileUpload } = this.props;
    // const { classes } = this.props;
    return (
      <div className={"ideaForm"}>
        <form>
          <h3>Title</h3>
          <input
            type="text"
            name="title"
            value={values.title}
            onChange={handleChange}
          />
          <div />
          <h3>Category</h3>
          <div>
            <FormControl component="fieldset" className={classes.formControl}>
              <RadioGroup
                aria-label="Category"
                name="category"
                onChange={handleChange}
              >
                <FormControlLabel
                  value="Innovation Challenge"
                  control={<Radio />}
                  label="Innovation Challenge"
                />
                {/* <p>Ideas only related to the current innovation challenge</p> */}
                <FormControlLabel
                  value="Free Ideas"
                  control={<Radio />}
                  label="Free Ideas"
                />
                <p className={"disabledTest"}>
                  {/* Ideas only related to the current innovation challenge */}
                </p>
              </RadioGroup>
            </FormControl>
          </div>
          <div />
          <h3>Description</h3>
          <textarea
            style={{ width: "100%" }}
            rows="6"
            name="description"
            value={values.description}
            onChange={handleChange}
          />
          <div className={"flexed-div verticalCenter"}>
            <div className={"attachFileIcon"}> </div>
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

export default withStyles(styles)(IdeaDescription);
