import {
    BOOKDESCRIPTION_URL,
    BOOKSTORE_URL,
    LIBRARIAN_URL,
    ADDRESS_URL,
    USERS_URL,
    LOGIN_URL,
    BOOKMANAGER_URL
} from "../server/serverURL";

import {
    LIBRARIAN,
    USERS,
    ADDRESS,
    BOOKSTORE,
    BOOKMANAGER,
    BOOKDESCRIPTION,
    CURRENTUSERADDRESS
} from "../store/dataTypes";

export const login = (user,callback,errorcallback,) => {
    let loginObj =  user;
    try {

        console.log(loginObj.username);
        fetch(`${LOGIN_URL}/${loginObj.username}`).then((data) => {
            console.log(JSON.stringify(data));
            if (data.status > 400) {
                console.log(JSON.stringify(data));
                throw new Error("Username not existed");
            }
            console.log(JSON.stringify(data));
            return data.json();
        }).then((data) => successlogin(data,loginObj,callback), (err) => { console.log(err);errorcallback({error: true,errormessage : "Username not existed"}) }).catch(err => errorcallback({error: true,errormessage : "Username and password not matching"}))
}catch (err) {
        console.log("Error occurs at server Side");
    }}

    const successlogin = (data,loginObj,callback,errorcallback) => {
        console.log(JSON.stringify(data));
        console.log(JSON.stringify(loginObj));
        if (data.password === loginObj.password) {
            console.log("This is the prop");
           callback(data);
        } else {
            errorcallback({error : "true",errormessage : "Username and password not matching"})
        }

    }

    const sendRequest = (method,url,callback,data) =>{
        let body;
        if(method === "GET" || method === "DELETE"){
            body = null;
        }else{
            body = JSON.stringify(data);
        }

    
        try{
           fetch(url,{
                method : method,
                body : body,
                headers : {
                    "content-type" : "application/json"
                }
            }).then(response => {
                if(response.status > 400){
                    console.log(JSON.stringify(response));
                    throw new Error("Server error");
                }
                return response.json();
            }).catch(err => console.log(err))
            .then(data => callback(data)).catch(err => console.log(err))
        }catch(err){
            console.log("Some error occurs");
        }
    }

    
    

    export const saveUserLogin = (userLogin) => {
        sendRequest("POST",LOGIN_URL,() => {console.log("Successfully saved")},userLogin);
    }

    export const saveUserDetails = (userDetails) => {
        sendRequest("POST",USERS_URL,(data) => console.log(JSON.stringify(data)),userDetails);
    }

    export const saveUserAddress = (userAddress) => {
        sendRequest("POST",ADDRESS_URL,() => console.log("Successfully saved"),userAddress)
    }

    export const saveBookManager = (bookManager) => {
        sendRequest("POST",BOOKMANAGER_URL,() => console.log("Successfully saved"),bookManager)
    }

    export const GetData = (dataType,callback,id) => {
        switch(dataType){
            case LIBRARIAN:
                sendRequest("GET",`${LIBRARIAN_URL}/${id}`,callback,null)
                break;
            case USERS:
                if(id === ""){
                    sendRequest("GET",`${USERS_URL}`,callback,null);    
                }
                else{
                    sendRequest("GET",`${USERS_URL}/${id}`,callback,null);
                }
                 break;
            case ADDRESS:
                sendRequest("GET",`${ADDRESS_URL}`,callback,null);
                break;
            case BOOKSTORE:
                sendRequest("GET",BOOKSTORE_URL,callback,null);
                break;
            case BOOKMANAGER:
                sendRequest("GET",BOOKMANAGER_URL,callback,null);
                break;
            case BOOKDESCRIPTION:
                sendRequest("GET",BOOKDESCRIPTION_URL,callback,null);
                break;
            case CURRENTUSERADDRESS:
                sendRequest("GET",`${ADDRESS_URL}/${id}`,callback,null);
                break;
            default:
                console.log("Not a valid operation");
                break;
        }
    }

    export const UpdateData = (dataType,callback,id,body) => {
         switch(dataType){
            case LIBRARIAN:
                sendRequest("PUT",`${LIBRARIAN_URL}/${id}`,callback,body)
                break;
            case USERS:
                sendRequest("PUT",`${USERS_URL}/${id}`,callback,body);
                break;
            case ADDRESS:
                sendRequest("PUT",`${ADDRESS_URL}/${id}`,callback,body);
                break;
            case BOOKSTORE:
                sendRequest("PUT", `${BOOKSTORE_URL}/${id}`,callback,body);
                break;
            case BOOKMANAGER:
                sendRequest("PUT",`${BOOKMANAGER_URL}/${id}`,callback,null);
                break;
            case BOOKDESCRIPTION:
                sendRequest("PUT",`${BOOKDESCRIPTION_URL}/${id}`,callback,null);
                break;
            default:
                console.log("Not a valid operations");
                break;
           
        }
    }

    export const createData = (dataType,callback,body) => {
        switch(dataType){
            case LIBRARIAN:
                sendRequest("POST",`${LIBRARIAN_URL}`,callback,body)
                break;
            case USERS:
                sendRequest("POST",`${USERS_URL}`,callback,body);
                break;
            case ADDRESS:
                sendRequest("POST",`${ADDRESS_URL}`,callback,body);
                break;
            case BOOKSTORE:
                sendRequest("POST", `${BOOKSTORE_URL}`,callback,body);
                break;
            case BOOKMANAGER:
                sendRequest("POST",`${BOOKMANAGER_URL}`,callback,body);
                break;
            case BOOKDESCRIPTION:
                sendRequest("POST",`${BOOKDESCRIPTION_URL}`,callback,body);
                break;
            default:
                console.log("Not a valid operations");
                break;
           
        }
    }


    const saveBook = (data) => {
        const apiURL = "http://localhost:3500/bookstore/" + data.id;
        try{
            fetch(apiURL, {
                method: "PUT",
                body: JSON.stringify(data),
                headers: {
                    "content-type": "application/json"
                }
            }).then(data => {
                if (data.status > 400) {
                    throw new Error("Already exists");
                }
                return data.json()
            }).then(data => console.log("Data Stored Successfully")).catch(err => console.log(err));
    }catch(err){
        console.log(err);
    }
    }


