import * as React from "react";
import * as styles from "./Label.css";

interface Props {
  name: string;
  key: number;
}

export const Label = (props: Props) => {
  return (
    <div className={styles.label} key={props.key}>
      {props.name}
    </div>
  );
};
