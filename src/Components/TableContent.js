import { useState } from "react";
import StyledTableRow from "./utils/StyledTableRow";
import { updateBook } from "../store/actionCreators";
import { useSelector } from "react-redux";
import { List, ListItem, ListItemIcon, ListItemText, makeStyles,TableRow} from "@material-ui/core";
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { Dialog, DialogActions, DialogContent, DialogTitle, TableCell } from '@material-ui/core';
import Rating from "./utils/Rating";
import { IconButton } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import { Alert } from "@material-ui/lab";
import { useDispatch } from "react-redux";
import ConfirmationCheck from "./utils/ConfirmationCheck";
import StarIcon from '@material-ui/icons/Star'
import BookDescription from "./utils/BookDescription";
import UserDescription from "./utils/UserDescription";

const initialDescriptionData = {
  id: "",
  booktitle: "",
  author: "",
  publisher: "",
  description: "",
  category: "",
  hardcover: 0



}

const useStyles = makeStyles({
  root: {
    width: "100%"
  }
})
const UserBookTable = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const rows = useSelector(data => data.modelData.bookstore);
  const role = useSelector(data => data.stateData.role);
  const userId = useSelector(data => data.stateData.currentuser);
  const users = useSelector(data => data.modelData.users);
  const address = useSelector(data => data.modelData.address);
  const bookdescription = useSelector(data => data.modelData.bookdescription);
  const [opendescription, setOpenDescription] = useState(false);
  const [description, setDescription] = useState(initialDescriptionData);
  const [openuserdescription,setOpenUserDescription] = useState(false)
  const [confirm,setConfirmation] = useState({confirmwindow : false,type: "",confirmmsg : "Are you Sure"});
  const [book,setBook] = useState({});
  const { emptyRows, page, rowsPerPage,category ,searchValue,searchCategory} = props;
  let myrows = rows ? rows : [];
  
    
  
  if(role === "user"){
    myrows = rows ? rows.filter(p => p.status === category) : [];

 
    if(category === "Reserved" || category === "Checked Out"){
      myrows = myrows.filter(p => p.userid === userId);
    }

  }else{
    if(category === "status"){
      myrows = rows.filter(p => (p.status === "Reserved" || p.status === "Checked Out"));
    }
    if(category === "allbooks"){
      myrows = rows
    }
    if(category === "users"){
      myrows = users ? users[0] : []
    }

  }

    
   
    
    
    if(searchValue !== undefined ){
      switch(searchCategory){
        case "id":{
          myrows = myrows.filter(p => p.id.toLowerCase().includes(searchValue.toLowerCase()));
          break;
        }
        case "title":{
          myrows = myrows.filter(p => p.booktitle.toLowerCase().includes(searchValue.toLowerCase()));
          break;
        }
        case "subject":{
          let subjectBooks = bookdescription.filter(p => p.category.split(",").some(p => {console.log(p); return p.toLowerCase().includes(searchValue.toLowerCase())})).map(p => p.id);
          myrows = myrows.filter(p => subjectBooks.includes(p.id));
          break;
        }

        case "status": 
          myrows = myrows.filter(p => p.status.toLowerCase().includes(searchValue.toLowerCase()));
          break;

        case "userid": 
          console.log(searchValue);
          myrows = myrows.filter(p => p.userid.toLowerCase().includes(searchValue.toLowerCase()));
          break;

        case "name" :
          myrows = myrows.filter(p => (p.firstname + " " + p.lastname).toLowerCase().includes(searchValue.toLowerCase()))
          break;
        }
  
      
    }
  


    props.setLength(myrows.length);
  

  const reserveorCheckoutBook = (type,userid = userId) => {
    let result = new Date();
    result.setDate(new Date().getDate() + 13);
    console.log(result);
    //setReserve(false);
    let newbook = { ...book, userid: userid, status: type };
    dispatch(updateBook(newbook));
    setConfirmation({confirmwindow : false,type: "",confirmmsg : ""});


  }

 


  const handelUserDescription = (data) =>{
    console.log(users);
    console.log(address);
    setOpenUserDescription(true);

    let user;
    if(users[0] !== undefined){
      user = users[0].find(p => p.id === data.userid);
    }
    let useraddress = address.find(p => p.id === data.userid);
    console.log(user);
    console.log(useraddress);
    setDescription({...user, ...useraddress});
    console.log(description);
  }

  const handleDescription = (data) => {
    setOpenDescription(true);
    setDescription(bookdescription.find((currentValue, index, arr) => currentValue.id === data.id));
  }

  const handleReserve = (row) => {
      setBook(row);
      setConfirmation({confirmwindow : true,type : "Reserved" ,confirmmsg : "Are you Sure to Add this book to your reserved list?"});
  }

  const handleCheckout = (row) => {
    setBook(row);
    setConfirmation({confirmwindow : true,type : "Checked Out" ,confirmmsg : "Are you Sure to check out  this book?"});
  }

  const handleRemove = (row) => {
    setBook(row);
    setConfirmation({confirmwindow : true,userid : "",type : "Available" ,confirmmsg : "Are you Sure to remove  this book?"});
  }

  

  const handleClose = () => {
    setBook({});
    setConfirmation({confirmwindow : false,type: "",confirmmst : ""});
  }
  return <>
    {(rowsPerPage > 0
      ? myrows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : myrows
    ).map((row, index) => {

     
      return <StyledTableRow key={row.id}>
        <TableCell>{page * rowsPerPage + index + 1} </TableCell>
        {(role === "librarian" || category === "Reserved" || category === "Checked Out") &&<TableCell align="center">
          {row.id}
        </TableCell> }
        {category !== "users" && <TableCell align="left" onClick={() => handleDescription(row)}>
          {row.booktitle} 
        </TableCell>}
        {category === "Available" && <TableCell align="center">
          <Rating review={row.customerreviews} />
        </TableCell> }
        {((role === "user" && category  !== "Checked Out") || (role === "librarian" && category === "allbooks")) && <TableCell align="center">
          {row.position}
        </TableCell>}
        {(category === "Available" || role === "librarian") && (category !== "users")  && <TableCell align="center">
          {row.status === "Checked Out" && <Alert severity="error">{row.status}</Alert>}
          {row.status === "Reserved" && <Alert severity="warning">{row.status}</Alert>}
          {row.status === "Available" && <Alert severity="success">Available</Alert>}
        </TableCell>}
        {role === "user" && <TableCell align="center">
          {category === "Available" && <><IconButton onClick={() => handleReserve(row)}>
            <FavoriteBorderIcon />
          </IconButton>
          <IconButton onClick={() => handleCheckout(row)}>
            <LibraryAddCheckIcon />
          </IconButton></>}
          {category !== "Available" && <><IconButton onClick={() => handleRemove(row)}>
            <RemoveCircleIcon />
          </IconButton>
          </>}
        </TableCell>}
        {category !== "users" && role === "librarian" && <TableCell align = "center" onClick = {() => handelUserDescription(row)}>
            {row.userid}
          </TableCell>}
        {category === "users" && <><TableCell align = "center" onClick = {() =>  handelUserDescription({userid : row.id})} >
            {row.firstname} {row.lastname}
          </TableCell>
          <TableCell align = "center" >
            {address.find(p => p.id === row.id).contactno}
          </TableCell>
          <TableCell align = "center" >
          <List component="nav" className={classes.root} aria-label="contacts">
             {rows.filter(p => p.userid === row.id).map(p => 
              <><ListItem button onClick = {() => handleDescription(p)}>
                <ListItemIcon>
                  <StarIcon />
                </ListItemIcon>
                <ListItemText primary={p.booktitle} secondary = {p.status} />
              </ListItem>
            </>
            )}
            </List>
          </TableCell>
          </>}
      </StyledTableRow>
})}

    {emptyRows > 0 && (
      <TableRow style={{ height: 53 * emptyRows }}>
        <TableCell colSpan={7} />
      </TableRow>
    )}

      <UserDescription opendescription = {openuserdescription} description = {description} setOpenDescription = {setOpenUserDescription} />
      <BookDescription opendescription = {opendescription} description= {description} setOpenDescription  = {setOpenDescription} />
      <ConfirmationCheck open = {confirm.confirmwindow} confirm = {confirm} handleClose = {handleClose} reserveorCheckoutBook = {reserveorCheckoutBook} />
   

  </>
}


export default UserBookTable;

