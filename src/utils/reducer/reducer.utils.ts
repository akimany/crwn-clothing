import { AnyAction } from 'redux';

type Matchable<AC extends () => AnyAction> = AC & {
  type: ReturnType<AC>['type'];
  match(action: AnyAction): action is ReturnType<AC>;
};

export function withMatcher<AC extends () => AnyAction & { type: string }>(
  actionMaker: AC
): Matchable<AC>;

export function withMatcher<
  AC extends (...args: any[]) => AnyAction & { type: string }
>(actionMaker: AC): Matchable<AC>;

export function withMatcher(actionMaker: Function) {
  const type = actionMaker().type;
  return Object.assign(actionMaker, {
    type,
    match(action: AnyAction) {
      return action.type === type;
    },
  });
}

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
