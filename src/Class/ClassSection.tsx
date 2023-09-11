import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import { TAB, TabValues } from "../types";
import { ClassSectionButton } from "./ClassSectionButton";

interface ClassSectionProps {
  favoriteCount: number;
  unfavoriteCount: number;
  activeTab: TAB;
  setActiveTab(tab: TAB): void;
  isLoading: boolean;
  children: ReactNode;
}

export class ClassSection extends Component<ClassSectionProps> {
  render() {
    const {
      activeTab,
      setActiveTab,
      isLoading,
      favoriteCount,
      unfavoriteCount,
      children,
    } = this.props;
    return (
      <section id="main-section">
        <div className="container-header">
          <div className="container-label">Dogs: </div>
          <Link to={"/functional"} className="btn">
            Change to Functional
          </Link>
          <ClassSectionButton
            tab={TabValues.FAVORITE}
            activeTab={activeTab}
            setActiveTab={(tab) => setActiveTab(tab)}
            isLoading={isLoading}
            count={favoriteCount}
            name="favorited"
          />
          <ClassSectionButton
            tab={TabValues.UNFAVORITE}
            activeTab={activeTab}
            setActiveTab={(tab) => setActiveTab(tab)}
            isLoading={isLoading}
            count={unfavoriteCount}
            name="unfavorited"
          />
          <ClassSectionButton
            tab={TabValues.CREATE_DOG}
            activeTab={activeTab}
            setActiveTab={(tab) => setActiveTab(tab)}
            isLoading={isLoading}
            count={-1}
            name="create dog"
          />
        </div>
        <div className="content-container">{children}</div>
      </section>
    );
  }
}
