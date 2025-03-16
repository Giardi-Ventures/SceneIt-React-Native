import {constructPropertyMapper} from "../util/property-utils.ts";
import {
  ColorValue,
  DimensionValue,
  AnimatableNumericValue,
  TouchableOpacity,
  SafeAreaView,
  ViewStyle,
  View,
  ViewComponent,
} from "react-native";

export type ContainerProps = {
  children?: any;

  onPress?: () => void;
  onLongPress?: () => void;

  safe?: boolean;
  flex?: number | boolean;

  style?: ViewStyle;
  background?: ColorValue;

  overflow?: "visible" | "hidden" | undefined;
  position?: "absolute" | "relative" | "static" | undefined;

  width?: DimensionValue;
  height?: DimensionValue;

  top?: DimensionValue;
  right?: DimensionValue;
  bottom?: DimensionValue;
  left?: DimensionValue;

  p?: DimensionValue;
  px?: DimensionValue;
  py?: DimensionValue;
  pl?: DimensionValue;
  pr?: DimensionValue;
  pt?: DimensionValue;
  pb?: DimensionValue;

  m?: DimensionValue;
  mx?: DimensionValue;
  my?: DimensionValue;
  ml?: DimensionValue;
  mr?: DimensionValue;
  mt?: DimensionValue;
  mb?: DimensionValue;

  border?: DimensionValue;
  borderColor?: ColorValue;
  borderRadius?: AnimatableNumericValue;
  borderTop?: AnimatableNumericValue;
  borderRight?: AnimatableNumericValue;
  borderBottom?: AnimatableNumericValue;
  borderLeft?: AnimatableNumericValue;

  items?: "start" | "end" | "center" | "stretch" | "baseline";
  justify?: "start" | "end" | "center" | "between" | "around" | "evenly";

  index?: number;

  debug?: boolean;
};

const VALUE_ASSIGNMENTS = {
  start: "flex-start",
  end: "flex-end",
  between: "space-between",
  around: "space-around",
  evenly: "space-evenly",
};

const SIMPLE_ASSIGNMENTS = ["width", "height", "top", "right", "bottom", "left", "position", "overflow"];

const MAPPED_ASSIGNMENTS = {
  p: "padding",
  px: "paddingHorizontal",
  py: "paddingVertical",
  pt: "paddingTop",
  pr: "paddingRight",
  pb: "paddingBottom",
  pl: "paddingLeft",

  m: "margin",
  mx: "marginHorizontal",
  my: "marginVertical",
  mt: "marginTop",
  mr: "marginRight",
  mb: "marginBottom",
  ml: "marginLeft",

  border: "borderWidth",
  borderColor: "borderColor",
  borderRadius: "borderRadius",
  borderTop: "borderTopWidth",
  borderRight: "borderRightWidth",
  borderBottom: "borderBottomWidth",
  borderLeft: "borderLeftWidth",

  background: "backgroundColor",
  index: "zIndex",

  items: "alignItems",
  justify: "justifyContent",
};

const mapProps = constructPropertyMapper(SIMPLE_ASSIGNMENTS, MAPPED_ASSIGNMENTS);

export function Container({children, onPress, onLongPress, flex, safe, style = {}, debug, ...extra}: ContainerProps) {
  const containerStyle: ViewStyle = mapProps(extra, style);
  const componentProps: any = {...extra};

  for (let key of Object.keys(containerStyle)) {
    if (containerStyle[key] in VALUE_ASSIGNMENTS) {
      containerStyle[key] = VALUE_ASSIGNMENTS[containerStyle[key]];
    }
  }

  if (flex) {
    if (typeof flex === "boolean") {
      containerStyle.flex = flex ? 1 : 0;
    } else {
      containerStyle.flex = flex;
    }
  }

  let ViewComponent: any = View;
  if (onPress || onLongPress) {
    ViewComponent = TouchableOpacity;

    componentProps.onPress = onPress;
    componentProps.onLongPress = onLongPress;
  }

  if (safe) {
    return (
      <SafeAreaView>
        <ViewComponent style={containerStyle} {...componentProps}>
          {children}
        </ViewComponent>
      </SafeAreaView>
    );
  }

  if (debug) {
    console.log("CONTAINER PROPS", containerStyle, componentProps);
  }

  return (
    <ViewComponent style={containerStyle} {...componentProps}>
      {children}
    </ViewComponent>
  );
}
