import React from "react";
import { Input } from "./input";
import { AutoComplete } from "./auto-complete";

export class Page extends React.Component {
  style = {
    backgroundColor: "#c5c5c5",
    height: 500,
    width: 700,
    display: "flex",
    flexDirection: "row",
    padding: 20,
    justifyContent: "space-between"
  };
  render() {
    return (
      <div style={this.style}>
        <Input />
        <AutoComplete />
      </div>
    );
  }
}
