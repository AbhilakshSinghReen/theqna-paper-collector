import { useEffect, useState } from "react";
import Box from "@mui/material/Box";

import PaperInputter from "../components/PaperInputter";
import PaperRenderer from "../components/PaperRenderer";
import { defaultPaper, defaultPaperMedia } from "../config/defaults";

export default function LoaderMain() {
  const savedPaperStr = localStorage.getItem("paper");
  const savedPaperMediaStr = localStorage.getItem("paperMedia");

  const [paper, setPaper] = useState(savedPaperStr !== null ? JSON.parse(savedPaperStr) : defaultPaper);
  const [paperMedia, setPaperMedia] = useState(
    savedPaperMediaStr !== null ? JSON.parse(savedPaperMediaStr) : defaultPaperMedia
  );

  useEffect(() => {
    localStorage.setItem("paper", JSON.stringify(paper));
  }, [paper]);

  useEffect(() => {
    localStorage.setItem("paperMedia", JSON.stringify(paperMedia));
  }, [paperMedia]);

  return (
    <Box
      sx={{
        maxWidth: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      <Box
        sx={{
          maxWidth: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <PaperInputter paper={paper} setPaper={setPaper} paperMedia={paperMedia} setPaperMedia={setPaperMedia} />
        <PaperRenderer paper={paper} paperMedia={paperMedia} />
      </Box>
    </Box>
  );
}
