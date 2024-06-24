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

  const [localDesignator, setLocalDesignator] = useState(question.designator);
  const [localWeightage, setLocalWeightage] = useState(question.weightage);
  const [localQuestionText, setLocalQuestionText] = useState(question.content.questionText);
  const [localQuestionStandaloneText, setLocalQuestionStandaloneText] = useState(question.content.standaloneText);
  const [localAnswerText, setLocalAnswerText] = useState(question.content.answerText);

  useEffect(() => {
    setLocalDesignator(question.designator);
    setLocalWeightage(question.weightage);
    setLocalQuestionText(question.content.questionText);
    setLocalQuestionStandaloneText(question.content.standaloneText);
    setLocalAnswerText(question.content.answerText);
  }, [question]);

  const handleLocalDesignatorChange = (e) => {
    const newValue = e.target.value;

    setLocalDesignator(newValue);
    setQuestion({
      designator: newValue,
      weightage: localWeightage,
      content: {
        questionText: localQuestionText,
        questionStandaloneText: localQuestionStandaloneText,
        answerText: localAnswerText,
      },
    });
  };

  const handleLocalWeightageChange = (e) => {
    const newValue = e.target.value;

    setLocalWeightage(newValue);
    setQuestion({
      designator: localDesignator,
      weightage: newValue,
      content: {
        questionText: localQuestionText,
        questionStandaloneText: localQuestionStandaloneText,
        answerText: localAnswerText,
      },
    });
  };

  const handleLocalQuestionTextChange = (e) => {
    const newValue = e.target.value;

    setLocalQuestionText(newValue);
    setQuestion({
      designator: localDesignator,
      weightage: localWeightage,
      content: {
        questionText: newValue,
        questionStandaloneText: localQuestionStandaloneText,
        answerText: localAnswerText,
      },
    });
  };

  const handleLocalQuestionStandaloneTextChange = (e) => {
    const newValue = e.target.value;

    setLocalQuestionStandaloneText(newValue);
    setQuestion({
      designator: localDesignator,
      weightage: localWeightage,
      content: {
        questionText: localQuestionText,
        questionStandaloneText: newValue,
        answerText: localAnswerText,
      },
    });
  };

  const handleLocalAnswerTextChange = (e) => {
    const newValue = e.target.value;

    setLocalAnswerText(newValue);
    setQuestion({
      designator: localDesignator,
      weightage: localWeightage,
      content: {
        questionText: localQuestionText,
        questionStandaloneText: localQuestionStandaloneText,
        answerText: newValue,
      },
    });
  };

  const handleQuestionDeleteButtonClick = () => {
    if (!window.confirm("Are you sure you want to delete this question? This action is irreversible.")) {
      return;
    }

    setQuestion(null);
  };

  return (
    <Accordion
      width="100%"
      expanded={expanded}
      onChange={(event, expanded) => setExpanded(expanded)}
      sx={{
        width: "100%",
        backgroundColor: "#e8e8e8",
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
          value={localDesignator}
          onChange={handleLocalDesignatorChange}
          placeholder="Designator"
          sx={{
            marginRight: 2,
          }}
          onClick={(e) => e.stopPropagation()}
        />
        <TextField
          value={localWeightage}
          onChange={handleLocalWeightageChange}
          placeholder="Weightage"
          onClick={(e) => e.stopPropagation()}
        />
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          sx={{
            width: "100%",
            marginBottom: 1,
          }}
          value={localQuestionText}
          onChange={handleLocalQuestionTextChange}
          placeholder="Question Text"
          multiline={true}
          rows={3}
        />

        <TextField
          sx={{
            width: "100%",
            marginBottom: 1,
          }}
          value={localQuestionStandaloneText}
          onChange={handleLocalQuestionStandaloneTextChange}
          placeholder="Question Standalone Text"
          multiline={true}
          rows={1}
        />
        <TextField
          sx={{
            width: "100%",
            marginBottom: 1,
          }}
          value={localAnswerText}
          onChange={handleLocalAnswerTextChange}
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
