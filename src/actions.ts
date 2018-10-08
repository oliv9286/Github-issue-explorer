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
  FilterChanged = "FILTER_CHANGED"
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

export type Action =
  | DummyAction
  | UpdateSearchQueryAction
  | IssuesChanged
  | FilterChanged;

// global cosnts
const apiClient = axios.default.create({ baseURL: "https://api.github.com" });
const ISSUES_PER_PAGE = 30;

// Action Creators
export const searchIssues = (link: string) => async (dispatch: Dispatch) => {
  // https://github.com/axiomzen/cc_IssuesExplorerFE_Empty

  // TODO: do a edge case check on url, for now just assume it's a valid github repo
  const paths = link.replace("https://", "").split("/");
  const username = paths[1];
  const repo = paths[2];

  const issues = await apiClient
    .get(`/repos/${username}/${repo}/issues`, {
      params: { page: 1, per_page: ISSUES_PER_PAGE }
    })
    .then(resp => {
      return resp.data;
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
