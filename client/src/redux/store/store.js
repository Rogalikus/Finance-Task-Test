import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { tickersReducer } from "../tickers-reducer/tickerReducers";

const rootReducer = combineReducers({
  tickers: tickersReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
