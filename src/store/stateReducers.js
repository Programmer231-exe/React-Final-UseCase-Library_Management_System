import {GIVE_AUTHENTICATION,CLOSE_AUTHENTICATION} from "./stateActions";
import {initialData} from "./initialData";

export default function StateReducer(storeData,action){
    switch(action.type){
        case GIVE_AUTHENTICATION:
            {
                console.log("No matter what this should be called");
            return{
                ...storeData,
                authenticated : true,
                currentuser :action.payload.id,
                role : action.payload.role
            }
        }
        case CLOSE_AUTHENTICATION:
            return{
                ...storeData,
                authenticated : false,
                currentuser : "-1",
                role : "user"
            }
        default:
            return storeData || initialData.stateData;
    }
}