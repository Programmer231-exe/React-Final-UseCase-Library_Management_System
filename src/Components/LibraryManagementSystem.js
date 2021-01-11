import {BrowserRouter as Router, Redirect, Switch} from "react-router-dom";
import {useSelector} from "react-redux";
import PrivateRoute from "./Routing/PrivateRoute";
import PublicRoute from "./Routing/PublicRoute";
import Login from "./Login";
import Home from './Home';
import Logout from './Logout';



export default function LibraryManagementSystem(){
    const authenticated = useSelector(state => state.stateData.authenticated);
    return <Router>
        <Switch>
            <PrivateRoute path = "/home" authenticated = {authenticated} component = {Home} />
            <PrivateRoute path = "/logout" authenticated = {authenticated} component = {Logout} />
            <PublicRoute path = "/login" authenticated = {authenticated} component = {Login} />
            <Redirect to = "/home" />
        </Switch>
    </Router>
}