export const ADD_MESSAGE = "ADD_MESSAGE";
export const GET_MESSAGES = "GET_MESSAGES";

export function addMessage(data) {
    return {
        type: ADD_MESSAGE,
        data: data
    }
}

export function getMessages(data) {
    return {
        type: GET_MESSAGES,
        data: data
    }
}