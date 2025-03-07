import React, {createContext, ReactElement, useMemo, useState} from "react";
import {useChildren} from "@Giardi-Ventures/SceneIt-Core";
import {Tab, TabProps} from "./common/tab.tsx";
import {Container} from "../container.tsx";

export type StackTabProps = {
  children: ReactElement[];
};

type TabBarContextProps = {
  current: string;
  setTab: (tab: string) => void;
  tabs: any[];
};

export const TabBarContext = createContext<TabBarContextProps>(null);

export function TabBar({children}: StackTabProps) {
  const [currentTab, setCurrentTab] = useState(null);
  const tabChildren = useChildren<TabProps>(children, Tab);

  const tabs = useMemo(() => {
    return tabChildren.map((item) => {
      return item.props;
    });
  }, [children]);

  const RenderChildren = useMemo(() => {
    return children.map((item) => {
      return item.type !== Tab;
    });
  }, [children]);

  console.log(RenderChildren);

  return (
    <TabBarContext.Provider value={{tabs, current: currentTab ?? tabs[0].id, setTab: setCurrentTab}}>
      <Container flex>{RenderChildren}</Container>
    </TabBarContext.Provider>
  );
}
