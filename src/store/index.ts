import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import { rangeSelectorReducer } from "./rangeSelectorReducer";
//import { addsSelectorReducer } from "./addsSelectorReducer";

// const middlewareEnhancer = applyMiddleware(thunkMiddleware)
// const composedEnhancers = composeWithDevTools(middlewareEnhancer)

const rootReducer = combineReducers({
    rangeSelectors: rangeSelectorReducer,
    //addsSelectors: addsSelectorReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)))

