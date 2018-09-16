import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addUser } from './store';

class UserCreate extends Component {
    constructor() {
        super();
        this.state = {
            name: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        this.setState({ name: e.target.value });
    }
    handleSubmit(e) {
        console.log(this.props.ownProps)
        e.preventDefault();
        this.props.addUser({ name: this.state.name })
    }
    render() {
        const { name } = this.state;
        const { handleChange, handleSubmit } = this;
        return (
            <form onSubmit={ handleSubmit }>
                <input value={ name } onChange={ handleChange }></input>
                <button disabled={ !name }>Create</button>
            </form>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    addUser: user => dispatch(addUser(user, ownProps.history))
})

export default connect(null, mapDispatchToProps)(UserCreate);