import { AnyAction } from 'redux';

export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};

export type Action<T> = {
  type: T;
};

export function makeAction<T extends string, P>(
  type: T,
  payload: P
): ActionWithPayload<T, P>;

export function makeAction<T extends string>(type: T, payload: void): Action<T>;

export function makeAction<T extends string, P>(type: T, payload: P) {
  return { type, payload };
}
