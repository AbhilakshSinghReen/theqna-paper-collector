import Box from "@mui/material/Box";

export default function Footer() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 5,
        paddingTop: 1,
        borderTop: "1px solid grey",
        marginBottom: 10,
      }}
    >
      <h3>© 2024 The Q&A</h3>
    </Box>
  );
}
