import FormControls from "./Controls";
import {Avatar, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, IconButton, makeStyles, Paper} from "@material-ui/core";
import SideNav from "./SideNav";
import LoginForm from "./LoginForm";
import Button from "./Controls/Button";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MoreVertIcon from '@material-ui/icons/MoreVert';
const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor : '#64b5f6'
    },
    container : {
        marginLeft : "30%",
        padding : "15%",
        paddingTop : "7%",
        paddingBottom : "0"
        
    }
}))

export default function Login(){
    const classes = useStyles();
    return <>
            <SideNav />
            <div className = {classes.container}>
                <LoginForm />
            </div>
            </>
}