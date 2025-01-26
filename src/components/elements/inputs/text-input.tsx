import React from "react";
import {TextInput as NativeTextInput} from "react-native";
import {Element, ElementProps} from "../element.tsx";

type TextInputProps = ElementProps & {
  placeholder?: string;
};

export function TextInput(props: TextInputProps) {
  const {placeholder, ...elementProps} = props;

  return (
    <Element {...elementProps}>
      {({value, onChange}) => {
        return (
          <NativeTextInput
            placeholder={placeholder}
            value={value}
            onChangeText={onChange}
          />
        );
      }}
    </Element>
  );
}
