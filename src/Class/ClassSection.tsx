import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import { TAB } from "../types";
import { ClassSectionButton } from "./ClassSectionButton";

interface ClassSectionInterface {
  children: ReactNode;
  favoriteCount: number;
  unfavoriteCount: number;
  activeTab: TAB;
  setActiveTab(tab: TAB): void;
  isLoading: boolean;
}

export class ClassSection extends Component<ClassSectionInterface> {
  render() {
    return (
      <section id="main-section">
        <div className="container-header">
          <div className="container-label">Dogs: </div>
          <Link to={"/functional"} className="btn">
            Change to Functional
          </Link>
          <ClassSectionButton
            tab={TAB.favorite}
            activeTab={this.props.activeTab}
            setActiveTab={(tab) => this.props.setActiveTab(tab)}
            isLoading={this.props.isLoading}
            count={this.props.favoriteCount}
            name="favorited"
          />
          <ClassSectionButton
            tab={TAB.unfavorite}
            activeTab={this.props.activeTab}
            setActiveTab={(tab) => this.props.setActiveTab(tab)}
            isLoading={this.props.isLoading}
            count={this.props.unfavoriteCount}
            name="unfavorited"
          />
          <ClassSectionButton
            tab={TAB.createdog}
            activeTab={this.props.activeTab}
            setActiveTab={(tab) => this.props.setActiveTab(tab)}
            isLoading={this.props.isLoading}
            count={-1}
            name="create dog"
          />
        </div>
        <div className="content-container">{this.props.children}</div>
      </section>
    );
  }
}
