import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { TAB } from "../types";
import { FunctionalSectionButton } from "./FunctionalSectionButton";

interface FunctionalSectionInterface {
  children: ReactNode;
  favoriteCount: number;
  unfavoriteCount: number;
  activeTab: TAB;
  setActiveTab(tab: TAB): void;
  isLoading: boolean;
}

export const FunctionalSection = (props: FunctionalSectionInterface) => {
  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <FunctionalSectionButton
          tab={TAB.favorite}
          activeTab={props.activeTab}
          setActiveTab={(tab) => props.setActiveTab(tab)}
          isLoading={props.isLoading}
          count={props.favoriteCount}
          name="favorited"
        />
        <FunctionalSectionButton
          tab={TAB.unfavorite}
          activeTab={props.activeTab}
          setActiveTab={(tab) => props.setActiveTab(tab)}
          isLoading={props.isLoading}
          count={props.unfavoriteCount}
          name="unfavorited"
        />
        <FunctionalSectionButton
          tab={TAB.createdog}
          activeTab={props.activeTab}
          setActiveTab={(tab) => props.setActiveTab(tab)}
          isLoading={props.isLoading}
          count={-1}
          name="create dog"
        />
      </div>
      <div className="content-container">{props.children}</div>
    </section>
  );
};
