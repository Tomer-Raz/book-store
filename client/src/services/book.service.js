import environments from "../environments/environments.js";
const { API_URL } = environments

export const getBookByID = async (bookID) => {
    const response = await fetch(`${API_URL}/books/${bookID}`)

    if (!response.ok) {
        throw new Error();
    }
    const payload = await response.json();

    return payload;
}

export const getAllBooks = async () => {
    const response = await fetch(`${API_URL}/books`)

    if (!response.ok) {
        throw new Error();
    }
    const payload = await response.json();
    return payload
}