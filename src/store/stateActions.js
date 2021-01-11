export const GIVE_AUTHENTICATION = "give_authentication";
export const CLOSE_AUTHENTICATION = "close_authentication";


export const giveAuthentication = (user)=> {
    console.log("Authentication GEt called");
    return ({
    type : GIVE_AUTHENTICATION,
    dataType: user.role,
    payload : user
})}

export const closeAuthentication = (user) => ({
    type : CLOSE_AUTHENTICATION
})