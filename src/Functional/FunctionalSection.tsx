import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { TAB } from "../types";
import { FunctionalSectionButton } from "./FunctionalSectionButton";

type FunctionalSectionProps = {
  children: ReactNode;
  favoriteCount: number;
  unfavoriteCount: number;
  activeTab: TAB;
  setActiveTab(tab: TAB): void;
  isLoading: boolean;
};

export const FunctionalSection = (props: FunctionalSectionProps) => {
  const { activeTab, isLoading, favoriteCount, unfavoriteCount } = props;
  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <FunctionalSectionButton
          tab={"FAVORITE"}
          activeTab={activeTab}
          setActiveTab={(tab) => props.setActiveTab(tab)}
          isLoading={isLoading}
          count={favoriteCount}
          name="favorited"
        />
        <FunctionalSectionButton
          tab={"UNFAVORITE"}
          activeTab={activeTab}
          setActiveTab={(tab) => props.setActiveTab(tab)}
          isLoading={isLoading}
          count={unfavoriteCount}
          name="unfavorited"
        />
        <FunctionalSectionButton
          tab={"CREATE_DOG"}
          activeTab={activeTab}
          setActiveTab={(tab) => props.setActiveTab(tab)}
          isLoading={isLoading}
          count={-1}
          name="create dog"
        />
      </div>
      <div className="content-container">{props.children}</div>
    </section>
  );
};
