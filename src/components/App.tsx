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
  searchIssues: (link: string) => void;
}

export class App extends React.Component<Props, any> {
  public render() {
    const { filter, query, issues } = this.props;

    const screen = query ? (
      <Results />
    ) : (
      <div className={styles.searchScreen}>
        <h1>GitHub Issue Viewer</h1>
        <SearchBar updateSearchQuery={this.props.searchIssues} />
      </div>
    );

    return <div className={styles.app}>{screen}</div>;
  }
}

const mapStateToProps = (state: State) => {
  return {
    query: state.query,
    filter: state.filter,
    issues: state.issues
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
