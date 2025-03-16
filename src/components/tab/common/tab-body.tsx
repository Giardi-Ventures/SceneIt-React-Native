import {useContext, useMemo} from "react";
import {TabBarContext} from "../tab-bar.tsx";

export function TabBody() {
  const {tabs, current} = useContext(TabBarContext);

  const currentTab = tabs.find((item) => {
    return item.id === current;
  });

  return currentTab?.children ?? tabs[0].children;
}
