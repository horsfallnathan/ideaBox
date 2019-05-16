import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class AdminDashboard extends Component {
    render() {
        return (
            <div className="marginBelowNavbar main-container">
                <br />
                <h1>Idea Box Admin Dashboard</h1>
                <br />
                <button><Link to="/challenge-form" className="allLinks">Create New Challenge</Link></button>
                <br /><br />
                <button><Link to="/edit-user-role" className="allLinks">Edit User Role</Link></button>
            </div>
        )
    }
}

export default AdminDashboard
