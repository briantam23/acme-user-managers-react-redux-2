import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { addUsers } from './store';
import Users from './Users';
import Managers from './Managers';
import UserCreateUpdate from './UserCreateUpdate';

class Nav extends Component {
    componentDidMount() {
        this.props.addUsers();
    }
    render() {
        const { users } = this.props;
        const _managers = () => {
            let managersArr = [];
            for(let i=0; i < users.length; i++) {
                for(let j=0; j < users.length; j++) {
                    if(users[i].managerId === users[j].id) {
                        managersArr[users[i].managerId] = users[j].name;
                    }
                }
            }
            return managersArr;
        }
        const managers = _managers().filter(user => user.ManagerId !== null)
        return (
            <Router>
                <div>
                    <h1>Acme Users with Managers 2</h1>
                    <ul>
                        <li><Link to='/users'>Users ({ users.length })</Link></li>
                        <li><Link to='/managers'>Managers ({ managers.length })</Link></li>
                        <li><Link to='/users/create'>Users Create</Link></li>
                    </ul>
                    <Switch>
                        {/* <Route path='/users/create' render={ ({ history }) => <UserCreate  history={ history }/> }/>
                        <Route path='/users/:id' render={ ({ history, match }) => <UserUpdate history={ history } match={ match } _managers={ _managers() }/> } /> */}
                        <Route path={ '/users/:id' || '/users/create' } render={ ({ history, match }) => <UserCreateUpdate history={ history } match={ match } _managers={ _managers() }/> } />
                        <Route exact path='/users' render={ () => <Users _managers={ _managers() }/> }/>
                        <Route path='/managers' render={ () => <Managers managers={ managers }/> } />
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