import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Button";

export default function MediaManagerMediaItem({ image, isUpdatingMedia, handleImageDelete }) {
  const [copyButtonText, setCopyButtonText] = useState("COPY");

  return (
    <Box
      sx={{
        width: "100%",
        height: "35vh",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: 2,
        backgroundColor: "#eeeeee",
        borderRadius: 5,
      }}
      key={image.fileId}
    >
      <Box
        sx={{
          width: "60%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <img
          src={image.data}
          alt={image.filename}
          style={{
            display: "block",
            maxWidth: "100%",
            maxHeight: "100%",
            width: "auto",
            height: "auto",
          }}
        />
      </Box>

      <Box
        sx={{
          width: "20%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography>{image.filename}</Typography>
      </Box>

      <Box
        sx={{
          width: "20%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            let imageTag = "{{media(";
            imageTag += `fileId="${image.fileId}"`;
            imageTag += ")}}";
            navigator.clipboard.writeText(imageTag);

            setCopyButtonText("COPIED");

            setTimeout(() => {
              setCopyButtonText("COPY");
            }, 2_000);
          }}
          sx={{
            marginBottom: 2,
          }}
        >
          {copyButtonText}
        </Button>

        <Button variant="contained" color="error" disabled={isUpdatingMedia} onClick={() => handleImageDelete()}>
          Delete
        </Button>
      </Box>
    </Box>
  );
}
