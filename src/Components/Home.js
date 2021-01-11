import Header from "./Header";
import { useSelector } from "react-redux";
import PrivateRoute from "./Routing/PrivateRoute";
import BooksTable from "./BooksTable";
import Profile from "./Profiles";
import { Redirect } from "react-router-dom";
import { Badge, Grid, IconButton, Toolbar } from "@material-ui/core";
import React from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import StoreIcon from "@material-ui/icons/Store";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import StorageIcon from "@material-ui/icons/Storage";
import GroupIcon from "@material-ui/icons/Group";
import ToggleLink from "./ToggleLink";

const Home = props => {
  const books = useSelector(state => state.modelData.bookstore);
  const userid = useSelector(state => state.stateData.currentuser);
  const role = useSelector(state => state.stateData.role);
  const users = useSelector(state => state.modelData.users);

  let totalusers = 0;
  if (users[0] !== undefined && users[0] !== null) {
    totalusers = users[0].length;
  }

  let totalbooks = books !== undefined ? books.length : 0;
  let availablebooks = books.filter(p => p.status === "Available").length;
  let reservedbooks = books
    .filter(p => p.status === "Reserved")
    .filter(p => p.userid === userid).length;
  let checkedout = books
    .filter(p => p.status === "Checked Out")
    .filter(p => p.userid === userid).length;
  let totalreservedbooks = books.filter(p => p.status === "Reserved").length;
  let totalcheckout = books.filter(p => p.status === "Checked Out").length;

  return (
    <React.Fragment>
      <Header />
      <div>
        <div>
          <Toolbar>
            <Grid container>
              <Grid item sm={2} />
              <Grid item xs={12} sm={3}>
                {role === "user" ? (
                  <ToggleLink to="/home/bookstore">
                    <IconButton>
                      <Badge badgeContent={availablebooks} color="primary">
                        <StoreIcon />
                      </Badge>
                    </IconButton>
                    Available Books
                  </ToggleLink>
                ) : (
                  <ToggleLink to="/home/librarian/statuscheck">
                    <IconButton>
                      <Badge
                        badgeContent={sum(totalreservedbooks, totalcheckout)}
                        color="primary"
                      >
                        <StorageIcon />
                      </Badge>
                    </IconButton>
                    Status
                  </ToggleLink>
                )}
              </Grid>
              <Grid item xs={12} sm={3}>
                {role === "user" ? (
                  <ToggleLink to="/home/reserved">
                    <IconButton>
                      {" "}
                      <Badge badgeContent={reservedbooks} color="primary">
                        <FavoriteIcon />
                      </Badge>
                    </IconButton>
                    Your Reserved
                  </ToggleLink>
                ) : (
                  <ToggleLink to="/home/librarian/bookstore">
                    <IconButton>
                      <Badge badgeContent={totalbooks} color="primary">
                        <StoreIcon />
                      </Badge>
                    </IconButton>
                    All Books
                  </ToggleLink>
                )}
              </Grid>
              <Grid item xs={12} sm={3}>
                {role === "user" ? (
                  <ToggleLink to="/home/checked">
                    <IconButton>
                      <Badge badgeContent={checkedout} color="primary">
                        <ShoppingBasketIcon />
                      </Badge>
                    </IconButton>
                    Check Out
                  </ToggleLink>
                ) : (
                  <ToggleLink to="/home/librarian/users">
                    <IconButton>
                      <Badge badgeContent={totalusers} color="primary">
                        <GroupIcon />
                      </Badge>
                    </IconButton>
                    Users
                  </ToggleLink>
                )}
              </Grid>
            </Grid>
          </Toolbar>
        </div>
      </div>
      <div>
        <PrivateRoute
          path={`${props.match.url}/bookstore`}
          authenticated={true}
          category="Available"
          component={BooksTable}
        />
        <PrivateRoute
          path={`${props.match.url}/reserved`}
          authenticated={true}
          category="Reserved"
          component={BooksTable}
        />
        <PrivateRoute
          path={`${props.match.url}/checked`}
          authenticated={true}
          category="Checked Out"
          component={BooksTable}
        />
        <PrivateRoute
          path={`${props.match.url}/librarian/statuscheck`}
          authenticated={true}
          category="status"
          component={BooksTable}
        />
        <PrivateRoute
          path={`${props.match.url}/librarian/bookstore`}
          authenticated={true}
          category="allbooks"
          component={BooksTable}
        />
        <PrivateRoute
          path={`${props.match.url}/librarian/users`}
          authenticated={true}
          category="users"
          component={BooksTable}
        />
        <PrivateRoute
          path={`${props.match.url}/profile`}
          authenticated={true}
          component={Profile}
        />
        {role === "user" ? (
          <Redirect to="/home/bookstore" />
        ) : (
          <Redirect to="/home/librarian/statuscheck" />
        )}
      </div>
    </React.Fragment>
  );
};

export default Home;

const sum = (s1, s2) => {
  let p1 = parseInt(s1);
  let p2 = parseInt(s2);
  return p1 + p2;
};
