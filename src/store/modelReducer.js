import {STORE,UPDATE,DELETE} from "./actionTypes";
import {initialData} from "./initialData";
import { CLOSE_AUTHENTICATION } from "./stateActions";

export default function ModelReducer(storeData,action){
    console.log("Main Reducer");
    switch(action.type){
        case STORE:
            {   
                if(storeData === null){
                    console.log("Store data is null");
                }
                return{
                    ...storeData,
                    [action.dataType]:
                     storeData[action.dataType].concat([action.payload]),
                }
            }
        case UPDATE : 
            
            return {
                ...storeData,
                [action.dataType] : storeData[action.dataType].map(p => 
                    p.id === action.payload.id ? action.payload : p )
            }

        case DELETE:
            return {
                ...storeData,
                [action.dataType] : storeData[action.dataType]
                .filter(p=> p.id !== action.payload)
            }

        case CLOSE_AUTHENTICATION:
            return initialData.modelData

        default : 
            return storeData || initialData.modelData;
    }
}