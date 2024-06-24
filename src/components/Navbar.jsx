import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import Actions from "./Actions";
import { appName } from "../config/config";

export default function Navbar() {
  return (
    <AppBar
      position="fixed"
      sx={{
        height: "8vh",
        backgroundColor: "#10898d",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
          padding: 0,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            "&:hover": {
              cursor: "pointer",
            },
            background: "linear-gradient(45deg, #FFD700 30%, #FFA500 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {appName}
        </Typography>

        <Actions />
      </Toolbar>
    </AppBar>
  );
}
