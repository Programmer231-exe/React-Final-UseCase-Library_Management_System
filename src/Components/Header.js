import React from "react";
import {AppBar, Toolbar,Grid, Typography, IconButton, makeStyles, Badge, Accordion, AccordionSummary, AccordionDetails, Menu, MenuItem} from "@material-ui/core";
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import { Link, withRouter } from "react-router-dom";
import {useSelector} from "react-redux";
import {ExpandMoreIcon} from '@material-ui/icons/ExpandMore';
import {Button} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root : {
      flexGrow : 1,
      verticalAlign: "middle"
      },
  appbar: {
    backgroundColor : "#cfd8dc"
  },
  homeicon : {
      marginRight : theme.spacing(10)
  },
  title : {
      flexGrow : 1,
      fontSize : theme.spacing(3),
      paddingTop : theme.spacing(1),
      color : "#ff9100"
     
  },
  content : {
    flexGrow : 1,
    textAlign : "right",
    paddingTop : theme.spacing(2),
    color : "#ff9100"
  },
  icon : {
      fontSize : theme.spacing(4),
      
  }

}));

const Header = (props) =>{

const [profileMenu,setProfileMenu] = React.useState(null);
const userid = useSelector(state => state.stateData.currentuser);
const users = useSelector(state => state.modelData.users);
const role = useSelector(state=> state.stateData.role);
const librarian = useSelector(state => state.modelData.librarian);
console.log(role);
console.log(users);
let currentuser = {id : "",firstname : "",lastname : ""};
if(role === "user"){
   currentuser = users.find(p => p.id === userid);
}else{
    console.log(librarian);
    currentuser = librarian.find(p => p.id === userid)
}

console.log(currentuser);


const handleClick = (event) => {
    setProfileMenu(event.currentTarget);
  };
  const handleClose = () => {
    setProfileMenu(null);
  };

const classes = useStyles();

return <div className = {classes.root}>
  <AppBar className = {classes.appbar} position = "relative"> 
        <Toolbar>
            <Grid container>
                <Grid item sm={1} xs = {4} >
                        <IconButton edge="start" className = {classes.homeicon} >
                            <ImportContactsIcon className = {classes.icon}/>
                        </IconButton>
                </Grid>
                <Grid item sm>
                    <Typography variant = "h6" className = {classes.title} >
                        Welcome To Library
                    </Typography>
                </Grid>
                <Grid item sm= {5}>
                       {currentuser !== undefined && <Typography variant = "subtitle2" component = "h1" className = {classes.content}>
                         {`Hello , ${currentuser.firstname} ${currentuser.lastname} (${currentuser.id}) (${role})`}
                         </Typography>
                         }
                </Grid>
                <Grid item>
                    
                    
                    <IconButton  onClick = {handleClick}>
                        <AccountCircleIcon  className = {classes.icon}/>
                    </IconButton>
                    <Menu id = "profile-menu" anchorEl = {profileMenu} open = {Boolean(profileMenu)} onClose = {handleClose}>
                        <MenuItem ><Link to = "/logout">Logout</Link></MenuItem>
                        </Menu> 
                    

                </Grid>
                <Grid item>
                </Grid>
            </Grid>
        </Toolbar>
    </AppBar></div>
} 

export default withRouter(Header);



/*
<IconButton>
                        <Badge badgeContent = {4} color = "primary">
                        <NotificationsIcon className = {classes.icon} />
                        </Badge>
                    </IconButton>*/