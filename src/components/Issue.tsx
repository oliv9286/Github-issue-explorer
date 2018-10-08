import * as React from "react";
import { Issue, Label } from "../types";
import * as styles from "./Issue.css";
import { Label as LabelComponent } from "./Label";

interface Props {
  issue: Issue;
  key: number;
}

const trimBodyText = (body: string) => {
  if (body.split(" ").length > 150) {
    return body.substr(0, 150) + "...";
  }

  return body;
};

const getIcon = (issue: Issue) => {
  if (issue.hasOwnProperty("pull_request")) {
    return (
      <div
        className={styles.icon}
        dangerouslySetInnerHTML={{
          __html: require("../assets/icons/pull-request.svg")
        }}
      />
    );
  }

  if (issue.state === "closed") {
    return (
      <div
        className={styles.icon}
        dangerouslySetInnerHTML={{
          __html: require("../assets/icons/issue-closed.svg")
        }}
      />
    );
  }

  return null;
};

export const IssueCard = (props: Props) => {
  const { issue, key } = props;

  return (
    <a target="_blank" href={issue.url} className={styles.issue} key={key}>
      <div className={styles.iconContainer}>{getIcon(issue)}</div>
      <div className={styles.title}>{issue.title}</div>
      <div className={styles.description}>{trimBodyText(issue.body)}</div>
      <div className={styles.footer}>
        {issue.labels.map((label: Label, i: number) => {
          return <LabelComponent name={label.name} key={i} />;
        })}
      </div>
    </a>
  );
};
