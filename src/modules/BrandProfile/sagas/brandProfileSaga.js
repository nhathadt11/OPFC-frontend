import {
  all, takeEvery, call, put, takeLatest,
} from 'redux-saga/effects';
import { message } from 'antd';
import { isFunction } from 'lodash';
import Api from '../../../api/Api';
import {
  CREATE_MEAL_REQUEST, DELETE_MEAL_REQUEST,
  createMealSuccess, createMealFailure, deleteMealSuccess, deleteMealFailure,
  FETCH_MEAL_MANY_REQUEST, fetchMealManyFailure, fetchMealManySuccess,
} from '../actions/meal';

function* createMeal({ payload: { meal, onSuccess } }) {
  try {
    let successMessage = 'Create meal successfully!';
    let response = {};
    if (meal.id) {
      response = yield call(Api.updateMeal, meal);
      successMessage = 'Update meal successfully!';
    } else {
      response = yield call(Api.createMeal, meal);
    }

    if (isFunction(onSuccess)) onSuccess(response.data);
    message.success(successMessage);
    yield put(createMealSuccess(response.data));
  } catch (error) {
    message.error(meal.id ? 'Could not update meal' : 'Could not create meal');
    yield put(createMealFailure(error));
  }
}

function* watchCreateMeal() {
  yield takeEvery(CREATE_MEAL_REQUEST, createMeal);
}

function* deleteMeal({ payload: { id } }) {
  try {
    yield call(Api.deleteMeal, id);
    message.success('Delete meal successfully!');
    yield put(deleteMealSuccess());
  } catch (error) {
    message.error('Could not delete meal');
    yield put(deleteMealFailure(error));
  }
}

function* watchDeleteMeal() {
  yield takeEvery(DELETE_MEAL_REQUEST, deleteMeal);
}

function* fetchMealMany() {
  try {
    const { data } = yield call(Api.fetchMealMany);
    yield put(fetchMealManySuccess(data.meals));
  } catch (error) {
    yield put(fetchMealManyFailure(error));
    message.error('Could not fetch meals');
  }
}

function* watchFetchMealMany() {
  yield takeLatest(FETCH_MEAL_MANY_REQUEST, fetchMealMany);
}

export default function* brandProfielFlow() {
  yield all([
    watchCreateMeal(),
    watchDeleteMeal(),
    watchFetchMealMany(),
  ]);
}
