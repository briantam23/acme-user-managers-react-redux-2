import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Users = ({ users }) => (
    users.map(user => <li key={ user.id }>
        <Link to={ `/users/${ user.id }` }>
            { user.name }
        </Link>
    </li>)
)

const mapStateToProps = state => ({
    users: state.users
})

export default connect(mapStateToProps)(Users);