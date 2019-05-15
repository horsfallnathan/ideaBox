import React from 'react' 
import { getUser } from '../../services/userProfile';

class UserProfile extends React.Component {

    state = {
        user: {},
        editUser: false
    }

    componentDidMount() {
        getUser().then(userInfo => {
          let user = userInfo.data 
          console.log(userInfo.data);
          this.setState({user: user })
        });
        
      }

      handleChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
      };

      handleEditForm = () => {
        this.setState({
            editUser:true
        })
    }

    editForm = () => { 
        const {
            firstName, lastName, username, role, email, profileImage
        } = this.state
        const values = {
            firstName, lastName, username, role, email, profileImage
        };
        // editUser(values).then(response)
        
    }

    render () {
        const {user} = this.state
        const {firstName, lastName, username, role, email, profileImage } = user
        return (
            <>
            


            {this.state.editUser ? (
                <div className="marginBelowNavbar">
                <form action="POST">
                    <input type="text" value={firstName}/>
                    <input type="text" value={username}/>
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
