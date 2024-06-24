import { useContext } from "react";
import Box from "@mui/material/Box";

import QuestionRenderer from "./QuestionRenderer";
import { GlobalStateContext } from "../context/GlobalStateContextProvider";

export default function PaperRenderer() {
  const { paper, paperMedia } = useContext(GlobalStateContext);

  return (
    <Box
      sx={{
        maxHeight: "80vh",
        maxWidth: "49%",
        width: "49%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        flex: 1,
        overflowY: "scroll",
      }}
    >
      {paper.questions.map((questionData) => (
        <QuestionRenderer questionData={questionData} paperMedia={paperMedia} key={questionData.designator} />
      ))}
    </Box>
  );
}
