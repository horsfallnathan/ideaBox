import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class AdminDashboard extends Component {
    render() {
        return (
            <div>
                <h1>Idea Box Admin Dashboard</h1>
                <button><Link to="/challenge-form">Create New Challenge</Link></button>
                <button><Link to="/edit-user-role">Edit User Role</Link></button>
                <button><Link to="/">Update Idea Status</Link></button>
            </div>
        )
    }
}

export default AdminDashboard
