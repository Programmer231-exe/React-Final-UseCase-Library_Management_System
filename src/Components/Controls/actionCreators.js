import {PRODUCTS, USERS} from "./dataTypes";
import { STORE, UPDATE, DELETE } from "./actionTypes";

let idCounter = 100;

export const saveProduct = (product) => {
    return createSaveEvent(PRODUCTS, product);
}

export const saveUser = (user) => {

}

const createSaveEvent = (dataType,payload) => {
    console.log("ACtion Creators 15 " + JSON.stringify(payload));
    if(!payload.id){
        return {
            type : STORE,
            dataType : dataType,
            payload : {...payload, id: idCounter++}
        }
    }else{
        return {
            type : UPDATE, 
            dataType : dataType, 
            payload : payload
        }
    }
}

export const deleteProduct = (product) => ({
    type : DELETE,
    dataType : PRODUCTS,
    payload : product.id
})

