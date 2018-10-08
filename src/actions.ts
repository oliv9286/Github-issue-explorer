import { ThunkAction as ReduxThunkAction } from "redux-thunk";
import { State, Dispatch, Issue, Filter } from "./types";
import * as axios from "axios";

type ThunkAction = ReduxThunkAction<void, State, void>;

interface $Action<Type> {
  readonly type: Type;
}
interface $ActionWithPayload<Type, Payload extends object>
  extends $Action<Type> {
  readonly payload: Payload;
}

export enum ActionType {
  Dummy = "TEST",
  UpdateSearchQuery = "UPDATE_SEARCH_QUERY",
  IssuesChanged = "ISSUES_CHANGED",
  FilterChanged = "FILTER_CHANGED",
  SearchErrorChanged = "search_error_changed"
}

// Actions
type DummyAction = $Action<ActionType.Dummy>;
type UpdateSearchQueryAction = $ActionWithPayload<
  ActionType.UpdateSearchQuery,
  {
    link: string | null;
  }
>;
type IssuesChanged = $ActionWithPayload<
  ActionType.IssuesChanged,
  { issues: Issue[] }
>;
type FilterChanged = $ActionWithPayload<
  ActionType.FilterChanged,
  { filter: Filter }
>;
type SearchErrorChanged = $ActionWithPayload<
  ActionType.SearchErrorChanged,
  { error: string | null }
>;

export type Action =
  | DummyAction
  | UpdateSearchQueryAction
  | IssuesChanged
  | FilterChanged
  | SearchErrorChanged;

// global cosnts
const apiClient = axios.default.create({ baseURL: "https://api.github.com" });
const ISSUES_PER_PAGE = 50;

// Action Creators
export const searchIssues = (link: string) => async (dispatch: Dispatch) => {
  // TODO: split to a helper
  const paths = link.replace("https://", "").split("/");
  if (paths.length < 3 || paths[0] != "github.com") {
    dispatch({
      type: ActionType.SearchErrorChanged,
      payload: { error: "Invalid GitHub URL" }
    });
    return;
  }
  const username = paths[1];
  const repo = paths[2];

  dispatch({
    type: ActionType.SearchErrorChanged,
    payload: { error: null }
  });

  const issues = await apiClient
    .get(`/repos/${username}/${repo}/issues`, {
      params: { page: 1, per_page: ISSUES_PER_PAGE }
    })
    .then(resp => {
      return resp.data;
    })
    .catch(err => {
      dispatch({
        type: ActionType.SearchErrorChanged,
        payload: { error: err.message }
      });

      throw new Error("Something went wrong while fetching for issues");
    });

  await dispatch({ type: ActionType.IssuesChanged, payload: { issues } });
  dispatch({ type: ActionType.UpdateSearchQuery, payload: { link } });
};

export const clearQuery = () => ({
  type: ActionType.UpdateSearchQuery,
  payload: { link: null }
});

export const changeFilter = (filter: Filter) => ({
  type: ActionType.FilterChanged,
  payload: { filter }
});
