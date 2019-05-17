import React, { Component } from 'react'
import { getAllUsers, updateRoleToEmployee, updateRoleToManager } from '../../services/admin'

class EditUserRole extends Component {
    state = {
        users: [],
        filteredUsers: [],
        searchText: ""
    }

    componentDidMount() {
        getAllUsers().then(allUsersInfo => {
            this.setState({ users: allUsersInfo.data, filteredUsers: allUsersInfo.data })
        })
    }

    handleManager = userId => {
        updateRoleToManager(userId)
    }

    handleEmployee = userId => {
        updateRoleToEmployee(userId)
    }

    searchThroughUsers = (event) => {
        const searchText = event.target.value

        event.preventDefault()
        const { users } = this.state
        let usersCopy = users.slice()

        let filteredUsers = usersCopy.filter(el => {
            return (el.username.toLowerCase().includes(searchText.toLowerCase() || el.email.toLowerCase().includes(searchText.toLowerCase())))
        });

        this.setState({
            searchText,
            filteredUsers
        })
    }

    render() {
        const usersWithoutSuperManager = this.state.filteredUsers.filter(el => el.role === "manager" || el.role === "employee")
        const usersMapped = usersWithoutSuperManager.map((user, i) => {
            const { firstName, lastName, username, role, email, _id } = user
            return (
                <div className="relatedIdeasBox">
                    <div key={i} className="relatedIdeasBoxInnerDiv">
                        <h1>User Information</h1>
                        <br />
                        <h2>First and last name: </h2>
                        <h2>{firstName}{lastName}</h2>
                        <h4>Username: {username}</h4>
                        <h4>Role: {role}</h4>
                        <h4>Email: {email}</h4>
                        {role === "employee" ? <button onClick={() => this.handleManager(_id)}>Change role to manager</button> : <button onClick={() => this.handleEmployee(_id)}>Change role to employee</button>}
                    </div>
                </div>
            )
        })

        return (
            <div className="marginBelowNavbar main-container">
                <br /><br />
                <h2>Edit User Role</h2>
                <input
                    className="margin-left-15"
                    type="text"
                    value={this.state.searchText}
                    onChange={this.searchThroughUsers}
                    placeholder="Search"
                />
                {usersMapped}
            </div>
        )
    }
}

export default EditUserRole
