import {Container} from "../../../../components/container.tsx";
import {Text} from "../../../../components/text/text.tsx";
import React from "react";
import {Media} from "@Giardi-Ventures/SceneIt-Core";

export function MovieOverviewTab({data: media}: {data: Media}) {
  return (
    <Container p={20}>
      <Text>{media.release}</Text>
      <Text size={25}>{media.overview}</Text>

      <Container>
        <Text>Production Information</Text>
      </Container>
    </Container>
  );
}
