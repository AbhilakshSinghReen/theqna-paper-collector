import { useContext } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AddBoxIcon from "@mui/icons-material/AddBox";

import PaperMetadata from "./PaperMetadata";
import QuestionInput from "./QuestionInput";
import { GlobalStateContext } from "../context/GlobalStateContextProvider";

export default function PaperInputter() {
  const { paper, setPaper } = useContext(GlobalStateContext);

  const handleAddQuestionButtonClick = () => {
    const updatedPaper = { ...paper };
    updatedPaper.questions.push({
      designator: "",
      weightage: "",
      content: {
        questionText: "",
        questionStandaloneText: "",
        answerText: "",
      },
    });

    setPaper(updatedPaper);
  };

  const handleQuestionUpdate = (questionIndex, updatedQuestion) => {
    const updatedPaper = { ...paper };

    if (updatedQuestion !== null) {
      updatedPaper.questions[questionIndex] = updatedQuestion;
    } else {
      updatedPaper.questions.splice(questionIndex, 1);
    }

    setPaper(updatedPaper);
  };

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
      <PaperMetadata
        metadata={paper.metadata}
        setMetadata={(updatedMetadata) => {
          const updatedPaper = { ...paper };
          updatedPaper.metadata = updatedMetadata;
          setPaper(updatedPaper);
        }}
      />

      {paper.questions.map((question, index) => (
        <QuestionInput
          question={question}
          setQuestion={(updatedQuestion) => handleQuestionUpdate(index, updatedQuestion)}
          key={index}
        />
      ))}

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          // paddingRight: 2,
        }}
      >
        <Tooltip title="Add Question">
          <IconButton color="warning" onClick={() => handleAddQuestionButtonClick()}>
            <AddBoxIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}
