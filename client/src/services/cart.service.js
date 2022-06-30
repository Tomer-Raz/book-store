import environments from "../environments/environments.js";
const { API_URL } = environments

export const getCart = async (token) => {
    const response = await fetch(`${API_URL}/cart`, {
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

export const addToCart = async (token, data) => {
    const response = await fetch(`${API_URL}/cart/add-to-cart`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
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

export const cartCheckout = async (token) => {
    const response = await fetch(`${API_URL}/cart/checkout`, {
        method: 'PUT',
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

export const removeBookFromCart = async (token, data) => {
    const response = await fetch(`${API_URL}/cart/`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    if (response.status !== 200) {
        throw new Error();
    }

    const payload = await response.json();
    return payload
}