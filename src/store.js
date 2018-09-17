import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import axios from 'axios';

const ADD_USERS = 'ADD_USERS';
const ADD_USER = 'ADD_USER';
const DESTROY_USER = 'DESTROY_USER';
const EDIT_USER = 'EDIT_USER';
const FETCH_USER = 'FETCH_USER';

const _addUsers = users => ({
    type: ADD_USERS,
    users
})
export const addUsers = () => (
    dispatch => {
        axios.get('/api/users')
            .then(res => res.data)
            .then(users => dispatch(_addUsers(users)))
    }
)
const _addUser = user => ({
    type: ADD_USER,
    users: user
})
export const addUser = (user, history) => (
    dispatch => {
        axios.post('/api/users', user)
            .then(res => res.data)
            .then(user => {
                dispatch(_addUser(user));
                history.push('/users');
            })
    }
)
const _destroyUser = user => ({
    type: DESTROY_USER,
    users: user
})
export const destroyUser = user => (
    dispatch => {
        axios.delete(`/api/users/${user.id}`)
            .then(() => dispatch(_destroyUser(user)))
    }
)
const _editUser = user => ({
    type: EDIT_USER,
    users: user
})
export const editUser = (user, id, history) => (
    dispatch => {
        axios.put(`/api/users/${id}`, user)
            .then(res => res.data)
            .then(user => {
                dispatch(_editUser(user));
                history.push('/users');
            })
    }
)
const _fetchUser = user => ({
    type: FETCH_USER,
    user
})
export const fetchUser = id => (
    dispatch => {
        axios.get(`/api/users/${id}`)
            .then(res => res.data)
            .then(user => dispatch(_fetchUser(user)))
    }
)

const usersReducer = (state = [], action) => {
    switch(action.type) {
        case ADD_USERS:
            return action.users;
        case ADD_USER:
            return [...state, action.users];
        case DESTROY_USER:
            return state.filter(user => user.id !== action.users.id);
        case EDIT_USER:
            return state.map(user => user.id !== action.users.id ? user : action.users);
        default:
            return state;
    }
}
const userReducer = (state = {}, action) => {
    switch(action.type) {
        case FETCH_USER:
            return action.user;
        default:
            return state;
    }
}

const reducer = combineReducers({
    users: usersReducer,
    user: userReducer
})

const store = createStore(reducer, applyMiddleware(logger, thunk));

export default store;