import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FaGithub, FaHeart } from "react-icons/fa";

const style = {
  position: "fixed",
  bottom: 0,
  width: "100%",
  textAlign: "center",
};

export default function Footer() {
  return (
    <Box sx={style}>
      <Typography variant="body1" mt={4}>
        Made with <FaHeart color="#d22" /> by jmossesgeld{" "}
        <a
          href="https://github.com/jmossesgeld/ph-payroll-manager"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
        </a>
      </Typography>
    </Box>
  );
}
