import {Container, ContainerProps} from "../container.tsx";
import {Text} from "../text/text.tsx";

export type ButtonProps = ContainerProps & {
  isDisabled?: boolean;
  isLoading?: boolean;
  label: string;
};

export function Button(props: ButtonProps) {
  const {label, isLoading, isDisabled, ...containerProps} = props;

  return (
    <Container
      background={isDisabled ? "gray" : "white"}
      onPress={() => {}}
      {...containerProps}
    >
      <Text>{label}</Text>
    </Container>
  );
}
