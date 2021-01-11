import {BOOKSTORE,USERS} from "./dataTypes";
import {STORE,UPDATE,DELETE} from "./actionTypes";




export const saveUser = (user) => {
    return {
        type : STORE,
        dataType : USERS,
        payload : user
    }
}

export const deleteUser = (user) => {
    return {
        type : DELETE,
        dataType : USERS,
        payload : user.id
    }
}

export const saveBook = (book) => {
    return {
        type: STORE,
        dataType : BOOKSTORE,
        payload : book
    }
}

export const updateBook = (book) => {
    return {
        type : UPDATE,
        dataType : BOOKSTORE,
        payload : book
    }
}
export const deleteBook =(book) => {
    return {
        type : DELETE,
        dataType : BOOKSTORE,
        payload : book
    }
}



