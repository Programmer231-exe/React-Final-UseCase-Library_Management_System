import {
    USERS_URL, 
    LOGIN_URL
} from "./server/serverURL";


export const login = () => {
    let loginObj =  {username : "johncen@mylms.com",password : "passwrd"};
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
        }).then((data) => successlogin(data, loginObj), (err) => { console.log(err);console.log("Some error occurs") }).catch(err => console.log(err))
    }catch (err) {
        console.log("Error occurs at server Side");
    }}

    const successlogin = (data,loginObj) => {
        console.log(JSON.stringify(data));
        console.log(JSON.stringify(loginObj));
        if (data.password === loginObj.password) {
            console.log("Successfully");
        } else {
            console.log("Login failed");
        }

    }

    export const addUser = (user) => {
        try{
            fetch(USERS_URL,{
                method: "POST",
                headers : {
                    "content-type": "application/json"
                },
                body : JSON.stringify(user)
            }).then(data => {if(data.status > 400 ){
                throw new Error("Post Operation fails");
            }
            return data.json()}).then(data => console.log(data + "added successfully"),err=> console.log("user object" + "cannot be added")).catch(err => console.log("Some errors"));
        }catch(err){
            console.log(err);
        }
    }