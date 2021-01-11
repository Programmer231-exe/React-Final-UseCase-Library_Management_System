import { withStyles } from "@material-ui/core";
import { TableRow } from "@material-ui/core";
const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
      '&:hover': {
        backgroundColor: "#f8bbd0",
        color: "#ffffff"
  
      }
    }
  }))(TableRow);

  export default StyledTableRow;