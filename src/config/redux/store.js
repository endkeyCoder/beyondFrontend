import { createStore, combineReducers } from 'redux';
import { schedulingReducer, userReducer, entitiesReducer, groupsReducer, externalUsersReducer } from './reducers';

const rootReucers = combineReducers({ schedulingReducer, userReducer, entitiesReducer, groupsReducer, externalUsersReducer })
const store = createStore(rootReucers)

export default store;