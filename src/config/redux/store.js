import { createStore, combineReducers } from 'redux';
import { schedulingReducer, userReducer, entitiesReducer, groupsReducer } from './reducers';

const rootReucers = combineReducers({ schedulingReducer, userReducer, entitiesReducer, groupsReducer })
const store = createStore(rootReucers)

export default store;