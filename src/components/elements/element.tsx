import React from "react";
import {useFormikContext} from "formik";
import {Container, ContainerProps} from "../container.tsx";
import {Text} from "../text/text.tsx";

export type ElementProps = ContainerProps & {
  onValueChange?: (value: string) => void;
  name?: string;
  onChange?: (value: string) => void;
  value?: string;
  children?: (params: ChildProps) => React.ReactNode;

  id?: string;
  label?: string;
  error?: string | null | undefined;

  span?: string | number;

  onChangeSetValue?: boolean;
};

export type ChildProps = {
  value: any;
  onChange: any;
  id: string;
  error: string | null | undefined;
  handleBlur: any;
};

export function Element(props: ElementProps) {
  let {
    onValueChange,
    id,
    name,
    onChange,
    value,
    children,
    error,
    span,
    onChangeSetValue,
    ...containerProps
  } = props;

  const formikContext = useFormikContext<any>();
  if (name && formikContext) {
    value = formikContext.values[name];
    onChange = (value) => {
      formikContext.setFieldValue(name, value);
    };

    if (typeof error === "undefined" && formikContext.touched[name]) {
      // @ts-ignore
      error = formikContext.errors[name] ?? null;
    }
  }

  if (typeof id === "undefined") {
    id = name || "";
  }

  const originalOnChange = onChange;
  onChange = (value) => {
    originalOnChange(value);

    onValueChange && onValueChange(value);
  }

  return (
    <Container {...containerProps}>
      {children &&
        children({
          value,
          onChange,
          id,
          error,
          handleBlur: formikContext?.handleBlur,
        })}

      {error && (<Text>{error}</Text>)}
    </Container>
  );
}
