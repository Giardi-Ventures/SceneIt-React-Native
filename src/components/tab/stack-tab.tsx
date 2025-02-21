import React, {ReactElement, useState} from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {useChildren} from "@Giardi-Ventures/SceneIt-Core";
import {Container} from "../container.tsx";
import {Row} from "../row.tsx";
import {Tab, TabProps} from "./tab.tsx";
import {Text} from "../text/text.tsx";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";

const TabNav = createMaterialTopTabNavigator();

export type StackTabProps = {
  children: ReactElement | ReactElement[];
};

export function StackTab({children}: StackTabProps) {
  const tabs = useChildren<TabProps>(children, Tab);

  console.log("TABS", tabs);

  return (
    <Container flex>
      <TabNav.Navigator
        id={undefined}
        tabBar={({state, navigation}) => {
          const currentRoute = state.routes[state.index].name;

          return (
            <Row height={50} background="white" justify="evenly">
              {tabs.map((item) => {
                return (
                  <Container
                    background={item.props.id === currentRoute ? "green" : "purple"}
                    onPress={() => navigation.navigate(item.props.id)}
                    flex
                  >
                    <Text color="white">{item.props.label}</Text>
                  </Container>
                );
              })}
            </Row>
          );
        }}
      >
        {tabs.map((item) => {
          return (
            <TabNav.Screen key={item.props.id} name={item.props.id}>
              {() => item.props.children}
            </TabNav.Screen>
          );
        })}
      </TabNav.Navigator>
    </Container>
  );
}
