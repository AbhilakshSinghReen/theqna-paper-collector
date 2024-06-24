import Box from "@mui/material/Box";

import QuestionRenderer from "./QuestionRenderer";

export default function PaperRenderer({ paper, paperMedia }) {
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
