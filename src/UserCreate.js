import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addUser } from './store';

class UserCreate extends Component {
    constructor() {
        super();
        this.state = {
            userName: '',
            managerName: ''
        }
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleManagerChange = this.handleManagerChange.bind(this);
    }
    handleUserChange(e) {
        this.setState({ userName: e.target.value });
    }
    handleSubmit(e) {
        const { users, addUser } = this.props;
        const { managerName, userName } = this.state;
        e.preventDefault();
        let managerId = null;
        for(let i = 0; i < users.length; i++) {
            if(users[i].name === managerName) {
                managerId = users[i].id;
            }
        }
        addUser({ name: userName, managerId })
    }
    handleManagerChange(e) {
        this.setState({ managerName: e.target.value });
    }
    render() {
        const { userName, manager } = this.state;
        const { handleUserChange, handleSubmit, handleManagerChange } = this;
        const { users } = this.props;
        return (
            <form onSubmit={ handleSubmit }>
                <input value={ userName } onChange={ handleUserChange }></input>
                <select onChange={ handleManagerChange }>
                <option>--None--</option>
                {
                    users.map(user => <option key={ user.id }>
                        { user.name }
                    </option>)
                }
                </select>
                <button disabled={ !userName }>Create</button>
            </form>
        )
    }
}

const mapStateToProps = state => ({
    users: state.users
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    addUser: user => dispatch(addUser(user, ownProps.history))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserCreate);