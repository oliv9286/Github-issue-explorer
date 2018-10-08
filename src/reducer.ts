import { Action, ActionType } from "./actions";
import { State } from "./types";

export default function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.UpdateSearchQuery:
      return {
        ...state,
        query: action.payload.link
      };

    case ActionType.IssuesChanged:
      return {
        ...state,
        issues: action.payload.issues
      };

    case ActionType.FilterChanged:
      return {
        ...state,
        filter: action.payload.filter
      };

    case ActionType.SearchErrorChanged:
      return {
        ...state,
        searchError: action.payload.error
      };

    default:
      return state;
  }
}
