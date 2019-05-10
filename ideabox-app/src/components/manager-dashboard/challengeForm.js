import React from 'react'

class challengeForm extends React.Component {
  state = {
      title: "",
      description: "",
      deadline: "",
  }

  submitForm = event => {
      event.preventDefault();
      const {
        title, 
        description, 
        deadline,
    } = this.state;
    console.log(title, description, deadline)
  } 

    render() {
        // const { title, description, deadline } = this.state
        return (
            
            <div>
                {/* <form action="/managementDashboard/challengeForm" method="POST"></form>
                <label>title</label>
                <input type="text" value="title"/>
                <label>description</label>
                <input type="text" value="description" maxLength="300"/>
                <label>deadline</label>
                <input type="date"/> */}
            </div>
        )
    }
}

export default challengeForm; 