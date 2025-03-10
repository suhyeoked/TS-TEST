export interface UserTs {
    firstName : string 
    lastName : string
    age : number
    isValid : boolean
}

export function getFullName(user : UserTs){
    return `${user.firstName} ${user.lastName}`
}