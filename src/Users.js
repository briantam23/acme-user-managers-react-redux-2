import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { destroyUser } from './store';

const Users = ({ users, destroyUser, _managers }) => {
    return (
        users.map(user => <li key={ user.id }>
            <Link to={ `/users/${ user.id }` }>
                { user.name }
            </Link> { user.managerId && _managers[user.managerId] ? 'managed by ' + _managers[user.managerId] : null }
            <button onClick={ () => destroyUser(user) }>X</button>
        </li>)
    )
}

const mapStateToProps = state => ({
    users: state.users
})

const mapDispatchToProps = dispatch => ({
    destroyUser: user => dispatch(destroyUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(Users);