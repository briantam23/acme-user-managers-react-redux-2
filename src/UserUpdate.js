/* import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editUser, fetchUser } from './store';

class UserUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            managerName: ''
        }
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this._fetchUser(this.props.id);
        this.handleManagerChange = this.handleManagerChange.bind(this);
    }
    componentDidUpdate(prevProps) {
        const { user, _managers } = this.props;
        if(prevProps !== this.props) {
            console.log(this.props)
            this.setState({ userName: user.name, managerName: _managers[user.managerId] });
        }
    }
    handleUserChange(e) {
        this.setState({ userName: e.target.value });
    }
    handleSubmit(e) {
        const { users, editUser } = this.props;
        const { userName, managerName } = this.state;
        e.preventDefault();
        let managerId = null;
        for(let i = 0; i < users.length; i++) {
            if(users[i].name === managerName) {
                managerId = users[i].id;
            }
        }
        editUser({ name: userName, managerId });
    }
    _fetchUser(id) {
        this.props.fetchUser(id);
    }
    handleManagerChange(e) {
        this.setState({ managerName: e.target.value });
    }
    render() {
        const { handleUserChange, handleSubmit, handleManagerChange } = this;
        const { userName, managerName } = this.state;
        const { users } = this.props;
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
                <button disabled={ !userName }>Update</button>
            </form>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    id: ownProps.match.params.id,
    user: state.user,
    users: state.users
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    editUser: user => dispatch(editUser(user, ownProps.match.params.id, ownProps.history)),
    fetchUser: id => dispatch(fetchUser(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserUpdate); */