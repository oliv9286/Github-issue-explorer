import * as Redux from "redux";

export type Filter = "all" | "open" | "closed" | "pullRequests";

export interface Label {
  name: string;
}

export interface Issue {
  title: string;
  state: "open" | "closed";
  url: string;
  labels: Label[];
  body: string;
}

export interface State {
  filter: Filter;
  query: string | null;
  issues: Issue[];
  isSearchInProgress: boolean;
}

export type Store = Redux.Store<State>;
export type Dispatch = Redux.Dispatch<State>;
