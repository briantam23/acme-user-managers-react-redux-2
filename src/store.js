import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import axios from 'axios';

const ADD_USERS = 'ADD_USERS';

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

const usersReducer = (state = [], action) => {
    switch(action.type) {
        case ADD_USERS:
            return state = action.users;
        default:
            return state;
    }
}

const reducer = combineReducers({
    users: usersReducer
})

const store = createStore(reducer, applyMiddleware(logger, thunk));

export default store;