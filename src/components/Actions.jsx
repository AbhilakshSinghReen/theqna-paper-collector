import { useRef, useState, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import MediaManagerDialog from "./MediaManagerDialog";
import { GlobalStateContext } from "../context/GlobalStateContextProvider";
import { downloadObjectAsJSONFile } from "../utils/downloadUtils";
import { defaultPaper, defaultPaperMedia } from "../config/defaults";

export default function Actions() {
  const { paper, setPaper, paperMedia, setPaperMedia } = useContext(GlobalStateContext);

  const sourceFileInputRef = useRef();
  const importFileInputRef = useRef();

  const [mediaManagerDialogOpen, setMediaManagerDialogOpen] = useState(false);

  const handleImportButtonClick = (e) => {
    if (
      !window.confirm(
        "Are you sure you want to import a paper? This will discard all the content of the current paper. The change is not reversible."
      )
    ) {
      return;
    }

    importFileInputRef.current.click();
  };

  const handleImportFileChange = (e) => {
    const uploadedFile = e.target.files[0];

    if (!uploadedFile) {
      return;
    }

    if (uploadedFile.type !== "application/json") {
      window.alert("Only JSON files are supported.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const fileData = e.target.result;
      console.log(fileData);

      try {
        const parsedJson = JSON.parse(fileData);

        const importedPaper = parsedJson.paper;
        const importedPaperMedia = parsedJson.paperMedia;

        setPaper(importedPaper);
        setPaperMedia(importedPaperMedia);
      } catch (error) {
        window.alert("The selected file is not a valid JSON file.");
        return;
      }
    };
    reader.readAsText(uploadedFile);
  };

  const handleExportButtonClick = (e) => {
    const filename = `${paper.metadata.subject} ${paper.metadata.year} ${paper.metadata.type}`;

    const paperPlusMediaObject = {
      paper: paper,
      paperMedia: paperMedia,
    };

    downloadObjectAsJSONFile(paperPlusMediaObject, filename);
  };

  const handleDeleteCacheButtonClick = (e) => {
    if (
      !window.confirm(
        "Are you sure you want to delete all cached items? This will reset the paper data and media files added. This action cannot be reversed."
      )
    ) {
      return;
    }

    localStorage.clear();
    setPaper(defaultPaper);
    setPaperMedia(defaultPaperMedia);
  };

  const handleSourceFileUpload = (event) => {
    const uploadedFile = event.target.files[0];

    if (!uploadedFile) {
      return;
    }

    if (uploadedFile.type !== "application/pdf") {
      window.alert("Only PDF files are supported.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const filename = uploadedFile.name;

      const fileData = e.target.result;

      const updatedPaperMedia = { ...paperMedia };
      updatedPaperMedia.source.filename = filename;
      updatedPaperMedia.source.data = fileData;

      setPaperMedia(updatedPaperMedia);
    };
    reader.readAsDataURL(uploadedFile);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <input
        type="file"
        ref={importFileInputRef}
        style={{ display: "none" }}
        onChange={handleImportFileChange}
        accept=".json"
      />
      <MediaManagerDialog
        open={mediaManagerDialogOpen}
        setOpen={setMediaManagerDialogOpen}
        paperMedia={paperMedia}
        setPaperMedia={setPaperMedia}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            marginRight: 2,
          }}
        >
          <input
            id="source-upload-input"
            type="file"
            accept=".pdf"
            onChange={handleSourceFileUpload}
            style={{ display: "none" }}
            ref={sourceFileInputRef}
          />
          <label
            htmlFor="source-upload-input"
            style={{
              backgroundImage: "linear-gradient(#fae8e1, #f9e4dd)",
              border: `1px dashed ${paperMedia?.source?.filename === "" ? "red" : "black"}`,
              padding: 10,
              borderRadius: 5,
              cursor: "pointer",
              color: "black",
            }}
          >
            {paperMedia?.source?.filename !== "" ? paperMedia.source.filename : "Add Source"}
          </label>
        </Box>

        <Button
          variant="contained"
          color="primary"
          onClick={() => setMediaManagerDialogOpen(true)}
          sx={{
            marginRight: 2,
          }}
        >
          Media Manager
        </Button>

        <Button
          variant="contained"
          color="warning"
          onClick={handleImportButtonClick}
          sx={{
            marginRight: 2,
          }}
        >
          Import
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleExportButtonClick}
          sx={{
            marginRight: 2,
          }}
        >
          Download
        </Button>

        <Button variant="contained" color="error" onClick={handleDeleteCacheButtonClick}>
          Delete Cache
        </Button>
      </Box>
    </Box>
  );
}
