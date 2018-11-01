export const CHANGE_EVENT_PLAN_CURRENT_STEP = 'CHANGE_EVENT_PLAN_CURRENT_STEP';
export const NEXT_EVENT_PLAN_STEP = 'NEXT_EVENT_PLAN_STEP';
export const PREV_EVENT_PLAN_STEP = 'PREV_EVENT_PLAN_STEP';

export const SELECT_MENU = 'SELECT_MENU';
export const DESELECT_MENU = 'DESELECT_MENU';
export const DESELECT_MENU_ALL = 'DESELECT_MENU_ALL';
export const SELECT_MENU_MANY = 'SELECT_MENU_MANY';

export const SELECT_EVENT = 'SELECT_EVENT';
export const DESELECT_EVENT = 'DESELECT_EVENT';

export const SHOW_RATING_MODAL = 'SHOW_RATING_MODAL';
export const HIDE_RATING_MODAL = 'HIDE_RATING_MODAL';

export const FETCH_SUGGESTED_MENU_MANY_REQUEST = 'FETCH_SUGGESTED_MENU_MANY_REQUEST';
export const FETCH_SUGGESTED_MENU_MANY_SUCCESS = 'FETCH_SUGGESTED_MENU_MANY_SUCCESS';
export const FETCH_SUGGESTED_MENU_MANY_FAILURE = 'FETCH_SUGGESTED_MENU_MANY_FAILURE';

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILURE = 'CREATE_ORDER_FAILURE';


export const changeEventPlanCurrentStep = step => ({
  type: CHANGE_EVENT_PLAN_CURRENT_STEP,
  payload: {
    step,
  },
});

export const nextEventPlanStep = () => ({
  type: NEXT_EVENT_PLAN_STEP,
});

export const prevEventPlanStep = () => ({
  type: PREV_EVENT_PLAN_STEP,
});

export const selectMenu = menu => ({
  type: SELECT_MENU,
  payload: {
    menu,
  },
});

export const deselectMenu = menuId => ({
  type: DESELECT_MENU,
  payload: {
    menuId,
  },
});

export const deselectMenuAll = () => ({
  type: DESELECT_MENU_ALL,
});

export const selectMenuMany = menus => ({
  type: SELECT_MENU_MANY,
  payload: {
    menus,
  },
});

export const selectEvent = event => ({
  type: SELECT_EVENT,
  payload: {
    event,
  },
});

export const deselectEvent = () => ({
  type: DESELECT_EVENT,
});

export const showRatingModal = () => ({
  type: SHOW_RATING_MODAL,
});

export const hideRatingModal = () => ({
  type: HIDE_RATING_MODAL,
});

export const fetchSuggestedMenuManyRequest = eventId => ({
  type: FETCH_SUGGESTED_MENU_MANY_REQUEST,
  payload: {
    eventId,
  },
});

export const fetchSuggestedMenuManySuccess = suggestedMenuList => ({
  type: FETCH_SUGGESTED_MENU_MANY_SUCCESS,
  payload: {
    suggestedMenuList,
  },
});

export const fetchSuggestedMenuManyFailure = error => ({
  type: FETCH_SUGGESTED_MENU_MANY_FAILURE,
  payload: {
    error,
  },
});

export const createOrderRequest = () => ({
  type: CREATE_ORDER_REQUEST,
});

export const createOrderSuccess = order => ({
  type: CREATE_ORDER_SUCCESS,
  payload: {
    order,
  },
});

export const createOrderFailure = error => ({
  type: CREATE_ORDER_FAILURE,
  payload: {
    error,
  },
});
