import { STORE, UPDATE } from "../store/actionTypes";
import {
  ADDRESS,
  BOOKDESCRIPTION,
  BOOKMANAGER,
  BOOKSTORE,
  LIBRARIAN,
  USERS
} from "../store/dataTypes";
import { GIVE_AUTHENTICATION } from "../store/stateActions";
import { UpdateData } from "./RestDataSource";
import { GetData } from "./RestDataSource";
export const GET_DATA = "rest_get_data";

export const getData = dataType => {
  return {
    type: GET_DATA,
    dataType: dataType
  };
};

export const restMiddleware = () => {
  return ({ dispatch, getState }) => next => action => {
    switch (action.type) {
      case GET_DATA: {
        if (getState().modelData[action.dataType].length === 0) {
          GetData(action.dataType, data =>
            data.forEach(item =>
              next({
                type: STORE,
                dataType: action.dataType,
                payload: item
              })
            )
          );
        }
        break;
      }

      case GIVE_AUTHENTICATION: {
        let group_of_actions = [
          {
            type: action.type,
            dataType: action.dataType,
            payload: action.payload
          }
        ];
        GetData(BOOKSTORE, data =>
          data.forEach(item => {
            group_of_actions.push(
              next({
                type: STORE,
                dataType: BOOKSTORE,
                payload: item
              })
            );
          })
        );
        GetData(BOOKDESCRIPTION, data =>
          data.forEach(item =>
            group_of_actions.push(
              next({
                type: STORE,
                dataType: BOOKDESCRIPTION,
                payload: item
              })
            )
          )
        );

        if (action.dataType === "librarian") {
          GetData(
            LIBRARIAN,
            data => {
              group_of_actions.push(
                next({
                  type: STORE,
                  dataType: LIBRARIAN,
                  payload: data
                })
              );
            },
            action.payload.id
          );
          GetData(
            USERS,
            data => {
              group_of_actions.push(
                next({
                  type: STORE,
                  dataType: USERS,
                  payload: data
                })
              );
            },
            ""
          );

          GetData(ADDRESS, data =>
            data.forEach(item =>
              group_of_actions.push(
                next({
                  type: STORE,
                  dataType: ADDRESS,
                  payload: item
                })
              )
            )
          );
        } else {
          console.log("Some process");

          GetData(
            USERS,
            data => {
              console.log(JSON.stringify(data));
              group_of_actions.push(
                next({
                  type: STORE,
                  dataType: USERS,
                  payload: data
                })
              );
            },
            ""
          );
        }
        group_of_actions.forEach(action => {
          next(action);
        });
        break;
      }

      case UPDATE:
        console.log(action.payload.id);
        UpdateData(
          action.dataType,
          () => console.log("Updated succesfully"),
          action.payload.id,
          action.payload
        );
        next(action);
        break;
      default:
        next(action);
        break;
    }
  };
};

export default restMiddleware;
