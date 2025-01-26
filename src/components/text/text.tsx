import React from "react";
import {constructPropertyMapper, mapPropertyValue} from "../../util/property-utils.ts";
import {ColorValue, DimensionValue, Text as ReactText} from "react-native";
import {Container, ContainerProps} from "../container.tsx";

const SIMPLE_ASSIGNMENTS = ["color"];

const MAPPED_ASSIGNMENTS = {
  spacing: "letterSpacing",
  height: "lineHeight",
  align: "textAlign",
  size: "fontSize",
};

const BOLD_MAPPER = {
  "bold": "800",
  "semiBold": "700",
  "medium": "600",
  "mid": "500",
  "normal": "400",
}

export type TextProps = ContainerProps & {
  children?: any;

  size?: DimensionValue;
  height?: DimensionValue;
  spacing?: DimensionValue;

  align?: "auto" | "left" | "right" | "center" | "justify" | undefined;

  color?: ColorValue;

  normal?: boolean;
  mid?: boolean;
  medium?: boolean;
  semiBold?: boolean;
  bold?: boolean;
};

const mapProps = constructPropertyMapper(SIMPLE_ASSIGNMENTS, MAPPED_ASSIGNMENTS);

export function Text({children, ...extraProps}: TextProps) {
  const textStyle = mapProps(extraProps);

  // @ts-ignore
  textStyle.fontWeight = mapPropertyValue(extraProps, BOLD_MAPPER);

  return (
    <Container {...extraProps}>
      <ReactText style={textStyle}>{children}</ReactText>
    </Container>
  );
}
