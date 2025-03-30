import Contents from "@/app/schedule/contents/Contents";
import { ContentsProvider } from "@/app/schedule/contents/ContentsContext";
import InteractionBar from "@/app/schedule/interactionBar/InteractionBar";
import Tabs from "@/app/schedule/tabs/Tabs";

export default function Page() {
  return (
    <h1>
      <ContentsProvider>
        <Tabs />
        <InteractionBar />
        <Contents />
      </ContentsProvider>
    </h1>
  );
}
