import {Row} from "../../row.tsx";
import {Container} from "../../container.tsx";
import {Text} from "../../text/text.tsx";
import React, {useContext} from "react";
import {TabBarContext} from "../tab-bar.tsx";

export function TabBarMenu() {
  const {tabs, current, setTab} = useContext(TabBarContext);

  return (
    <Row height={50} background="white" justify="evenly">
      {tabs.map((item) => {
        return (
          <Container
            background={item.props.id === current ? "green" : "purple"}
            onPress={() => setTab(item.props.id)}
            flex
          >
            <Text color="white">{item.props.label}</Text>
          </Container>
        );
      })}
    </Row>
  );
}
