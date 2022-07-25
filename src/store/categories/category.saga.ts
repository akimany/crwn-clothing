import { takeLatest, all, call, put } from 'typed-redux-saga/macro';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

import {
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from './category.action';

import { CATEGORY_ACTION_TYPES } from './category.types';

// in thunks, it was the async that fired off the action but now he said we are responding to categoryStart

export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield* call(getCategoriesAndDocuments);
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield put(fetchCategoriesFailed(error as Error));
  }
}

export function* onFetchCategories() {
  yield takeLatest(
    CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

// Accumulator
export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}
