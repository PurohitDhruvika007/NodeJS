export const isLoggedIn = () => {
    return !!localStorage.getItem("user");
};

export const saveUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
};

export const logoutUser = () => {
    localStorage.removeItem("user");
};
