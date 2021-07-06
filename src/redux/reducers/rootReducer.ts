import {combineReducers} from 'redux'
// import contactsReducer from './contactsReducer';
// import uiReducer from './uiReducer';


const initialAppState = {
  isHomePage: true,
  activePage: 'home',
  activeCategory: -1
}


function categoryReducer(
  state = initialAppState,
  action: { type: string; payload: number }) {
  switch (action.type) {
    case 'CHANGE_CATEGORY':
      console.log(state);
      return {...state, activeCategory: action.payload}

    default:
      return state
  }
}

const rootReducer = combineReducers({

  category: categoryReducer,
  // ui: uiReducer,

})

export default rootReducer;
