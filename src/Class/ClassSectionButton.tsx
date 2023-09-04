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
    const { isLoading, activeTab } = this.props;
    let className = "selector";
    if (activeTab === tab) {
      className += " active";
    } else {
      className += " inactive";
    }
    if (isLoading) {
      className += " disabled";
    }
    return className;
  }

  render() {
    const { name, count, tab, setActiveTab } = this.props;
    return (
      <div
        className={this.makeSelectorClassName(tab)}
        onClick={() => setActiveTab(tab)}
      >
        {count == -1 ? `${name}` : `${name} ( ${count} )`}
      </div>
    );
  }
}
