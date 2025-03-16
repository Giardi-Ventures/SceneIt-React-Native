import {Container, ContainerProps} from "./container.tsx";
import {Row} from "./row.tsx";

export function Center(props: ContainerProps) {
  const {children, ...containerProps} = props;

  return (
    <Container items="center" justify="center" {...containerProps}>
      {children}
    </Container>
  );
}
