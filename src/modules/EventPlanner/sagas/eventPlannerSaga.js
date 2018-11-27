import {
  all, takeEvery, call, put, takeLatest, select, fork,
} from 'redux-saga/effects';
import { message } from 'antd';
import { isFunction, map, find } from 'lodash';
import {
  CREATE_EVENT_REQUEST, createEventSuccess, fetchEventManyFailure,
  FETCH_EVENT_MANY_REQUEST, fetchEventManySuccess, createEventFailure,
  FETCH_EVENT_DETAIL_REQUEST, fetchEventDetailFailure, fetchEventDetailSuccess,
} from '../actions/event';
import Api from '../../../api/Api';
import {
  FETCH_SUGGESTED_MENU_MANY_REQUEST, fetchSuggestedMenuManyFailure, fetchSuggestedMenuManySuccess,
  CREATE_ORDER_REQUEST, createOrderFailure, CHANGE_SUGGESTED_MENU_MANY_PARAMS,
  deleteEventFailure, deleteEventSuccess, DELETE_EVENT_REQUEST,
} from '../actions/planningFlow';
import { parseErrorMessage } from '../../../utils/Utils';
import {
  FETCH_EVENT_PLANNER_ORDER_MANY_REQUEST, fetchEventPlannerManyFailure,
  fetchEventPlannerManySuccess, FETCH_EVENT_PLANNER_ORDER_DETAIL_REQUEST,
  fetchEventPlannerOrderDetailFailure, fetchEventPlannerOrderDetailSuccess,
  RATE_BRAND_REQUEST, rateBrandFailure,
} from '../actions/order';
import {
  markAsCompletedFailure, MARK_AS_COMPLETED_REQUEST, markAsIncompletedSuccess,
  MARK_AS_INCOMPLETED_REQUEST, markAsIncompletedFailure, markAsCompletedSuccess,
} from '../../BrandProfile/actions/order';

const getUserId = state => state.accountReducer.account.account.user.id;
const getEventId = state => state.eventPlannerReducer.event.event.id;
const getOrderId = state => state.eventPlannerReducer.order.orderDetail.orderNo;
const getSelectedMenuList = state => state.eventPlannerReducer.event.selectedMenuList;
const getSuggestedMenuManyParams = state => state.eventPlannerReducer.event.params;
const getCartItemNotes = state => state.eventPlannerReducer.event.cartItemNotes;

const getNoteForMenu = (notes, menuId) => find(
  notes,
  (_, id) => id == menuId, // eslint-disable-line
);

const generateOrderRequest = (menuList, notes) => {
  const request = map(menuList, m => ({
    menuId: m.id, quantity: 1, note: getNoteForMenu(notes, m.id),
  }));

  return request;
};

function* createEvent({ payload: { event, onSuccess } }) {
  try {
    const userId = yield select(getUserId);
    let response = {};
    let successMessage = 'Update event successfully!';

    if (event.id) {
      response = yield call(Api.updateEvent, userId, event);
    } else {
      response = yield call(Api.createEvent, userId, event);
      successMessage = 'Create event successfully!';
    }
    yield put(createEventSuccess(response.data));

    message.success(successMessage);
    if (isFunction(onSuccess)) onSuccess(response.data);
  } catch (error) {
    yield put(createEventFailure(error));
    message.error('Could not create or update Event');
    console.error(error);
  }
}

function* watchCreateEvent() {
  yield takeEvery(CREATE_EVENT_REQUEST, createEvent);
}

function* fetchEventMany() {
  try {
    const userId = yield select(state => state.accountReducer.account.account.user.id);
    const { data } = yield call(Api.fetchEventManyByUserId, userId);
    yield put(fetchEventManySuccess(data));
  } catch (error) {
    yield put(fetchEventManyFailure(error));
    message.error('Could not fetch events');
  }
}

function* watchFetchEventMany() {
  yield takeLatest(FETCH_EVENT_MANY_REQUEST, fetchEventMany);
}

function* fetchEventDetail({ payload: { eventId, success } }) {
  try {
    const { data } = yield call(Api.fetchEventDetail, eventId);
    yield put(fetchEventDetailSuccess(data));
    if (isFunction(success)) success(data);
  } catch (error) {
    message.error('Event could not be fetched.');
    yield put(fetchEventDetailFailure(error));
  }
}

function* watchFetchEventDetail() {
  yield takeLatest(FETCH_EVENT_DETAIL_REQUEST, fetchEventDetail);
}

function* fetchSuggestedMenuMany({ payload: { eventId } }) {
  try {
    const userId = yield select(getUserId);
    const params = yield select(getSuggestedMenuManyParams);
    const { data: { total, result } } = yield call(
      Api.fetchSuggestedMenuMany, userId, eventId, params,
    );
    yield put(fetchSuggestedMenuManySuccess(result, total));
  } catch (error) {
    yield put(fetchSuggestedMenuManyFailure(error));
    const errorMessage = parseErrorMessage(error);
    message.error(errorMessage);
  }
}

function* watchFetchSuggestedMenuMany() {
  yield takeLatest(FETCH_SUGGESTED_MENU_MANY_REQUEST, fetchSuggestedMenuMany);
}

function* changeSuggestedMenuManyParams() {
  const eventId = yield select(getEventId);
  yield fork(fetchSuggestedMenuMany, { payload: { eventId } });
}

function* watchChangeSuggestedMenuManyParams() {
  yield takeLatest(CHANGE_SUGGESTED_MENU_MANY_PARAMS, changeSuggestedMenuManyParams);
}

function* createOrder() {
  try {
    const userId = yield select(getUserId);
    const eventId = yield select(getEventId);
    const selectedMenuList = yield select(getSelectedMenuList);
    const cartItemNotes = yield select(getCartItemNotes);

    const orderRequest = generateOrderRequest(selectedMenuList, cartItemNotes);

    const { data } = yield call(Api.createOrder, userId, eventId, orderRequest);

    // yield put(createOrderSuccess(data));
    // yield put(deselectMenuAll());
    // yield put(changeEventPlanCurrentStep(0));

    // message.success('Create Order successfully!');
    window.location.href = data.redirect;
  } catch (error) {
    message.error('Order could be made.');
    yield put(createOrderFailure(error));
  }
}

function* watchCreateOrder() {
  yield takeLatest(CREATE_ORDER_REQUEST, createOrder);
}

function* fetchEventPlannerOrderMany() {
  try {
    const userId = yield select(getUserId);
    const { data } = yield call(Api.fetchEventPlannerOrderMany, userId);

    yield put(fetchEventPlannerManySuccess(data));
  } catch (error) {
    message.error('Could not fetch orders.');
    yield put(fetchEventPlannerManyFailure(error));
  }
}

function* watchFetchEventPlannerOrderMany() {
  yield takeLatest(FETCH_EVENT_PLANNER_ORDER_MANY_REQUEST, fetchEventPlannerOrderMany);
}

function* fetchEventPlannerOrderDetail({ payload: { orderId } }) {
  try {
    const { data } = yield call(Api.fetchEventPlannerDetail, orderId);
    yield put(fetchEventPlannerOrderDetailSuccess(data));
  } catch (error) {
    message.error('Could not fetch order detail.');
    yield put(fetchEventPlannerOrderDetailFailure(error));
  }
}

function* watchFetchEventPlannerOrderDetail() {
  yield takeLatest(FETCH_EVENT_PLANNER_ORDER_DETAIL_REQUEST, fetchEventPlannerOrderDetail);
}

function* markAsCompleted({ payload: { orderLineId } }) {
  try {
    yield call(Api.markAsCompleted, orderLineId);

    const orderId = yield select(getOrderId);
    yield fork(fetchEventPlannerOrderDetail, { payload: { orderId } });
    message.success('Order has been marked as completed.');
    yield put(markAsCompletedSuccess());
  } catch (error) {
    message.error('Order could not be marked as completed.');
    yield put(markAsCompletedFailure(error));
  }
}

function* watchMarkAsCompleted() {
  yield takeLatest(MARK_AS_COMPLETED_REQUEST, markAsCompleted);
}

function* markAsIncompleted({ payload: { orderLineId } }) {
  try {
    yield call(Api.markAsIncompleted, orderLineId);

    const orderId = yield select(getOrderId);
    yield fork(fetchEventPlannerOrderDetail, { payload: { orderId } });
    message.success('Order has been marked as incompleted.');
    yield put(markAsIncompletedSuccess());
  } catch (error) {
    message.error('Order could not be marked as incompleted.');
    yield put(markAsIncompletedFailure(error));
  }
}

function* watchMarkAsIncompleted() {
  yield takeLatest(MARK_AS_INCOMPLETED_REQUEST, markAsIncompleted);
}

function* rateBrand({ payload: { orderLineId, rate, success } }) {
  try {
    const userId = yield select(getUserId);

    yield call(Api.rateBrand, userId, orderLineId, rate);

    const orderId = yield select(getOrderId);
    yield fork(fetchEventPlannerOrderDetail, { payload: { orderId } });

    message.success('Rating has bessn successfully posted.');
    if (isFunction(success)) success();
  } catch (error) {
    yield put(rateBrandFailure(error));
    message.error('Rating could not be posted.');
  }
}

function* watchRateBrand() {
  yield takeEvery(RATE_BRAND_REQUEST, rateBrand);
}

function* deleteEvent({ payload: { eventId } }) {
  try {
    const userId = yield select(getUserId);

    yield call(Api.deleteEvent, userId, eventId);

    yield put(deleteEventSuccess());
    yield fork(fetchEventMany);
    message.success('Event has been deleted successfully!');
  } catch (error) {
    yield put(deleteEventFailure(error));
    message.error('Event could not be deleted.');
  }
}

function* watchDeleteEvent() {
  yield takeEvery(DELETE_EVENT_REQUEST, deleteEvent);
}

export default function* eventFlow() {
  yield all([
    watchCreateEvent(),
    watchFetchEventMany(),
    watchFetchSuggestedMenuMany(),
    watchCreateOrder(),
    watchFetchEventPlannerOrderMany(),
    watchFetchEventPlannerOrderDetail(),
    watchFetchEventDetail(),
    watchMarkAsCompleted(),
    watchMarkAsIncompleted(),
    watchChangeSuggestedMenuManyParams(),
    watchRateBrand(),
    watchDeleteEvent(),
  ]);
}
