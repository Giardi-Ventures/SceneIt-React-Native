import React, {ReactElement, useMemo, useState} from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {useChildren} from "@Giardi-Ventures/SceneIt-Core";
import {Container} from "../container.tsx";
import {Row} from "../row.tsx";
import {Tab, TabProps} from "./common/tab.tsx";
import {Text} from "../text/text.tsx";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {ScrollView} from "react-native";

export type StackTabProps = {
  children: ReactElement | ReactElement[];
};

const TabNav = createMaterialTopTabNavigator();

export function StackTab({children}: StackTabProps) {
  const tabs = useChildren<TabProps>(children, Tab);

  return (
    <TabNav.Navigator
      id={undefined}
      tabBar={({state, navigation}) => {
        const currentRoute = state.routes[state.index].name;

        console.log("Current", currentRoute);

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
        console.log("DOING", item);

        return (
          <TabNav.Screen key={item.props.id} name={item.props.id}>
            {() => <Container>{item.props.children}</Container>}
          </TabNav.Screen>
        );
      })}
    </TabNav.Navigator>
  );
}
