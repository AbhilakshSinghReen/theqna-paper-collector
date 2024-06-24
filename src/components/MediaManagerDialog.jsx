import { useRef, useState, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AddBoxIcon from "@mui/icons-material/AddBox";

import { GlobalStateContext } from "../context/GlobalStateContextProvider";
import MediaManagerMediaItem from "./MediaManagerMediaItem";

export default function MediaManagerDialog({ open, setOpen }) {
  const { paperMedia, setPaperMedia } = useContext(GlobalStateContext);

  const addMediaInputRef = useRef();

  const [isUpdatingMedia, setIsUpdatingMedia] = useState(false);

  const handleAddMediaButtonClick = (e) => {
    addMediaInputRef.current.click();
  };

  const handleAddMediaInputFileChange = (e) => {
    setIsUpdatingMedia(true);

    const uploadedFile = e.target.files[0];

    if (!uploadedFile) {
      return;
    }

    // if (uploadedFile.type !== "application/json") {
    //   window.alert("Only JSON files are supported.");
    //   return;
    // }

    const reader = new FileReader();
    reader.onload = (e) => {
      const filename = uploadedFile.name;
      const fileId = new Date().toISOString() + "---" + uploadedFile.name;

      const fileData = e.target.result;

      const updatedPaperMedia = { ...paperMedia };
      updatedPaperMedia.images.push({
        filename: filename,
        fileId: fileId,
        data: fileData,
      });

      setPaperMedia(updatedPaperMedia);

      setIsUpdatingMedia(false);
    };
    reader.readAsDataURL(uploadedFile);
  };

  const handleImageDelete = (imageIndex) => {
    if (!window.confirm("Are you sure you want to delete this image? This action cannot be reversed.")) {
      return;
    }

    const updatedPaperMedia = { ...paperMedia };
    updatedPaperMedia.images.splice(imageIndex, 1);
    setPaperMedia(updatedPaperMedia);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
      <input
        type="file"
        ref={addMediaInputRef}
        style={{ display: "none" }}
        onChange={handleAddMediaInputFileChange}
        accept=".jpg,.jpeg,.png"
      />

      <DialogTitle>Media Manager</DialogTitle>

      <DialogContent>
        <Box width="100%" display="flex" flexDirection="column" justifyContent="flex-start" alignItems="center">
          {paperMedia.images.map((image, index) => (
            <MediaManagerMediaItem
              image={image}
              isUpdatingMedia={isUpdatingMedia}
              handleImageDelete={() => handleImageDelete(index)}
              key={image.fileId}
            />
          ))}
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Tooltip title="Add Image">
            <IconButton
              color="warning"
              onClick={handleAddMediaButtonClick}
              disabled={isUpdatingMedia}
              sx={{
                marginRight: 2,
              }}
            >
              <AddBoxIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          "&&": {
            justifyContent: "center",
          },
        }}
      >
        <Box height={100}>
          <Button variant="contained" color="error" onClick={() => setOpen(false)} disabled={isUpdatingMedia}>
            Close
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
