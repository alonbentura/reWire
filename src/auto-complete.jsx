import React from "react";
import "./item.css";
import data from "./search";

export class AutoComplete extends React.Component {
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
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      suggestions = data.sort().filter(v => regex.test(v.term));
    }
    this.setState({ suggestions, input: value });
  };

  renderSuggestions() {
    const { suggestions } = this.state;
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <div style={styles.SuggestionsContainer}>
        {suggestions.map(suggestion => (
          <div style={styles.item} className="item">
            <img
              alt=""
              src={"img/up-arrow.png"}
              style={styles.icon}
              onClick={this.suggestionSelected.bind(this, suggestion)}
            />
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
        <div>search</div>
        <div className="input" style={styles.inputContainerStyle}>
          <input
            style={styles.input}
            value={input.term}
            onChange={this.onChange}
          />
          <div style={styles.iconsContainer}>
            <img
              alt=""
              src={
                this.state.suggestions.length > 0
                  ? "img/down-chevron.png"
                  : "img/navigate-up-arrow.png"
              }
              style={{
                width: 14,
                height: 14,
                cursor: "pointer",
                marginLeft: 5
              }}
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
    width: "92%"
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
    border: "solid 1px grey",
    height: 300,
    overflowY: "auto"
  },
  iconsContainer: {
    display: "flex",
    justifyContent: "flex-end",
    borderLeft: "solid 1px grey"
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
    marginLeft: 10,
    cursor: "pointer"
  },
  item: {
    alignItems: " center",
    display: "flex",
    height: 45,
    cursor: "default"
  }
};
