import "../styles/Header.css";

import { Box, Heading } from "@chakra-ui/react";

import HeaderStats from "./HeaderStats";

const Header = () => {
  return (
    <Box>
      <Heading className="header">6Wordle</Heading>
      <HeaderStats />
    </Box>
  );
};

export default Header;
