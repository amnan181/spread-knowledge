export const GET_USERS = "GET_USERS";

export function getUsers(data) {
    return {
        type: GET_MESSAGES,
        data: data
    }
}