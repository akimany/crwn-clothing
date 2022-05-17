import { takeLatest, all, call, put } from 'redux-saga/effects';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

import {
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from './category.action';

import { CATEGORY_ACTION_TYPES } from './category.types';

// a generator which triggers with fetchCategoriesStart
// he said generators respond to actions, the same way that reducers do with their switch
// in thunks, it was the async that fired off the action but now he said we are responding to categoryStart

export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield call(getCategoriesAndDocuments, 'categories');
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield put(fetchCategoriesFailed(error));
  }
}

export function* onFetchCategories() {
  // it refers to if you have a bunch of the same actions, give me the latest one
  yield takeLatest(
    CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

// Accumulator
export function* categoriesSaga() {
  // he said it will wait until of them complete
  yield all([call(onFetchCategories)]);
}
