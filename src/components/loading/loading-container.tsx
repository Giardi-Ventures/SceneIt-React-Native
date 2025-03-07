import React, {Fragment, ReactElement, ReactNode, useMemo} from "react";
import {Container} from "../container.tsx";
import {FetchPayload, useChild, useChildren, useChildTraversal} from "@Giardi-Ventures/SceneIt-Core";
import {Text} from "react-native";
import {Button} from "../buttons/button.tsx";
import {useNavigation} from "@react-navigation/native";

export type LoadingContainerProps<T> = {
  children: ReactNode | (ReactElement | ((d) => {}))[]; // ✅ Allows JSX or function-based children
  fetchBody: FetchPayload;
};

type ErrorContainer = {code?: string; children?: any};

export function LoadingContainerError({children = null}: ErrorContainer) {
  const {goBack} = useNavigation();

  if (children !== null) return children;

  return (
    <Container>
      <Text>Error</Text>

      <Button label="Back" onPress={() => goBack()} />
    </Container>
  );
}

export function LoadingContainer({children, fetchBody}: LoadingContainerProps<unknown>): any {
  const {cleanChildren, errorChildren} = useMemo(() => {
    const childArray = Array.isArray(children) ? children : [children];

    let errorChildren = [];
    let cleanChildren = [];

    for (let item of childArray) {
      if (typeof item === "function") {
        cleanChildren.push(item);
        // @ts-ignore
      } else if ([LoadingContainerError.name].includes(item?.type?.name)) {
        errorChildren.push(item);
      } else {
        cleanChildren.push(item);
      }
    }

    return {cleanChildren, errorChildren};
  }, [children]);

  const {isLoading, error, data} = fetchBody;

  if (isLoading) {
    return (
      <Container flex>
        <Text>Loading Bruv</Text>
      </Container>
    );
  }

  if (error) {
    const ErrorContainer = errorChildren?.reduce((container, item) => {
      if (item.props.code === error.code) {
        return item;
      }

      if (container === null && !item.props.code) {
        return item;
      }

      return null;
    }, null);

    return <Container flex>{ErrorContainer || <LoadingContainerError />}</Container>;
  }

  console.log("LIKE DATA CHILDREN", data);

  // ERROR
  // NO DATA
  // PROP BASED ON ERROR

  return (
    <Container safe>
      {cleanChildren.map((item) => {
        if (typeof item === "function") {
          return item(data);
        }

        return item;
      })}
    </Container>
  );
}

LoadingContainer.Error = LoadingContainerError;
