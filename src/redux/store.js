import { legacy_createStore,applyMiddleware } from 'redux';
import {thunk} from "redux-thunk";
import Reducer from './reducers/reducers';

const store = legacy_createStore(Reducer,applyMiddleware(thunk));

export default store;
