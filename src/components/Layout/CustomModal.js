import { Modal } from "@mui/material";
import { Box } from "@mui/system";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  maxWidth: "90vw",
  maxHeight: "90vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  "& input": { margin: "2px" },
  display: "flex",
  flexWrap: "wrap",
};

export default function CustomModal(props) {
  return (
    <Modal open={props.open} onClose={props.toggleModal}>
      <Box sx={style}>{props.children}</Box>
    </Modal>
  );
}
