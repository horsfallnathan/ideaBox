import React, { Component } from 'react'
import { getAllUsers, updateRoleToEmployee, updateRoleToManager } from '../../services/admin'

class EditUserRole extends Component {
    state = {
        users: []
    }

    componentDidMount() {
        getAllUsers().then(allUsersInfo => {
            this.setState({ users: allUsersInfo.data })
        })
    }

    handleManager = userId => {
        updateRoleToManager(userId)
    }

    handleEmployee = userId => {
        updateRoleToEmployee(userId)
    }

    render() {
        const usersWithoutSuperManager = this.state.users.filter(el => el.role === "manager" || el.role === "employee")
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
            <div className="main-container">
                <h2>Edit User Role</h2>
                {usersMapped}
            </div>
        )
    }
}

export default EditUserRole
