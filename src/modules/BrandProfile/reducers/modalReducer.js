import {
  SHOW_CREATE_MENU_MODAL, SHOW_CREATE_MEAL_MODAL,
  HIDE_CREATE_MENU_MODAL, HIDE_CREATE_MEAL_MODAL,
} from '../actions/modals';

const initialState = {
  menuModalVisible: false,
  mealModalVisible: false,
};

const modalReducer = (state = initialState, { type }) => {
  switch (type) {
    case SHOW_CREATE_MENU_MODAL:
      return {
        ...initialState,
        menuModalVisible: true,
      };
    case SHOW_CREATE_MEAL_MODAL:
      return {
        ...initialState,
        mealModalVisible: true,
      };
    case HIDE_CREATE_MENU_MODAL:
    case HIDE_CREATE_MEAL_MODAL: {
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
};

export default modalReducer;
