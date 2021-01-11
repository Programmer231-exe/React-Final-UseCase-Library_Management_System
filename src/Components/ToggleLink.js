import React from "react";
import {  Link ,withRouter} from "react-router-dom";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    unclicked : {
        color : "#98ad98",
        fontStyle : "none",
        textDecoration : "none"
    },
    clicked : {
       fontWeight : "bold",
       fontSize : theme.spacing(3),
       textDecoration : "none"
    }
}))


const ToggleLink = (props) => {

    const classes = useStyles();
    let value  = classes.clicked;
   
    if(props.to===props.location.pathname){
        value = classes.clicked;
    }
    else{
        value = classes.unclicked;
    }

    return <><Link to = {props.to} className = {value} >{props.children} </Link></>
}



export default withRouter(ToggleLink);