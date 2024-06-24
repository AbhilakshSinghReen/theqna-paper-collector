import { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function PaperMetadata({ metadata, setMetadata }) {
  const [expanded, setExpanded] = useState(true);
  const [data, setData] = useState(metadata);

  const handleChange = (key, value) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const updateMetadata = () => {
    setTimeout(() => {
      setMetadata(data);
    }, 1000);
  };

  useEffect(() => {
    setData(metadata);
  }, [metadata]);

  return (
    <Accordion
      width="100%"
      expanded={expanded}
      onChange={(event, expanded) => setExpanded(expanded)}
      sx={{
        width: "100%",
        backgroundColor: "#eeeeee",
        // borderRadius: 2,
        marginBottom: 2,
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          backgroundColor: "#00ff0044",
        }}
      >
        <Typography>
          <strong>Paper Metadata</strong>
        </Typography>
      </AccordionSummary>

      <AccordionDetails>
        {Object.keys(data).map((key) => (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              marginBottom: 1,
            }}
            key={key}
          >
            <Box
              sx={{
                width: "35%",
              }}
            >
              <Typography>{key}:</Typography>
            </Box>

            <TextField
              value={data[key]}
              onChange={(e) => handleChange(key, e.target.value)}
              onBlur={() => updateMetadata()}
              placeholder={key}
            />
          </Box>
        ))}
      </AccordionDetails>
    </Accordion>
  );
}
