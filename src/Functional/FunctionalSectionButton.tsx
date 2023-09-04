import { TAB } from "../types";

interface FunctionalSectionButtonProps {
  activeTab: TAB;
  tab: TAB;
  setActiveTab(tab: TAB): void;
  isLoading: boolean;
  count: number;
  name: string;
}

export const FunctionalSectionButton = (
  props: FunctionalSectionButtonProps
) => {
  const { tab, activeTab, setActiveTab, isLoading, name, count } = props;

  const makeSelectorClassName = (
    tab: TAB,
    activeTab: TAB,
    isLoading: boolean
  ) => {
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
  };

  return (
    <div
      className={makeSelectorClassName(tab, activeTab, isLoading)}
      onClick={() => setActiveTab(tab)}
    >
      {count == -1 ? `${name}` : `${name} ( ${count} )`}
    </div>
  );
};
