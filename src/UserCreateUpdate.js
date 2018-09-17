import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editUser, fetchUser, addUser } from './store';

class UserCreateUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            managerName: ''
        }
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        if(this.props.pathname !== '/users/create') this._fetchUser(this.props.id);
        this.handleManagerChange = this.handleManagerChange.bind(this);
    }
    componentDidUpdate(prevProps) {
        const { user, _managers, pathname } = this.props;
        if(prevProps !== this.props) {
            if(pathname === '/users/create') {
                this.setState({ userName: '', managerName: '' })
            }
            else {
                this.setState({ userName: user.name, managerName: _managers[user.managerId] });
            }
        }
    }
    handleUserChange(e) {
        this.setState({ userName: e.target.value });
    }
    handleSubmit(e) {
        const { users, editUser, addUser, pathname } = this.props;
        const { userName, managerName } = this.state;
        e.preventDefault();
        let managerId = null;
        for(let i = 0; i < users.length; i++) {
            if(users[i].name === managerName) {
                managerId = users[i].id;
            }
        }
        console.log(userName, managerId)
        pathname === '/users/create' 
        ? addUser({ name: userName, managerId })
        : editUser({ name: userName, managerId })
    }
    _fetchUser(id) {
        this.props.fetchUser(id);
    }
    handleManagerChange(e) {
        this.setState({ managerName: e.target.value });
    }
    render() {
        const { handleUserChange, handleSubmit, handleManagerChange } = this;
        const { userName='', managerName } = this.state;
        const { users, pathname } = this.props;
        return (
            <form onSubmit={ handleSubmit }>
                <input value={ userName } onChange={ handleUserChange }></input>
                <select onChange={ handleManagerChange } value={ managerName }>
                    <option>--None--</option>
                {
                    users.map(user => <option key={ user.id }>
                        { user.name }
                    </option>)
                }
                </select>
                <button disabled={ !userName }>{pathname === '/users/create' ? 'Create' : 'Update' }</button>
            </form>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    id: ownProps.match.params.id,
    user: state.user,
    users: state.users,
    pathname: ownProps.history.location.pathname
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    editUser: user => dispatch(editUser(user, ownProps.match.params.id, ownProps.history)),
    fetchUser: id => dispatch(fetchUser(id)),
    addUser: user => dispatch(addUser(user, ownProps.history))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserCreateUpdate);