import { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function QuestionInput({ question, setQuestion }) {
  const [expanded, setExpanded] = useState(true);
  const [designator, setDesignator] = useState(question.designator);
  const [weightage, setWeightage] = useState(question.weightage);
  const [questionText, setQuestionText] = useState(question.content.questionText);
  const [questionStandaloneText, setQuestionStandaloneText] = useState(question.content.questionStandaloneText);
  const [answerText, setAnswerText] = useState(question.content.answerText);

  const updateQuestion = () => {
    setTimeout(() => {
      const updatedQuestion = {
        designator: designator,
        weightage: weightage,
        content: {
          questionText: questionText,
          questionStandaloneText: questionStandaloneText,
          answerText: answerText,
        },
      };

      setQuestion(updatedQuestion);
    }, 1500);
  };

  const handleQuestionDeleteButtonClick = () => {
    if (!window.confirm("Are you sure you want to delete this question? This action is irreversible.")) {
      return;
    }

    setQuestion(null);
  };

  useEffect(() => {
    setDesignator(question.designator);
    setWeightage(question.weightage);
    setQuestionText(question.content.questionText);
    setQuestionStandaloneText(question.content.questionStandaloneText);
    setAnswerText(question.content.answerText);
  }, [question]);

  return (
    <Accordion
      width="100%"
      expanded={expanded}
      onChange={(event, expanded) => setExpanded(expanded)}
      sx={{
        width: "100%",
        backgroundColor: "#e8e8e8",
        // borderRadius: 2,
        marginBottom: 2,
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextField
          value={designator}
          onChange={(e) => setDesignator(e.target.value)}
          placeholder="Designator"
          sx={{
            marginRight: 2,
          }}
          onClick={(e) => e.stopPropagation()}
          onBlur={() => updateQuestion()}
        />
        <TextField
          value={weightage}
          onChange={(e) => setWeightage(e.target.value)}
          placeholder="Weightage"
          onClick={(e) => e.stopPropagation()}
          onBlur={() => updateQuestion()}
        />
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          sx={{
            width: "100%",
            marginBottom: 1,
          }}
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          onBlur={() => updateQuestion()}
          placeholder="Question Text"
          multiline={true}
          rows={3}
        />

        <TextField
          sx={{
            width: "100%",
            marginBottom: 1,
          }}
          value={questionStandaloneText}
          onChange={(e) => setQuestionStandaloneText(e.target.value)}
          onBlur={() => updateQuestion()}
          placeholder="Question Standalone Text"
          multiline={true}
          rows={1}
        />
        <TextField
          sx={{
            width: "100%",
            marginBottom: 1,
          }}
          value={answerText}
          onChange={(e) => setAnswerText(e.target.value)}
          onBlur={() => updateQuestion()}
          placeholder="Answer Text"
          multiline={true}
          rows={10}
        />

        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "flex-start",
          }}
        >
          <Button variant="contained" color="error" onClick={handleQuestionDeleteButtonClick}>
            Delete
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
