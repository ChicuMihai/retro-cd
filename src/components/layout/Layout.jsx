import React from "react";
import NavBar from "./NavBar";
import Box from "@material-ui/core/Box";

export default function Layout({ children }) {
  return (
    <Box pt="80px">
      <NavBar />
      <div>{children}</div>
    </Box>
  );
}
