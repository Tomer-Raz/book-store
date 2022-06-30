import environments from "../environments/environments.js";
const { API_URL } = environments

export const userLogout = async (token) => {
    const response = await fetch(`${API_URL}/users/logout`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error();
    }

    const payload = await response.json();
    return payload
}

export const userLogin = async (data) => {
    const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    if (!response.ok) {
        throw new Error();
    }

    const payload = await response.json();
    return payload
}

export const createUser = async (data) => {
    const response = await fetch(`${API_URL}/users/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    if (response.status !== 201) {
        throw new Error();
    }

    const payload = await response.json();
    return payload
}