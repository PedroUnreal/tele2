import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { rangeSelectorReducer } from "./rangeSelectorReducer";
//import { addsSelectorReducer } from "./addsSelectorReducer";


const rootReducer = combineReducers({
    rangeSelectors: rangeSelectorReducer,
    //addsSelectors: addsSelectorReducer,
})

export const store = createStore(rootReducer, composeWithDevTools())
