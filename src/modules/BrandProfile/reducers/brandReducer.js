import {
  FETCH_BRAND_DETAIL_REQUEST, FETCH_BRAND_DETAIL_SUCCESS, FETCH_BRAND_DETAIL_FAILURE,
  FETCH_BRAND_MEAL_MANY_REQUEST, FETCH_BRAND_MENU_MANY_REQUEST, FETCH_BRAND_MEAL_MANY_FAILURE,
  FETCH_BRAND_MENU_MANY_FAILURE, FETCH_BRAND_MEAL_MANY_SUCCESS, FETCH_BRAND_MENU_MANY_SUCCESS,
} from '../actions/brand';

const initialState = {
  brandDetail: {},
  mealList: [],
  mealPage: 1,
  mealTotal: 0,
  menuList: [],
  menuPage: 1,
  menuTotal: 0,
  fetchingBrandDetail: false,
  fetchingMenu: false,
  fetchingMeal: false,
};

const brandReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_BRAND_DETAIL_REQUEST:
      return {
        ...state,
        fetchingBrandDetail: true,
      };
    case FETCH_BRAND_MEAL_MANY_REQUEST:
      return {
        ...state,
        fetchingMeal: true,
        mealPage: payload.page,
      };
    case FETCH_BRAND_MENU_MANY_REQUEST:
      return {
        ...state,
        fetchingMenu: true,
        menuPage: payload.page,
      };
    case FETCH_BRAND_DETAIL_SUCCESS:
      return {
        ...state,
        fetchingBrandDetail: false,
        brandDetail: payload.brandDetail,
      };
    case FETCH_BRAND_MEAL_MANY_SUCCESS:
      return {
        ...state,
        fetchingMeal: false,
        mealList: payload.mealList,
        mealTotal: payload.total,
      };
    case FETCH_BRAND_MENU_MANY_SUCCESS:
      return {
        ...state,
        fetchingMenu: false,
        menuList: payload.menuList,
        menuTotal: payload.total,
      };
    case FETCH_BRAND_DETAIL_FAILURE:
      return {
        ...state,
        fetchingBrandDetail: false,
      };
    case FETCH_BRAND_MEAL_MANY_FAILURE:
      return {
        ...state,
        fetchingMeal: false,
      };
    case FETCH_BRAND_MENU_MANY_FAILURE:
      return {
        ...state,
        fetchingMenu: false,
      };
    default:
      return state;
  }
};

export default brandReducer;
