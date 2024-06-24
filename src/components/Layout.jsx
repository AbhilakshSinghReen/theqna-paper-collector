import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <Container maxWidth={false}>
        {children}
        {/* <Footer /> */}
      </Container>
    </div>
  );
}
