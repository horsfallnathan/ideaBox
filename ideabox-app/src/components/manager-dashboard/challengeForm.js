import React from 'react'
import {createChallenge} from "../../services/challenge"

class challengeForm extends React.Component {
  state = {
      title: "",
      description: "",
      deadline: "",
  }

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };
  
  handleSubmit = event => {
    event.preventDefault();

    const { title, description, deadline } = this.state;
    
    createChallenge(title, description, deadline).then(challenge => {
    let challengeId = challenge._id
    this.props.history.push(`/managerDashboard/${challengeId}`);
    });
    
    this.setState({
        title: "",
        description: "",
        deadline: ""
    })
    // :${challengeId}



    
  };

//   submitForm = event => {
//       event.preventDefault();
//       const {
//         title, 
//         description, 
//         deadline,
//     } = this.state;
//     console.log(title, description, deadline)
//   } 

    render() {
        const { title, description, deadline } = this.state
        return (
            
            <div>
                <form onSubmit={this.handleSubmit}>
                <label>title</label>
                <input type="text" name="title" value={title} onChange={this.handleChange}/>
                <label>description</label>
                <input type="text" maxLength="300" name="description" value={description} onChange={this.handleChange}/>
                <label>deadline</label>
                <input type="date" name="date" value={deadline} onChange={this.handleChange}/>
                <input type="submit" value="submit" />
                </form>
            </div>
        )
    }
}

export default challengeForm; 