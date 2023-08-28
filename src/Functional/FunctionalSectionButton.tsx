import { TAB } from "../types";

const makeSelectorClassName = (tab: TAB, activeTab: TAB, isLoading: boolean) => {
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

interface FunctionalSectionButtonInterface {
  activeTab: TAB;
  tab: TAB;
  setActiveTab(tab: TAB): void;
  isLoading: boolean;
  count: number;
  name: string;
}

export const FunctionalSectionButton = (params: FunctionalSectionButtonInterface) => {
    return (
      <div
        className={makeSelectorClassName(params.tab, params.activeTab, params.isLoading)}
        onClick={() => {
          params.setActiveTab(params.tab);
        }}
      >
        {params.count == -1
          ? `${params.name}`
          : `${params.name} ( ${params.count} )`}
      </div>
    );
}
