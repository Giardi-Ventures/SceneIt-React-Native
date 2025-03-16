import {Row} from "../../row.tsx";
import {Container} from "../../container.tsx";
import {Text} from "../../text/text.tsx";
import React, {useContext} from "react";
import {TabBarContext} from "../tab-bar.tsx";
import {Center} from "../../center.tsx";
import {FlatList} from "react-native";
import {ACCENT, BORDER_GRAY} from "../../../themes/theme.ts";

export function TabMenu() {
  const {tabs, current, setTab} = useContext(TabBarContext);

  return (
    <FlatList
      data={tabs}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingLeft: 12, paddingRight: 12}}
      ItemSeparatorComponent={() => <Container width={4} />}
      renderItem={({item}) => {
        const isSelected = item.id === current;

        return (
          <Center
            border={1}
            background={isSelected ? ACCENT : "white"}
            borderColor={isSelected ? ACCENT : BORDER_GRAY}
            onPress={() => setTab(item.id)}
            borderRadius={16}
            p={12}
            flex
          >
            <Text color={isSelected ? "white" : "black"} medium>{item.label}</Text>
          </Center>
        );
      }}
    />
  );
}
