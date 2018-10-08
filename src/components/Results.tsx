import * as React from "react";
import { State, Dispatch, Filter, Issue } from "../types";
import * as actions from "../actions";
import { connect } from "react-redux";
import * as styles from "./Results.css";
import { IssueCard } from "./Issue";
import * as cx from "classnames";

interface Props {
  filter: Filter;
  query: string | null;
  issues: Issue[];
  clearQuery: () => void;
  changeFilter: (filter: Filter) => void;
}

const getIssuesList = (issues: Issue[]) => {
  return (
    <div className={styles.cards}>
      {issues.map((issue: Issue, i: number) => {
        return <IssueCard issue={issue} key={i} />;
      })}
    </div>
  );
};

const filters = [
  { label: "All Issues", value: "all" },
  { label: "Open Issues", value: "open" },
  { label: "Closed Issues", value: "closed" },
  { label: "Pull Requests", value: "pullRequests" }
];

export class Results extends React.Component<Props, any> {
  public render() {
    const { filter, issues } = this.props;

    const filteredIssues = this.props.issues.filter((issue: Issue) => {
      return (
        filter === "all" ||
        (issue.hasOwnProperty("pull_request") && filter === "pullRequests") ||
        issue.state === filter
      );
    });

    const issuesList =
      filteredIssues.length > 0 ? (
        getIssuesList(filteredIssues)
      ) : (
        <div className={styles.emptyMsg}>
          No issues that match given filter.
        </div>
      );

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>GitHub Issue Viewer</div>
          <div className={styles.query}>{this.props.query}</div>
        </div>
        <div className={styles.content}>
          <div className={styles.actions}>
            <div
              onClick={this.props.clearQuery}
              className={styles.close}
              dangerouslySetInnerHTML={{
                __html: require("../assets/icons/close.svg")
              }}
            />
          </div>

          <div className={styles.filterList}>
            {filters.map((f, i: number) => {
              return (
                <div
                  key={i}
                  onClick={e => this.props.changeFilter(f.value as Filter)}
                  className={cx({
                    [styles.filter]: true,
                    [styles.active]: f.value === this.props.filter
                  })}
                >
                  {f.label}
                </div>
              );
            })}
          </div>
          {issues.length > 0 ? (
            issuesList
          ) : (
            <div className={styles.emptyMsg}>
              Hmm... There are no issues in this repo at the moment.
            </div>
          )}
        </div>
      </div>
    );
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
    clearQuery: () => {
      dispatch(actions.clearQuery());
    },
    changeFilter: (filter: Filter) => {
      dispatch(actions.changeFilter(filter));
    }
  };
};

export const ResultsWithData = connect(mapStateToProps, mapDispatchToProps)(
  Results
);

export default ResultsWithData;
