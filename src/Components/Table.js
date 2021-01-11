import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import { Grid, TableHead, withStyles } from "@material-ui/core";
import UserBookTable from "./TableContent";
import SearchIcon from "./utils/SearchIcon";
import { useSelector } from "react-redux";
import Select from "../Components/Controls/Select";

const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5)
  }
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};

const useStyles2 = makeStyles({
  table: {
    minWidth: 500
  },
  divi: {
    margin: "2px",
    padding: "3px",
    textAlign: "center"
  }
});

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(4)
  },
  textStyle: {
    backgroundColor: "blue",
    fontColor: "white"
  }
}));

const usersTableSearchOptions = [
  { id: "id", value: "id", label: "User ID" },
  { id: "name", value: "name", label: "Name" }
];
const userSearchOptions = [
  { id: "id", value: "id", label: "ID" },
  { id: "Title", value: "title", label: "Title" },
  { id: "subject", value: "subject", label: "Subject" }
];
const librarianSearchOptions = [
  ...userSearchOptions,
  { id: "status", value: "status", label: "Status" },
  { id: "userid", value: "userid", label: "User Id" }
];
export default function CustomPaginationActionsTable(props) {
  const rows = useSelector(state => state.modelData.bookstore);
  console.log(rows);
  const { headers } = props;
  const classes = useStyles2();
  const myclasses = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const role = useSelector(state => state.stateData.role);
  const [length, setLength] = useState(
    rows ? rows.filter(p => p.status === props.category).length : 0
  );
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, length - page * rowsPerPage);
  const [searchValue, setSearch] = useState();
  const [category, setCategory] = useState("title");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <React.Fragment>
      <Grid container>
        <Grid item sm={1} />
        <Grid item>
          {role === "user" && props.category !== "users" && (
            <Select
              id="category"
              name="category"
              variant="filled"
              label="category"
              onChange={e => setCategory(e.target.value)}
              value={category}
              items={userSearchOptions}
            />
          )}
          {role === "librarian" && props.category !== "users" && (
            <Select
              id="category"
              name="category"
              variant="filled"
              label="category"
              onChange={e => setCategory(e.target.value)}
              value={category}
              items={librarianSearchOptions}
            />
          )}
          {props.category === "users" && (
            <Select
              id="category"
              name="category"
              variant="filled"
              label="category"
              onChange={e => setCategory(e.target.value)}
              value={category}
              items={usersTableSearchOptions}
            />
          )}
        </Grid>

        <Grid item sm>
          <SearchIcon name="search" onChange={setSearch} value="searchValue" />
        </Grid>
      </Grid>
      <Paper className={myclasses.root}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="custom pagination table">
            <TableHead className={myclasses.textStyle}>
              <TableRow>
                {headers.map(p => (
                  <StyledTableCell align="center" key={p}>
                    {p}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <UserBookTable
                setLength={setLength}
                searchValue={searchValue}
                searchCategory={category}
                category={props.category}
                setRefresh={props.setRefresh}
                emptyRows={emptyRows}
                page={page}
                rowsPerPage={rowsPerPage}
              />
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={7}
                  count={length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { "aria-label": "rows per page" },
                    native: true
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Paper>
    </React.Fragment>
  );
}

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.blue,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);
