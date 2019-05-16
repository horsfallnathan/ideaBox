import React from 'react' 
import { getUser, editUser } from '../../services/userProfile';

class UserProfile extends React.Component {

    state = {
        user: {},
        changedUser: {},
        editUser: false,
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        profileImage: ""
    }

    componentDidMount() {
        getUser().then(userInfo => {
          let user = userInfo.data 
          console.log(userInfo.data);
          this.setState({user: user, changedUser: user })
        });
      }
    
    // componentDidUpdate(prevProp) {
    //     if (prevProp.currentChallenge !== this.props.currentChallenge) {
    //         const {firstName, lastName, username, role, email, profileImage} = this.state
    //         this.setState({firstName, lastName, username, role, email, profileImage})
    //     }
    // }

      handleChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
      };

      handleSubmit(event) {
          let {firstName, lastName, username, role, email, profileImage} = this.state;
        editUser({firstName, lastName, username, role, email, profileImage})
      }

      handleEditForm = () => {
        this.setState({
            editUser:true
        })
    }

    // editForm = () => { 
    //     const {
    //         firstName, lastName, username, role, email, profileImage
    //     } = this.state
    //     const values = {
    //         firstName, lastName, username, role, email, profileImage
    //     };
    //     // editUser(values).then(response)
        
    // }

    render () {
        const {firstName, lastName, username, role, email, profileImage} = this.state.user
        return (
            <>
            


            {this.state.editUser ? (
                <div className="marginBelowNavbar">
  
                <form>
                    <label>First name: </label>
                    <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} placeholder={firstName}/>
                    <br/>
                    <label>Last name: </label>
                    <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} placeholder={lastName}/>
                    <br/>
                    <label>username: </label>
                    <input type="text" name="username" value={this.state.username} onChange={this.handleChange} placeholder={username}/>
                    <br/>
                    <label>Email: </label>
                    <input type="text" name="email" value={this.state.email} onChange={this.handleChange} placeholder={email}/>
                    <br/>
                    <label>profile image </label>
                    <input type="file" name="profileImage" value={this.state.profileImage} onChange={this.handleChange} placeholder={profileImage}/>
                    <br/>
                    <input onClick={this.handleSubmit} type="submit" value="Submit" />
                </form>

                </div> ) : (  
                <div className="marginBelowNavbar">
                <h1>Your profile</h1>
                <p>First name: {firstName}</p>
                <p>Last name: {lastName}</p>
                <p>username: {username}</p>
                <p>role: {role}</p>
                <p>email: {email}</p>
                <p>profileImage: <img src={profileImage} alt="your pic"/></p>
                <button onClick={this.handleEditForm}>Edit user</button>
            </div>
            )}
            

            </>

        )
    }
}

export default UserProfile 
