import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Backdrop, Typography } from '@material-ui/core';
import {useDispatch} from "react-redux";
import {closeAuthentication} from "../store/stateActions";
const useStyles = makeStyles({
    root : {
        size : "50"
    }
})
const Logout = () => {
    
    const dispatch = useDispatch();
    useEffect( ()=>{
        
        setTimeout( ()=>{ dispatch(closeAuthentication()); }, 3000);
     },[]);
    const classes = useStyles();
    return <>
    <Backdrop className={classes.backdrop} open={true} >
    <CircularProgress color="inherit" />
    <Typography variant = "h5" component = "h1" >
        &nbsp;Logging out.....
    </Typography>
    </Backdrop>
    </>
}

export default Logout;

