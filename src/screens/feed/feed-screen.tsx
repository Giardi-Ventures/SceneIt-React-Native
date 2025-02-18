import {Container} from "../../components/container.tsx";
import {Text} from "../../components/text/text.tsx";
import {useEffect} from "react";
import {fetchList, ListState, ListStore, loadLists} from "@Giardi-Ventures/SceneIt-Core";
import {useSelector} from "react-redux";

export function FeedScreen() {
  const {watch} = useSelector(ListStore);

  useEffect(() => {
    loadLists().catch((err) => {
      console.log("Leeror", err);
    });
  }, []);

  console.log("Watch", watch);

  return (
    <Container safe>
      <Text>Feed</Text>
    </Container>
  );
}
