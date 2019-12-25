import React from "react";
import data from "./search";

export class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      suggestions: []
    };
  }

  onChange = e => {
    const value = e.target.value;
    let suggestions = [];
    if (value.length > 2) {
      const regex = new RegExp(`^${value}`, "i");
      suggestions = data.sort().filter(v => regex.test(v.term));
    }
    this.setState({ suggestions, input: value });
  };

  onClickCross = () => {
    this.setState({ input: "", suggestions: [] });
  };

  renderSuggestions() {
    const { suggestions } = this.state;
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <div style={styles.SuggestionsContainer}>
        {suggestions.map(suggestion => (
          <div
            style={{ border: "solid 1px grey" }}
            onClick={this.suggestionSelected.bind(this, suggestion)}
          >
            {suggestion.term}
          </div>
        ))}
      </div>
    );
  }
  suggestionSelected = item => {
    this.setState({
      input: item,
      suggestions: []
    });
  };

  render() {
    const { input } = this.state;
    return (
      <div>
        <div style={styles.inputContainerStyle}>
          <input style={styles.input} value={input} onChange={this.onChange} />
          <div style={styles.iconsContainer}>
            {this.state.input.length > 0 ? (
              <img
                alt=''
                src={"img/close.png"}
                style={{ width: 14, height: 14, cursor: "pointer" }}
                onClick={this.onClickCross}
              />
            ) : null}
            <img
              alt=''
              src={"img/search.png"}
              style={{ width: 14, height: 14, marginLeft: 10 }}
            />
          </div>
        </div>
        {this.renderSuggestions()}
      </div>
    );
  }
}

const styles = {
  input: {
    border: "none",
    outline: "none",
    height: "92%",
    width: "84%"
  },
  inputContainerStyle: {
    width: 250,
    border: "solid 1px black",
    backgroundColor: "white",
    height: 30,
    padding: "0 5px 0 5px",
    alignItems: "center",
    display: "flex"
  },
  SuggestionsContainer: {
    width: 260,
    backgroundColor: "white",
    border: "solid 1px grey"
  },
  iconsContainer: {
    display: "flex",
    justifyContent: "flex-end",
    width: "18%"
  }
};
