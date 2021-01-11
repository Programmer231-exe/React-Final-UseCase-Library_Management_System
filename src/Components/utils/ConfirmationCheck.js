import {
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  makeStyles
} from "@material-ui/core";
import { Dialog } from "@material-ui/core";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import CancelIcon from "@material-ui/icons/Cancel";
import WarningIcon from "@material-ui/icons/Warning";
import React from "react";
const useStyles = makeStyles({
  root: {
    width: "100%"
  }
});
export default function ConfirmationCheck(props) {
  const classes = useStyles();

  const { open, confirm, reserveorCheckoutBook, handleClose } = props;

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={classes.root}
    >
      <DialogTitle id="Book Description">
        <IconButton>
          <WarningIcon />
        </IconButton>
        Confirmation Check
      </DialogTitle>
      <DialogContent>{confirm.confirmmsg}</DialogContent>
      <DialogActions>
        <IconButton
          onClick={() => reserveorCheckoutBook(confirm.type, confirm.userid)}
          color="primary"
        >
          <DoneOutlineIcon />
        </IconButton>
        <IconButton onClick={() => handleClose()} color="secondary">
          <CancelIcon />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
}
