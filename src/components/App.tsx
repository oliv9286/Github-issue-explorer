import * as React from "react";
import * as styles from "./App.css";
import { State, Dispatch, Filter, Issue } from "../types";
import * as actions from "../actions";
import { connect } from "react-redux";
import SearchBar from "./SearchBar";
import Results from "./Results";

interface Props {
  filter: Filter;
  query: string | null;
  issues: Issue[];
  searchError: string | null;
  searchIssues: (link: string) => void;
}

export class App extends React.Component<Props, any> {
  public render() {
    const { filter, query, issues, searchError } = this.props;
    const error = searchError ? (
      <div className={styles.errorMessage}>
        Oh no, everything is terrible: {searchError}
      </div>
    ) : null;

    const screen = query ? (
      <Results />
    ) : (
      <div className={styles.searchScreen}>
        <h1>GitHub Issue Viewer</h1>
        <SearchBar updateSearchQuery={this.props.searchIssues} />
        {error}
      </div>
    );

    return <div className={styles.app}>{screen}</div>;
  }
}

const mapStateToProps = (state: State) => {
  return {
    query: state.query,
    filter: state.filter,
    issues: state.issues,
    searchError: state.searchError
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    searchIssues: (link: string) => {
      dispatch(actions.searchIssues(link));
    }
  };
};

export const AppWithData = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppWithData;
