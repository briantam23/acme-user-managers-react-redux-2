import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { addUsers } from './store';
import Users from './Users';
import UserCreate from './UserCreate';
import UserEdit from './UserEdit';

class Nav extends Component {
    componentDidMount() {
        this.props.addUsers();
    }
    render() {
        const { users } = this.props;
        const duplicateManagers = users.filter(user => user.managerId !== null);
        return (
            <Router>
                <div>
                    <h1>Acme Users with Managers 2</h1>
                    <ul>
                        <li><Link to='/users'>Users ({ users.length })</Link></li>
                        <li><Link to='/managers'>Managers (X)</Link></li>
                        <li><Link to='/users/create'>Users Create</Link></li>
                    </ul>
                    <Switch>
                        <Route path='/users/create' render={ ({ history }) => <UserCreate  history={ history }/> }/>
                        <Route exact path='/users' render={ () => <Users /> }/>
                        <Route path='/users/:id' render={ () => <UserEdit /> } />
                    </Switch>
                </div>
            </Router>
        )
    }
}

const mapStateToProps = state => ({
    users: state.users
})

const mapDispatchToProps = dispatch => ({
    addUsers: () => dispatch(addUsers())
})

export default connect(mapStateToProps, mapDispatchToProps)(Nav);