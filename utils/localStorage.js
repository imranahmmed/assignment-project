export const setLocalStorage = (key, value) => {
    if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value));
    }
};

export const getLocalStorage = (key) => {
    if (typeof window !== 'undefined') {
        const value = window.localStorage.getItem(key);
        if (value) {
            return JSON.parse(value);
        }
    }
    return null;
};

export const removeLocalStorage = (key) => {
    if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
    }
};
