import {BOOKMANAGER,IDVALUES,LIBRARIAN,BOOKSTORE,USERS,ADDRESS,BOOKDESCRIPTION, CURRENTUSERADDRESS} from "./dataTypes";
export const initialData = {
    modelData: {
        [USERS] : [],
        [LIBRARIAN] : [],
        [IDVALUES] : [],
        [BOOKMANAGER] : [],
        [BOOKSTORE] : [],
        [BOOKDESCRIPTION]:[],
        [ADDRESS] : [],
        [CURRENTUSERADDRESS]:[]
    },
    stateData : {
        currentuser : "-1",
        role : "user",
        authenticated : false
    }
}