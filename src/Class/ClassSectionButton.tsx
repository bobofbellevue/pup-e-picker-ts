import { Component } from "react";
import { TAB } from "../types";

interface ClassSectionButtonInterface {
  activeTab: TAB;
  tab: TAB;
  setActiveTab(tab: TAB): void;
  isLoading: boolean;
  count: number;
  name: string;
}

export class ClassSectionButton extends Component<ClassSectionButtonInterface> {
  makeSelectorClassName(tab: TAB) {
    let className = "selector";
    if (this.props.activeTab === tab) {
      className += " active";
    } else {
      className += " inactive";
    }
    if (this.props.isLoading) {
      className += " disabled";
    }
    return className;
  }

  render() {
    return (
      <div
        className={this.makeSelectorClassName(this.props.tab)}
        onClick={() => {
          this.props.setActiveTab(this.props.tab);
        }}
      >
        {this.props.count == -1
          ? `${this.props.name}`
          : `${this.props.name} ( ${this.props.count} )`}
      </div>
    );
  }
}
