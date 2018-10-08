import * as React from "react";
import * as styles from "./SearchBar.css";

interface OwnState {
  value: string;
}

interface Props {
  updateSearchQuery: (link: string) => void;
}

export class SearchBar extends React.Component<Props, OwnState> {
  constructor(props: any) {
    super(props);

    this.state = {
      value: ""
    } as OwnState;
  }

  public render() {
    return (
      <div className={styles.searchBarContainer}>
        <div
          className={styles.searchIcon}
          dangerouslySetInnerHTML={{
            __html: require("../assets/icons/search.svg")
          }}
        />
        <input
          onChange={e => {
            this.setState({ value: e.target.value });
          }}
          onKeyUp={e => {
            if (e.keyCode === 13) {
              this.props.updateSearchQuery(this.state.value);
            }
          }}
          className="search-bar"
          type="text"
          placeholder="Paste a link to a GitHub repo!"
        />
      </div>
    );
  }
}

export default SearchBar;
