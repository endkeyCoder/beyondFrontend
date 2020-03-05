import { createStore, combineReducers } from 'redux';
import { userSession } from './reducers';

const rootReducer = combineReducers({
    userSession
})

const store = createStore(rootReducer);

export default store;